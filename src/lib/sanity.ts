import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "rf3m18jt",
  dataset: "production",
  apiVersion: "2026-01-09",
  useCdn: true,
});