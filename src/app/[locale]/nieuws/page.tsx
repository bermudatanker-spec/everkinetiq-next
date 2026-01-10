// src/app/[locale]/nieuws/page.tsx
import Link from "next/link";
import Image from "next/image";
import PremiumBackground from "@/components/PremiumBackground";
import { getAllPosts } from "@/lib/blog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const posts = getAllPosts(locale);

  const title =
    locale === "nl"
      ? "Nieuws & Updates"
      : locale === "fr"
        ? "Actualités"
        : locale === "es"
          ? "Noticias"
          : locale === "de"
            ? "Neuigkeiten"
            : "News & Updates";

  const subtitle =
    locale === "nl"
      ? "De nieuwste ontwikkelingen, projecten en inzichten van EverKinetiq."
      : locale === "fr"
        ? "Les dernières mises à jour, projets et informations d’EverKinetiq."
        : locale === "es"
          ? "Las últimas novedades, proyectos e información de EverKinetiq."
          : locale === "de"
            ? "Neueste Updates, Projekte und Einblicke von EverKinetiq."
            : "Latest updates, projects and insights from EverKinetiq.";

  return (
    <PremiumBackground>
      <main className="pt-28">
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {title}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl text-white">
              {title}
            </h1>

            <p className="mt-4 text-white/70 md:text-lg">{subtitle}</p>

            <div className="mt-7 flex justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {t.nav.cta} →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              {locale === "nl"
                ? "Nog geen nieuwsberichten. Voeg een markdown bestand toe in content/blog/nl."
                : "No posts yet. Add a markdown file in content/blog/[locale]."}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <article
                  key={p.slug}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
                >
                  {p.cover ? (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{p.date}</span>
                      <span>{p.readingTime}</span>
                    </div>

                    <h2 className="mt-2 text-base font-semibold text-white">
                      {p.title}
                    </h2>

                    <p className="mt-2 text-sm text-white/70 line-clamp-3">
                      {p.description}
                    </p>

                    <div className="mt-4">
                      <Link
                        href={`/${locale}/nieuws/${p.slug}`}
                        className="text-sm font-semibold text-[#F4C44E] hover:opacity-90"
                      >
                        {locale === "nl"
                          ? "Lees verder →"
                          : locale === "fr"
                            ? "Lire la suite →"
                            : locale === "es"
                              ? "Leer más →"
                              : locale === "de"
                                ? "Weiterlesen →"
                                : "Read more →"}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </PremiumBackground>
  );
}