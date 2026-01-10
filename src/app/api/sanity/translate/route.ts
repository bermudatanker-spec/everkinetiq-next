import "server-only";

import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

type Locale = "nl" | "en" | "fr" | "es" | "de";
const TARGETS: Locale[] = ["en", "fr", "es", "de"];

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rf3m18jt";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09";

const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

const DEEPL_KEY = process.env.DEEPL_API_KEY;
const DEEPL_ENDPOINT = process.env.DEEPL_ENDPOINT || "https://api-free.deepl.com/v2/translate";

const sanityWrite = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: SANITY_WRITE_TOKEN,
});

const sanityRead = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

type PortableTextBlock = any;

function portableToText(blocks: PortableTextBlock[] | null | undefined) {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];
  for (const b of blocks) {
    if (b?._type === "block" && Array.isArray(b.children)) {
      const line = b.children.map((c: any) => (typeof c?.text === "string" ? c.text : "")).join("");
      if (line.trim()) out.push(line.trim());
    }
  }
  return out.join("\n\n").trim();
}

function textToPortable(text: string) {
  const parts = text
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.map((p) => ({
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: p, marks: [] }],
    markDefs: [],
  }));
}

async function deeplTranslate(text: string, target: Locale) {
  const clean = (text || "").trim();
  if (!clean) return "";

  const targetLang = target.toUpperCase(); // EN/FR/ES/DE
  const params = new URLSearchParams();
  params.set("auth_key", DEEPL_KEY || "");
  params.set("text", clean);
  params.set("source_lang", "NL");
  params.set("target_lang", targetLang);

  const res = await fetch(DEEPL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`DeepL error (${res.status}): ${msg}`);
  }

  const data = (await res.json()) as any;
  const translated = data?.translations?.[0]?.text;
  return typeof translated === "string" ? translated : "";
}

export async function POST(req: Request) {
  // ✅ webhook beveiliging
  const secret = req.headers.get("x-webhook-secret");
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!SANITY_WRITE_TOKEN) return NextResponse.json({ ok: false, error: "Missing SANITY_WRITE_TOKEN" }, { status: 500 });
  if (!DEEPL_KEY) return NextResponse.json({ ok: false, error: "Missing DEEPL_API_KEY" }, { status: 500 });

  const payload = await req.json().catch(() => null);
  const id: string | undefined = payload?._id || payload?.documentId || payload?.id;

  if (!id) return NextResponse.json({ ok: false, error: "Missing _id" }, { status: 400 });

  // ✅ haal NL bron op: i18n.nl -> fallback: title/excerpt/body/content/body
  const doc = await sanityRead.fetch(
    `*[_id == $id][0]{
      _id,
      title,
      excerpt,
      description,
      body,
      content,
      title_i18n,
      excerpt_i18n,
      body_i18n
    }`,
    { id }
  );

  if (!doc) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const sourceTitle: string = doc?.title_i18n?.nl ?? doc?.title ?? "";
  const sourceExcerpt: string = doc?.excerpt_i18n?.nl ?? doc?.excerpt ?? doc?.description ?? "";

  const sourceBodyBlocks: any[] =
    doc?.body_i18n?.nl ??
    doc?.body ??
    doc?.content ?? // sommige schemas gebruiken content
    [];

  const sourceBodyText = portableToText(sourceBodyBlocks);

  // altijd NL velden vullen (zonder te slopen)
  const patch: Record<string, any> = {
    "title_i18n.nl": sourceTitle,
    "excerpt_i18n.nl": sourceExcerpt,
    "body_i18n.nl": Array.isArray(sourceBodyBlocks) ? sourceBodyBlocks : [],
  };

  // vertaal alleen als target leeg is
  for (const lang of TARGETS) {
    const hasTitle = !!doc?.title_i18n?.[lang];
    const hasExcerpt = !!doc?.excerpt_i18n?.[lang];
    const hasBody = Array.isArray(doc?.body_i18n?.[lang]) && doc.body_i18n[lang].length > 0;

    if (!hasTitle) patch[`title_i18n.${lang}`] = await deeplTranslate(sourceTitle, lang);
    if (!hasExcerpt) patch[`excerpt_i18n.${lang}`] = await deeplTranslate(sourceExcerpt, lang);

    if (!hasBody) {
      const translatedBody = await deeplTranslate(sourceBodyText, lang);
      patch[`body_i18n.${lang}`] = textToPortable(translatedBody);
    }
  }

  await sanityWrite.patch(id).set(patch).commit({ autoGenerateArrayKeys: true });

  return NextResponse.json({ ok: true, id, translated: TARGETS });
}