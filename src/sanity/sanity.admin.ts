// src/sanity/sanity.admin.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const sanityAdmin = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // alleen nodig als je server-side write/translate wil
});