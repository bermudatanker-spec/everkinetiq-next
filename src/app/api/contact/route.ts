import "server-only";

import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "offerte@ek-b.be";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "EverKinetiq Website <onboarding@resend.dev>";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY ontbreekt — contactformulier kan geen e-mail versturen.", {
      name, email, phone, message,
    });
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Nieuwe offerteaanvraag van ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone || "-"}\n\nBericht:\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", detail);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
