// sanity/schemaTypes/project.ts
import { defineField, defineType } from "sanity";

const LOCALES = [
  { title: "Nederlands", value: "nl" },
  { title: "English", value: "en" },
  { title: "Français", value: "fr" },
  { title: "Español", value: "es" },
  { title: "Deutsch", value: "de" },
] as const;

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "string" }),
      ),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "summary",
      title: "Korte tekst (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "text", rows: 3 }),
      ),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) => doc?.title?.nl ?? doc?.title?.en ?? "project",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Datum",
      type: "date",
    }),

    defineField({
      name: "location",
      title: "Locatie",
      type: "string",
      description: "Bijv. \"Hoogstraten, België\"",
    }),

    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Zonnepanelen", value: "zonnepanelen" },
          { title: "Solar Carports", value: "carport-solar" },
          { title: "Kasprojecten", value: "kas" },
          { title: "Renovaties", value: "renovatie" },
          { title: "Warmtepompen", value: "warmtepomp" },
          { title: "Padel", value: "padel" },
          { title: "Bestrating", value: "bestrating" },
          { title: "Sandwichpanelen", value: "sandwichpanelen" },
        ],
      },
    }),

    defineField({
      name: "cover",
      title: "Cover (kaart)",
      type: "image",
      options: { hotspot: true },
    }),

    // ✅ Projectoverzicht — statistieken (vermogen, oppervlakte, doorlooptijd, besparing)
    defineField({
      name: "stats",
      title: "Projectoverzicht (statistieken)",
      type: "array",
      of: [
        defineField({
          name: "stat",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label (per taal)",
              type: "object",
              fields: LOCALES.map((l) =>
                defineField({ name: l.value, title: l.title, type: "string" }),
              ),
            }),
            defineField({ name: "value", title: "Waarde", type: "string" }),
          ],
          preview: {
            select: { title: "label.nl", subtitle: "value" },
          },
        }),
      ],
    }),

    // ✅ Verhaal: uitdaging / aanpak / resultaat
    defineField({
      name: "challenge",
      title: "Uitdaging (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "text", rows: 4 }),
      ),
    }),

    defineField({
      name: "approach",
      title: "Onze aanpak (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "text", rows: 4 }),
      ),
    }),

    defineField({
      name: "result",
      title: "Resultaat (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "text", rows: 4 }),
      ),
    }),

    // ✅ Technische specificaties
    defineField({
      name: "specs",
      title: "Technische specificaties",
      type: "array",
      of: [
        defineField({
          name: "spec",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label (per taal)",
              type: "object",
              fields: LOCALES.map((l) =>
                defineField({ name: l.value, title: l.title, type: "string" }),
              ),
            }),
            defineField({ name: "value", title: "Waarde", type: "string" }),
          ],
          preview: {
            select: { title: "label.nl", subtitle: "value" },
          },
        }),
      ],
    }),

    // ✅ meerdere foto's
    defineField({
      name: "gallery",
      title: "Galerij (meerdere foto's)",
      type: "array",
      of: [
        defineField({
          name: "galleryItem",
          type: "image",
          title: "Foto",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-tekst (per taal)",
              type: "object",
              fields: LOCALES.map((l) =>
                defineField({ name: l.value, title: l.title, type: "string" }),
              ),
            }),
          ],
        }),
      ],
    }),

    // ✅ video: embed url OF upload
    defineField({
      name: "video",
      title: "Video (optioneel)",
      type: "object",
      fields: [
        defineField({
          name: "embedUrl",
          title: "YouTube/Vimeo URL (embed)",
          type: "url",
          description: "Plak een YouTube of Vimeo link",
        }),
        defineField({
          name: "file",
          title: "MP4 upload (optioneel)",
          type: "file",
          options: { accept: "video/mp4" },
        }),
      ],
    }),

    // ✅ Klantreview
    defineField({
      name: "reviewQuote",
      title: "Klantreview — quote (per taal)",
      type: "object",
      fields: LOCALES.map((l) =>
        defineField({ name: l.value, title: l.title, type: "text", rows: 3 }),
      ),
    }),

    defineField({
      name: "reviewAuthor",
      title: "Klantreview — naam",
      type: "string",
      description: "Bijv. \"Jan Peeters\"",
    }),

    defineField({
      name: "reviewCompany",
      title: "Klantreview — functie / bedrijf (optioneel)",
      type: "string",
      description: "Bijv. \"Bedrijfsleider – Peeters Logistics\"",
    }),

    defineField({
      name: "reviewRating",
      title: "Klantreview — rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // optioneel: tags / categorie
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],

  preview: {
    select: { titleNl: "title.nl", titleEn: "title.en", media: "cover" },
    prepare({ titleNl, titleEn, media }) {
      return { title: titleNl ?? titleEn ?? "Project", media };
    },
  },
});