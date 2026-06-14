"use client";

import { useState } from "react";

type ContactLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  premiumCopy: string;
};

type Props = {
  labels: ContactLabels;
  sending: string;
  successMessage: string;
  errorMessage: string;
};

export default function ContactForm({ labels, sending, successMessage, errorMessage }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm text-white/80">{labels.name}</label>
        <input
          required
          name="name"
          placeholder={labels.name.replace(" *", "")}
          className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#7C3AED]/60"
          suppressHydrationWarning
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm text-white/80">{labels.email}</label>
          <input
            required
            type="email"
            name="email"
            placeholder="you@email.com"
            className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#7C3AED]/60"
            suppressHydrationWarning
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-white/80">{labels.phone}</label>
          <input
            name="phone"
            placeholder="+32 ..."
            className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#7C3AED]/60"
            suppressHydrationWarning
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-white/80">{labels.message}</label>
        <textarea
          required
          name="message"
          placeholder={labels.message.replace(" *", "")}
          rows={5}
          className="rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#7C3AED]/60"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? sending : labels.submit}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-400">{successMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/60">{labels.premiumCopy}</p>
    </form>
  );
}
