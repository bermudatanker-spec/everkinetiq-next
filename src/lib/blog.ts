// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string; // ISO of YYYY-MM-DD
  cover?: string; // /blog/cover.jpg
  tags?: string[];
  readingTime?: string;
  content: string; // markdown body
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function safeReadDir(dir: string) {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = path.join(BLOG_DIR, locale);
  const files = safeReadDir(dir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);

      const slug = file.replace(/\.md$/, "");
      const title = String(data.title || slug);
      const description = String(data.description || "");
      const date = String(data.date || "");
      const cover = data.cover ? String(data.cover) : undefined;
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;

      return {
        slug,
        locale,
        title,
        description,
        date,
        cover,
        tags,
        readingTime: estimateReadingTime(content),
        content,
      } satisfies BlogPost;
    })
    // nieuwste eerst
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return posts;
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    locale,
    title: String(data.title || slug),
    description: String(data.description || ""),
    date: String(data.date || ""),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllSlugs(locale: Locale): string[] {
  const dir = path.join(BLOG_DIR, locale);
  return safeReadDir(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}