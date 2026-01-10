"use client";

import { PortableText } from "@portabletext/react";

type Props = {
  value?: unknown;
};

export default function PortableContent({ value }: Props) {
  // ❌ niets
  if (!value) return null;

  // 🟡 Oud fallback-geval: markdown / html string
  if (typeof value === "string") {
    return (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  // ❌ Geen Portable Text array
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  // ✅ Sanity Portable Text
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText
        value={value}
        components={{
          block: {
            h2: ({ children }) => (
              <h2 className="mt-10 text-2xl font-semibold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-8 text-xl font-semibold">{children}</h3>
            ),
            normal: ({ children }) => (
              <p className="mt-4 leading-relaxed">{children}</p>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-white">{children}</strong>
            ),
            link: ({ value, children }) => (
              <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4C44E] underline"
              >
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
}