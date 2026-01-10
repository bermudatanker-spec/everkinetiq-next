"use client";

import { PortableText } from "@portabletext/react";

type Props = {
  value?: any[] | string | null;
};

export default function PortableContent({ value }: Props) {
  if (!value) return null;

  // ✅ Als het per ongeluk een string is → toon veilig
  if (typeof value === "string") {
    return (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  // ✅ Normale Sanity Portable Text
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={value} />
    </div>
  );
}