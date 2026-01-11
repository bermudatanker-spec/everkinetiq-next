import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "EverKinetiq Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    deskTool(),     // ✅ DIT IS DE STUDIO
    visionTool(),  // optioneel, maar prima
  ],

  schema: {
    types: schemaTypes,
  },
});