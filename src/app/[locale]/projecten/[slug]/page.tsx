// src/app/[locale]/projecten/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { getAllProjectSlugs, getProject } from "@/lib/projects";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

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
              ← {locale === "nl" ? "Terug naar projecten" : "Back to projects"}
            </Link>
          </div>
        </main>
      </PremiumBackground>
    );
  }

  const hasVideo = Boolean(project.video.embedUrl || project.video.fileUrl);

  return (
    <PremiumBackground>
      <main className="pt-28">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <Link href={`/${locale}/projecten`} className="text-sm text-white/70 hover:text-white">
            ← {locale === "nl" ? "Terug naar projecten" : "Back to projects"}
          </Link>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
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
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.7),transparent_55%)]" />
            </div>
          ) : null}

          {/* Video */}
          {hasVideo ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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

          {/* Gallery */}
          {project.gallery.length ? (
            <>
              <h2 className="mt-10 text-lg font-semibold text-white">
                {locale === "nl" ? "Foto’s" : locale === "fr" ? "Photos" : locale === "es" ? "Fotos" : locale === "de" ? "Fotos" : "Photos"}
              </h2>

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
            </>
          ) : null}

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">
              {locale === "nl"
                ? "Wil je iets soortgelijks realiseren?"
                : locale === "fr"
                  ? "Vous voulez réaliser quelque chose de similaire ?"
                  : locale === "es"
                    ? "¿Quieres realizar algo parecido?"
                    : locale === "de"
                      ? "Möchten Sie etwas Ähnliches umsetzen?"
                      : "Want to build something similar?"}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {locale === "nl"
                ? "Wij zijn perfectionisten: premium uitvoering, strakke planning en duidelijke communicatie."
                : "We are perfectionists: premium execution, tight planning and clear communication."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
            >
              {t.nav.cta} →
            </Link>
          </div>
        </div>
      </main>
    </PremiumBackground>
  );
}