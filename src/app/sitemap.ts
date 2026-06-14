import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const SITE_URL = "https://ek-b.be";

const STATIC_PATHS = [
  "",
  "/diensten",
  "/over-ons",
  "/projecten",
  "/contact",
  "/nieuws",
  "/galerij",
  "/onderhoud-zonnepanelen",
  "/privacy",
  "/voorwaarden",
  "/cookies",
  "/gdpr",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
