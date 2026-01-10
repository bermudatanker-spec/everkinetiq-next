import Link from "next/link";
import Image from "next/image";
import PremiumBackground from "@/components/PremiumBackground";
import { getNewsList } from "@/lib/blog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600; // 1 uur (pas gerust aan)

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const posts = await getNewsList(locale);

  const title =
    locale === "nl" ? "Nieuws" :
    locale === "fr" ? "Actualités" :
    locale === "es" ? "Noticias" :
    locale === "de" ? "Neuigkeiten" :
    "News";

  const subtitle =
    locale === "nl" ? "De nieuwste ontwikkelingen en projecten van EverKinetiq." :
    locale === "fr" ? "Dernières actualités et projets d’EverKinetiq." :
    locale === "es" ? "Últimas novedades y proyectos de EverKinetiq." :
    locale === "de" ? "Neueste Updates und Projekte von EverKinetiq." :
    "Latest updates and projects from EverKinetiq.";

  return (
    <PremiumBackground>
      <main className="pt-28">
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {title}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-white/70 md:text-lg">{subtitle}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              {locale === "nl"
                ? "Nog geen nieuwsberichten."
                : locale === "fr"
                  ? "Aucun article pour le moment."
                  : locale === "es"
                    ? "Aún no hay artículos."
                    : locale === "de"
                      ? "Noch keine Beiträge."
                      : "No posts yet."}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <article
                  key={p._id}
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
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.7),transparent_55%)]" />
                    </div>
                  ) : null}

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{new Date(p.date).toLocaleDateString()}</span>
                      <span>{p.readingTime ?? "—"}</span>
                    </div>

                    <h2 className="mt-3 text-base font-semibold text-white">
                      {p.title}
                    </h2>

                    {p.excerpt ? (
                      <p className="mt-2 text-sm text-white/70">{p.excerpt}</p>
                    ) : null}

                    <Link
                      href={`/${locale}/nieuws/${p.slug}`}
                      className="mt-4 inline-flex text-sm font-semibold text-[#F4C44E] hover:opacity-90"
                    >
                      {locale === "nl"
                        ? "Lees meer →"
                        : locale === "fr"
                          ? "Lire la suite →"
                          : locale === "es"
                            ? "Leer más →"
                            : locale === "de"
                              ? "Mehr lesen →"
                              : "Read more →"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">
              {locale === "nl"
                ? "Wij zijn geen “zomaar bouwers”."
                : locale === "fr"
                  ? "Nous ne sommes pas de simples constructeurs."
                  : locale === "es"
                    ? "No somos “constructores cualquiera”."
                    : locale === "de"
                      ? "Wir sind keine „gewöhnlichen Bauleute“."
                      : "We’re not “just builders”."}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {locale === "nl"
                ? "Wij zijn perfectionisten. Geen troep, geen halve oplossingen — alleen premium afwerking, strakke uitvoering en kwaliteit die je voelt."
                : locale === "fr"
                  ? "Nous sommes perfectionnistes. Pas de compromis — uniquement une finition premium, une exécution rigoureuse et une qualité réelle."
                  : locale === "es"
                    ? "Somos perfeccionistas. Sin atajos — solo acabado premium, ejecución sólida y calidad real."
                    : locale === "de"
                      ? "Wir sind Perfektionisten. Keine Kompromisse — nur Premium-Ausführung, saubere Planung und echte Qualität."
                      : "We are perfectionists: no shortcuts — premium finish, tight execution, real quality."}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
            >
              {t.nav.cta} →
            </Link>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}
