// sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

const LOCALES = [
  { title: "Nederlands", value: "nl" },
  { title: "English", value: "en" },
  { title: "Français", value: "fr" },
  { title: "Español", value: "es" },
  { title: "Deutsch", value: "de" },
] as const;

function requireNlObject(Rule: any, fieldLabel = "Nederlands") {
  return Rule.custom((value: Record<string, any> | undefined) => {
    if (!value || typeof value !== "object") return `${fieldLabel} is verplicht.`;
    if (!value.nl || String(value.nl).trim().length === 0) return `${fieldLabel} is verplicht.`;
    return true;
  });
}

function requireNlPortableText(Rule: any) {
  return Rule.custom((value: Record<string, any> | undefined) => {
    if (!value || typeof value !== "object") return "Inhoud NL is verplicht.";
    const nl = value.nl;
    if (!Array.isArray(nl) || nl.length === 0) return "Inhoud NL is verplicht.";
    return true;
  });
}

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    // ✅ i18n titel
    defineField({
      name: "titleI18n",
      title: "Titel (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({
          name: l.value,
          title: l.title,
          type: "string",
        }),
      ),
      validation: (Rule) => requireNlObject(Rule, "Titel (NL)"),
    }),

    // ✅ i18n excerpt
    defineField({
      name: "excerptI18n",
      title: "Samenvatting (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({
          name: l.value,
          title: l.title,
          type: "text",
          rows: 3,
        }),
      ),
    }),

    // ✅ slug gebaseerd op NL titel
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) =>
          doc?.titleI18n?.nl ??
          doc?.titleI18n?.en ??
          doc?.title ??
          "post",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Datum",
      type: "datetime",
    }),

    // ✅ cover image
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
    }),

    // ✅ legacy fallback image (hidden)
    defineField({
      name: "mainImage",
      title: "Afbeelding (legacy)",
      type: "image",
      options: { hotspot: true },
      hidden: true,
    }),

    // ✅ i18n body
    defineField({
      name: "bodyI18n",
      title: "Inhoud (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({
          name: l.value,
          title: l.title,
          type: "array",
          of: [{ type: "block" }],
        }),
      ),
      validation: (Rule) => requireNlPortableText(Rule),
    }),

    // ✅ optional relations
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categorieën",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    // 🔒 legacy fields (hidden)
    defineField({
      name: "title",
      title: "Titel (legacy)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "excerpt",
      title: "Samenvatting (legacy)",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "body",
      title: "Inhoud (legacy)",
      type: "array",
      of: [{ type: "block" }],
      hidden: true,
    }),
  ],

  // ✅ PREVIEW: 100% safe (NOOIT object als title)
  preview: {
    select: {
      tNl: "titleI18n.nl",
      tEn: "titleI18n.en",
      tFr: "titleI18n.fr",
      tDe: "titleI18n.de",
      legacyTitle: "title",

      slug: "slug.current",
      date: "date",

      cover: "cover",
      mainImage: "mainImage",
    },

    prepare({ tNl, tEn, tFr, tDe, legacyTitle, slug, date, cover, mainImage }) {
      const title =
        (typeof tNl === "string" && tNl.trim()) ? tNl :
        (typeof tEn === "string" && tEn.trim()) ? tEn :
        (typeof tFr === "string" && tFr.trim()) ? tFr :
        (typeof tDe === "string" && tDe.trim()) ? tDe :
        (typeof legacyTitle === "string" && legacyTitle.trim()) ? legacyTitle :
        "⛔ Geen titel";

      const subtitleParts: string[] = [];
      if (slug) subtitleParts.push(`/${slug}`);
      if (date) subtitleParts.push(new Date(date).toLocaleDateString("nl-BE"));
      const subtitle = subtitleParts.join(" · ");

      return {
        title,
        subtitle,
        media: cover || mainImage,
      };
    },
  },
});