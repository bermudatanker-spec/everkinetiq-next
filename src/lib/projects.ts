// src/lib/projects.ts
import "server-only";
import type { Locale } from "@/lib/i18n";
import { sanityClient } from "@/lib/sanityClient";

type ProjectDoc = {
  _id: string;
  slug: string;
  title: string;
  summary?: string;
  cover?: string;
};

type GalleryItem = {
  url: string;
  alt?: string;
};

type ProjectDetailDoc = ProjectDoc & {
  gallery?: GalleryItem[];
  video?: { embedUrl?: string; fileUrl?: string };
  tags?: string[];
  date?: string;
};

const PROJECTS_LIST_QUERY = /* groq */ `
*[_type == "project" && defined(slug.current)]
| order(coalesce(date, _createdAt) desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.nl, title.en, "Project"),
  "summary": coalesce(summary[$locale], summary.nl, summary.en, ""),
  "cover": coalesce(cover.asset->url, gallery[0].asset->url)
}
`;

const PROJECT_DETAIL_QUERY = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.nl, title.en, "Project"),
  "summary": coalesce(summary[$locale], summary.nl, summary.en, ""),
  "date": coalesce(date, _createdAt),
  "cover": coalesce(cover.asset->url, gallery[0].asset->url),

  "gallery": gallery[]{
    "url": asset->url,
    "alt": coalesce(alt[$locale], alt.nl, alt.en, "")
  },

  "video": {
    "embedUrl": video.embedUrl,
    "fileUrl": video.file.asset->url
  },

  tags
}
`;

const PROJECT_SLUGS_QUERY = /* groq */ `
*[_type == "project" && defined(slug.current)].slug.current
`;

export async function getProjects(locale: Locale) {
  const docs: ProjectDoc[] = await sanityClient.fetch(PROJECTS_LIST_QUERY, { locale });
  return (docs || []).map((d) => ({
    _id: String(d._id),
    slug: String(d.slug),
    title: String(d.title),
    summary: d.summary ? String(d.summary) : "",
    cover: d.cover ? String(d.cover) : undefined,
  }));
}

export async function getProject(locale: Locale, slug: string) {
  const d: ProjectDetailDoc | null = await sanityClient.fetch(PROJECT_DETAIL_QUERY, { locale, slug });
  if (!d) return null;

  return {
    _id: String(d._id),
    slug: String(d.slug),
    title: String(d.title),
    summary: d.summary ? String(d.summary) : "",
    date: d.date ? String(d.date) : "",
    cover: d.cover ? String(d.cover) : undefined,
    tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
    gallery: Array.isArray(d.gallery)
      ? d.gallery
          .filter((x) => x?.url)
          .map((x) => ({ url: String(x.url), alt: x.alt ? String(x.alt) : "" }))
      : [],
    video: d.video
      ? {
          embedUrl: d.video.embedUrl ? String(d.video.embedUrl) : "",
          fileUrl: d.video.fileUrl ? String(d.video.fileUrl) : "",
        }
      : { embedUrl: "", fileUrl: "" },
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const slugs: string[] = await sanityClient.fetch(PROJECT_SLUGS_QUERY);
  return Array.isArray(slugs) ? slugs : [];
}