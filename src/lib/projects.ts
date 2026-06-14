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
  location?: string;
  category?: string;
};

type GalleryItem = {
  url: string;
  alt?: string;
};

type StatItem = {
  label?: string;
  value?: string;
};

type ProjectDetailDoc = ProjectDoc & {
  gallery?: GalleryItem[];
  video?: { embedUrl?: string; fileUrl?: string };
  tags?: string[];
  date?: string;
  stats?: StatItem[];
  specs?: StatItem[];
  challenge?: string;
  approach?: string;
  result?: string;
  reviewQuote?: string;
  reviewAuthor?: string;
  reviewCompany?: string;
  reviewRating?: number;
};

const PROJECTS_LIST_QUERY = /* groq */ `
*[_type == "project" && defined(slug.current)]
| order(coalesce(date, _createdAt) desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.nl, title.en, "Project"),
  "summary": coalesce(summary[$locale], summary.nl, summary.en, ""),
  "cover": coalesce(cover.asset->url, gallery[0].asset->url),
  location,
  category
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
  location,
  category,

  "gallery": gallery[]{
    "url": asset->url,
    "alt": coalesce(alt[$locale], alt.nl, alt.en, "")
  },

  "video": {
    "embedUrl": video.embedUrl,
    "fileUrl": video.file.asset->url
  },

  "stats": stats[]{
    "label": coalesce(label[$locale], label.nl, label.en, ""),
    "value": value
  },

  "specs": specs[]{
    "label": coalesce(label[$locale], label.nl, label.en, ""),
    "value": value
  },

  "challenge": coalesce(challenge[$locale], challenge.nl, challenge.en, ""),
  "approach": coalesce(approach[$locale], approach.nl, approach.en, ""),
  "result": coalesce(result[$locale], result.nl, result.en, ""),

  "reviewQuote": coalesce(reviewQuote[$locale], reviewQuote.nl, reviewQuote.en, ""),
  reviewAuthor,
  reviewCompany,
  reviewRating,

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
    location: d.location ? String(d.location) : "",
    category: d.category ? String(d.category) : "",
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
    location: d.location ? String(d.location) : "",
    category: d.category ? String(d.category) : "",
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
    stats: Array.isArray(d.stats)
      ? d.stats
          .filter((x) => x?.value)
          .map((x) => ({ label: x.label ? String(x.label) : "", value: String(x.value) }))
      : [],
    specs: Array.isArray(d.specs)
      ? d.specs
          .filter((x) => x?.value)
          .map((x) => ({ label: x.label ? String(x.label) : "", value: String(x.value) }))
      : [],
    challenge: d.challenge ? String(d.challenge) : "",
    approach: d.approach ? String(d.approach) : "",
    result: d.result ? String(d.result) : "",
    reviewQuote: d.reviewQuote ? String(d.reviewQuote) : "",
    reviewAuthor: d.reviewAuthor ? String(d.reviewAuthor) : "",
    reviewCompany: d.reviewCompany ? String(d.reviewCompany) : "",
    reviewRating: typeof d.reviewRating === "number" ? d.reviewRating : 0,
  };
}

export async function getRelatedProjects(locale: Locale, slug: string, category: string, limit = 3) {
  if (!category) return [];
  const all = await getProjects(locale);
  return all.filter((p) => p.slug !== slug && p.category === category).slice(0, limit);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const slugs: string[] = await sanityClient.fetch(PROJECT_SLUGS_QUERY);
  return Array.isArray(slugs) ? slugs : [];
}