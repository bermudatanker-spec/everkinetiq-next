// src/lib/blog.ts
import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import { sanityClient } from "@/lib/sanityClient";

/* ------------------------------------------------------------------
   ✅ Markdown BLOG (blijft werken zoals je het had)
------------------------------------------------------------------ */

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string; // ISO of YYYY-MM-DD
  cover?: string; // /blog/cover.jpg
  tags?: string[];
  readingTime?: string;
  content: string; // markdown body
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function safeReadDir(dir: string) {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = path.join(BLOG_DIR, locale);
  const files = safeReadDir(dir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);

      const slug = file.replace(/\.md$/, "");
      const title = String(data.title || slug);
      const description = String(data.description || "");
      const date = String(data.date || "");
      const cover = data.cover ? String(data.cover) : undefined;
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;

      return {
        slug,
        locale,
        title,
        description,
        date,
        cover,
        tags,
        readingTime: estimateReadingTime(content),
        content,
      } satisfies BlogPost;
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return posts;
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    locale,
    title: String(data.title || slug),
    description: String(data.description || ""),
    date: String(data.date || ""),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllSlugs(locale: Locale): string[] {
  const dir = path.join(BLOG_DIR, locale);
  return safeReadDir(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/* ------------------------------------------------------------------
   ✅ NIEUWS (Sanity) — Optie B (1 document met vertalingen)
   Werkt met jouw schema:
   - title: { nl,en,fr,es,de }
   - excerpt: { nl,en,fr,es,de }
   - body: { nl,en,fr,es,de }  (PortableText array per taal)
------------------------------------------------------------------ */

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  [key: string]: any;
};

export type NewsPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  cover?: string;
  readingTime?: string;
  language: Locale;
  content: PortableTextBlock[]; // PortableText array
};

function portableTextToPlainText(blocks: PortableTextBlock[] | undefined | null) {
  if (!blocks || !Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const b of blocks) {
    if (b?._type === "block" && Array.isArray(b.children)) {
      for (const c of b.children) {
        if (typeof c?.text === "string") parts.push(c.text);
      }
    }
  }
  return parts.join(" ").trim();
}

function estimateReadingTimeFromPortableText(blocks: PortableTextBlock[] | undefined | null) {
  const text = portableTextToPlainText(blocks);
  if (!text) return undefined;
  return estimateReadingTime(text);
}

/**
 * ✅ Queries (Optie B)
 * - GEEN filter op locale op document-niveau
 * - Pak vertaling uit objectvelden title/excerpt/body via [$locale]
 * - Fallback naar nl
 * - Extra fallback: als je nog oude velden hebt (title string, excerpt string, body/content array)
 */
const NEWS_LIST_QUERY = /* groq */ `
*[_type == "post"] | order(coalesce(date, _createdAt) desc) {
  _id,
  "slug": slug.current,
  "date": coalesce(date, _createdAt),
  "cover": coalesce(cover.asset->url, mainImage.asset->url),

  // title is object (per taal) -> fallback naar nl -> fallback naar oude string title
  "title": coalesce(title[$locale], title.nl, title, "Untitled"),

  // excerpt is object (per taal) -> fallback naar nl -> fallback naar oude excerpt/description
  "excerpt": coalesce(excerpt[$locale], excerpt.nl, excerpt, description, ""),

  // body is object (per taal, PortableText array) -> fallback naar nl -> fallback naar oude body/content -> []
  "content": coalesce(body[$locale], body.nl, body, content, [])
}
`;

const NEWS_POST_QUERY = /* groq */ `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  "date": coalesce(date, _createdAt),
  "cover": coalesce(cover.asset->url, mainImage.asset->url),

  "title": coalesce(title[$locale], title.nl, title, "Untitled"),
  "excerpt": coalesce(excerpt[$locale], excerpt.nl, excerpt, description, ""),
  "content": coalesce(body[$locale], body.nl, body, content, [])
}
`;

const NEWS_SLUGS_QUERY = /* groq */ `
*[_type == "post" && defined(slug.current)].slug.current
`;

type SanityNewsDoc = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  cover?: string;
  content?: PortableTextBlock[];
};

function mapSanityDocToNewsPost(locale: Locale, doc: SanityNewsDoc): NewsPost {
  const content = Array.isArray(doc.content) ? doc.content : [];
  return {
    _id: String(doc._id),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: doc.excerpt ? String(doc.excerpt) : undefined,
    date: String(doc.date ?? ""),
    cover: doc.cover ? String(doc.cover) : undefined,
    readingTime: estimateReadingTimeFromPortableText(content),
    language: locale,
    content,
  };
}

export async function getNewsList(locale: Locale): Promise<NewsPost[]> {
  const docs: SanityNewsDoc[] = await sanityClient.fetch(NEWS_LIST_QUERY, { locale });
  return (docs || []).map((d) => mapSanityDocToNewsPost(locale, d));
}

export async function getNewsPost(locale: Locale, slug: string): Promise<NewsPost | null> {
  const doc: SanityNewsDoc | null = await sanityClient.fetch(NEWS_POST_QUERY, { locale, slug });
  if (!doc) return null;
  return mapSanityDocToNewsPost(locale, doc);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs: string[] = await sanityClient.fetch(NEWS_SLUGS_QUERY);
  return Array.isArray(slugs) ? slugs : [];
}