// sanity/schemaTypes/author.ts
import { defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
  ],
});