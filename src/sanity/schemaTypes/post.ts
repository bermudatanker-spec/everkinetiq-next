// sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

const LOCALES = [
  { title: "Nederlands", value: "nl" },
  { title: "English", value: "en" },
  { title: "Français", value: "fr" },
  { title: "Español", value: "es" },
  { title: "Deutsch", value: "de" },
] as const;

type LocaleKey = (typeof LOCALES)[number]["value"];

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
    /**
     * ✅ NIEUW (Optie B): i18n titel
     * Gebruik deze in GROQ: titleI18n[$locale] met fallback naar titleI18n.nl
     */
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

    /**
     * ✅ NIEUW (Optie B): i18n excerpt
     */
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

    /**
     * ✅ Slug (bouwt op NL titel)
     */
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) =>
          doc?.titleI18n?.nl ??
          doc?.titleI18n?.en ??
          doc?.title ?? // legacy fallback
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

    /**
     * ✅ Cover (nieuw)
     */
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
    }),

    /**
     * ✅ mainImage (legacy / fallback)
     * Sommige templates gebruiken mainImage i.p.v. cover → voorkomt “Unknown field found”
     */
    defineField({
      name: "mainImage",
      title: "Afbeelding (legacy)",
      type: "image",
      options: { hotspot: true },
      hidden: true,
    }),

    /**
     * ✅ NIEUW (Optie B): i18n body (Portable Text)
     */
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

    /**
     * ✅ author / categories (optioneel, maar voorkomt “Unknown field found” als die al bestaat)
     */
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

    /* ------------------------------------------------------------
       🔒 LEGACY velden (hidden)
       Deze houden je oude data “compatibel” zodat Studio niet crasht
       en je rustig kan migreren naar titleI18n/excerptI18n/bodyI18n
    ------------------------------------------------------------ */

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

  preview: {
    select: {
      titleNl: "titleI18n.nl",
      titleEn: "titleI18n.en",
      legacyTitle: "title",
      media: "cover",
    },
    prepare({ titleNl, titleEn, legacyTitle, media }) {
      return {
        title: titleNl ?? titleEn ?? legacyTitle ?? "Post",
        media,
      };
    },
  },
});