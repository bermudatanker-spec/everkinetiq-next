// src/app/[locale]/projecten/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { getAllProjectSlugs, getProject, getRelatedProjects } from "@/lib/projects";
import { isLocale, type Locale } from "@/lib/i18n";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  const locales: Locale[] = ["nl", "fr", "en", "es", "de"];
  const all: Array<{ locale: string; slug: string }> = [];

  for (const l of locales) for (const s of slugs) all.push({ locale: l, slug: s });
  return all;
}

function embedToSrc(url: string) {
  // YouTube normal -> embed, Vimeo -> player
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : url;
    }
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
    return url;
  } catch {
    return url;
  }
}

const LABELS: Record<
  string,
  {
    back: string;
    photos: string;
    overview: string;
    challenge: string;
    approach: string;
    result: string;
    specs: string;
    related: string;
    ctaTitle: string;
    ctaSub: string;
    ctaQuote: string;
    ctaWhatsapp: string;
    viewProject: string;
  }
> = {
  nl: {
    back: "← Terug naar projecten",
    photos: "Fotogalerij",
    overview: "Projectoverzicht",
    challenge: "Uitdaging",
    approach: "Onze aanpak",
    result: "Resultaat",
    specs: "Technische specificaties",
    related: "Gerelateerde projecten",
    ctaTitle: "Wilt u een vergelijkbaar project realiseren?",
    ctaSub: "Vraag vrijblijvend een offerte aan — wij denken graag met u mee.",
    ctaQuote: "Vraag offerte aan",
    ctaWhatsapp: "WhatsApp ons",
    viewProject: "Bekijk →",
  },
  en: {
    back: "← Back to projects",
    photos: "Photo Gallery",
    overview: "Project Overview",
    challenge: "The Challenge",
    approach: "Our Approach",
    result: "The Result",
    specs: "Technical Specifications",
    related: "Related Projects",
    ctaTitle: "Want to realize a similar project?",
    ctaSub: "Request a free quote — we're happy to think it through with you.",
    ctaQuote: "Request a quote",
    ctaWhatsapp: "WhatsApp us",
    viewProject: "View →",
  },
  fr: {
    back: "← Retour aux projets",
    photos: "Galerie photo",
    overview: "Aperçu du projet",
    challenge: "Le défi",
    approach: "Notre approche",
    result: "Le résultat",
    specs: "Spécifications techniques",
    related: "Projets similaires",
    ctaTitle: "Vous souhaitez réaliser un projet similaire ?",
    ctaSub: "Demandez un devis gratuit — nous serons ravis de vous conseiller.",
    ctaQuote: "Demander un devis",
    ctaWhatsapp: "WhatsApp",
    viewProject: "Voir →",
  },
  es: {
    back: "← Volver a proyectos",
    photos: "Galería de fotos",
    overview: "Resumen del proyecto",
    challenge: "El reto",
    approach: "Nuestro enfoque",
    result: "El resultado",
    specs: "Especificaciones técnicas",
    related: "Proyectos relacionados",
    ctaTitle: "¿Quiere realizar un proyecto similar?",
    ctaSub: "Solicite un presupuesto sin compromiso — le asesoramos con gusto.",
    ctaQuote: "Solicitar presupuesto",
    ctaWhatsapp: "WhatsApp",
    viewProject: "Ver →",
  },
  de: {
    back: "← Zurück zu Projekten",
    photos: "Fotogalerie",
    overview: "Projektübersicht",
    challenge: "Die Herausforderung",
    approach: "Unser Ansatz",
    result: "Das Ergebnis",
    specs: "Technische Spezifikationen",
    related: "Ähnliche Projekte",
    ctaTitle: "Möchten Sie ein ähnliches Projekt umsetzen?",
    ctaSub: "Fordern Sie ein unverbindliches Angebot an — wir denken gerne mit Ihnen mit.",
    ctaQuote: "Angebot anfragen",
    ctaWhatsapp: "WhatsApp",
    viewProject: "Ansehen →",
  },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const l = LABELS[locale] ?? LABELS.nl;

  const project = await getProject(locale, slug);

  if (!project) {
    return (
      <PremiumBackground>
        <main className="pt-28">
          <div className="mx-auto max-w-4xl px-4 text-white">
            <p className="text-white/70">
              {locale === "nl" ? "Project niet gevonden." : "Project not found."}
            </p>
            <Link href={`/${locale}/projecten`} className="mt-4 inline-block text-[#F4C44E]">
              {l.back}
            </Link>
          </div>
        </main>
      </PremiumBackground>
    );
  }

  const hasVideo = Boolean(project.video.embedUrl || project.video.fileUrl);
  const category = project.category as GalleryCategory | "";
  const categoryMeta = category ? GALLERY_CATEGORIES[category] : undefined;
  const categoryLabel = categoryMeta
    ? locale === "nl"
      ? categoryMeta.label
      : categoryMeta.labelEn
    : "";

  const related = await getRelatedProjects(locale, slug, project.category);

  return (
    <PremiumBackground>
      <main className="pt-28">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <Link href={`/${locale}/projecten`} className="text-sm text-white/70 hover:text-white">
            {l.back}
          </Link>

          {/* ── Hero ─────────────────────────────────────────────── */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {categoryLabel && (
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{
                  borderColor: `${categoryMeta?.color}40`,
                  backgroundColor: `${categoryMeta?.color}1A`,
                  color: categoryMeta?.color,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: categoryMeta?.color }} />
                {categoryLabel}
              </span>
            )}
            {project.location && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                📍 {project.location}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {project.title}
          </h1>

          {project.summary ? (
            <p className="mt-3 max-w-3xl text-white/70 md:text-lg">{project.summary}</p>
          ) : null}

          {/* Cover */}
          {project.cover ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.7),transparent_55%)]" />
            </div>
          ) : null}

          {/* ── Projectoverzicht (stats) ────────────────────────── */}
          {project.stats.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-white">{l.overview}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
                  >
                    <div className="text-2xl font-bold text-[#F4C44E] md:text-3xl">{s.value}</div>
                    {s.label && <div className="mt-1 text-sm text-white/60">{s.label}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Verhaal: Uitdaging / Aanpak / Resultaat ──────────── */}
          {(project.challenge || project.approach || project.result) && (
            <section className="mt-12 grid gap-4 md:grid-cols-3">
              {project.challenge && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-base font-semibold text-[#D97706]">{l.challenge}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{project.challenge}</p>
                </div>
              )}
              {project.approach && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-base font-semibold text-[#6D28D9]">{l.approach}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{project.approach}</p>
                </div>
              )}
              {project.result && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-base font-semibold text-[#F4C44E]">{l.result}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{project.result}</p>
                </div>
              )}
            </section>
          )}

          {/* ── Technische specificaties ────────────────────────── */}
          {project.specs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-white">{l.specs}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    {s.label && <span className="text-sm text-white/60">{s.label}</span>}
                    <span className="text-sm font-semibold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {hasVideo ? (
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {project.video.embedUrl ? (
                <div className="relative aspect-video">
                  <iframe
                    title="Project video"
                    className="absolute inset-0 h-full w-full"
                    src={embedToSrc(project.video.embedUrl)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  className="w-full"
                  controls
                  preload="metadata"
                  src={project.video.fileUrl}
                />
              )}
            </div>
          ) : null}

          {/* ── Fotogalerij ──────────────────────────────────────── */}
          {project.gallery.length ? (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-white">{l.photos}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((img, idx) => (
                  <div
                    key={`${img.url}-${idx}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={img.url}
                        alt={img.alt || project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.55),transparent_60%)]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* ── Gerelateerde projecten ───────────────────────────── */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-white">{l.related}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p._id}
                    href={`/${locale}/projecten/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
                  >
                    <div className="relative aspect-[16/10]">
                      {p.cover && (
                        <Image
                          src={p.cover}
                          alt={p.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.75),transparent_55%)]" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-white">{p.title}</h3>
                      <div className="mt-3 text-sm font-semibold text-[#F4C44E]">{l.viewProject}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Klantreview ──────────────────────────────────────── */}
          {project.reviewQuote && (
            <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
              {project.reviewRating > 0 && (
                <div className="flex gap-1 text-[#F4C44E]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < project.reviewRating ? "★" : "☆"}</span>
                  ))}
                </div>
              )}
              <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                &ldquo;{project.reviewQuote}&rdquo;
              </p>
              {(project.reviewAuthor || project.reviewCompany) && (
                <div className="mt-4 text-sm text-white/60">
                  {project.reviewAuthor && <span className="font-semibold text-white">{project.reviewAuthor}</span>}
                  {project.reviewAuthor && project.reviewCompany && <span> — </span>}
                  {project.reviewCompany && <span>{project.reviewCompany}</span>}
                </div>
              )}
            </section>
          )}

          {/* ── CTA ──────────────────────────────────────────────── */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-xl font-semibold text-white md:text-2xl">{l.ctaTitle}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/70 md:text-base">{l.ctaSub}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {l.ctaQuote} →
              </Link>
              <a
                href="https://wa.me/31629317622"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {l.ctaWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </main>
    </PremiumBackground>
  );
}
