// sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

const LOCALES = [
  { title: "Nederlands", value: "nl" },
  { title: "English", value: "en" },
  { title: "Français", value: "fr" },
  { title: "Español", value: "es" },
  { title: "Deutsch", value: "de" },
] as const;

type LocaleValue = (typeof LOCALES)[number]["value"];

function i18nStringField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: LOCALES.map((l) =>
      defineField({
        name: l.value,
        title: l.title,
        type: "string",
      }),
    ),
    // ✅ Alleen NL verplicht
    validation: (Rule) =>
      Rule.custom((val: Record<LocaleValue, string> | undefined) => {
        if (!val?.nl || String(val.nl).trim().length < 1) return "Nederlands is verplicht.";
        return true;
      }),
  });
}

function i18nTextField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: LOCALES.map((l) =>
      defineField({
        name: l.value,
        title: l.title,
        type: "text",
        rows: 3,
      }),
    ),
  });
}

function i18nPortableTextField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: LOCALES.map((l) =>
      defineField({
        name: l.value,
        title: l.title,
        type: "array",
        of: [{ type: "block" }],
      }),
    ),
    // ✅ Alleen NL verplicht
    validation: (Rule) =>
      Rule.custom((val: Record<LocaleValue, any> | undefined) => {
        const nl = val?.nl;
        if (!nl || !Array.isArray(nl) || nl.length === 0) return "Nederlandse inhoud is verplicht.";
        return true;
      }),
  });
}

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    i18nStringField("title", "Titel (per taal)"),

    i18nTextField("excerpt", "Samenvatting (per taal)"),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) => doc?.title?.nl ?? doc?.title?.en ?? "post",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Datum",
      type: "datetime",
    }),

    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
    }),

    i18nPortableTextField("body", "Inhoud (per taal)"),
  ],

  preview: {
    select: {
      titleNl: "title.nl",
      titleEn: "title.en",
      media: "cover",
    },
    prepare({ titleNl, titleEn, media }) {
      return {
        title: titleNl ?? titleEn ?? "Post",
        media,
      };
    },
  },
});