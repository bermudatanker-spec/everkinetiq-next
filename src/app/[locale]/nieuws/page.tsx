import Link from "next/link";
import Image from "next/image";
import { getNewsList } from "@/lib/blog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600;

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
    locale === "fr" ? "Dernières actualités et projets d'EverKinetiq." :
    locale === "es" ? "Últimas novedades y proyectos de EverKinetiq." :
    locale === "de" ? "Neueste Updates und Projekte von EverKinetiq." :
    "Latest updates and projects from EverKinetiq.";

  const empty =
    locale === "nl" ? "Nog geen nieuwsberichten." :
    locale === "fr" ? "Aucun article pour le moment." :
    locale === "es" ? "Aún no hay artículos." :
    locale === "de" ? "Noch keine Beiträge." :
    "No posts yet.";

  const readMore =
    locale === "nl" ? "Lees meer →" :
    locale === "fr" ? "Lire la suite →" :
    locale === "es" ? "Leer más →" :
    locale === "de" ? "Mehr lesen →" :
    "Read more →";

  return (
    <main className="bg-white pt-28">
      {/* Header */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#6D28D9] mb-3">
            {title}
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-gray-500 md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-[#F5F5F7] p-8 text-center text-gray-500">
            {empty}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
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
                ) : (
                  <div className="aspect-[16/10] bg-[#F5F5F7]" />
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                    <span>{p.readingTime ?? "—"}</span>
                  </div>

                  <h2 className="mt-3 text-base font-semibold text-gray-900 leading-snug">
                    {p.title}
                  </h2>

                  {p.excerpt ? (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{p.excerpt}</p>
                  ) : null}

                  <Link
                    href={`/${locale}/nieuws/${p.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[#6D28D9] hover:opacity-80"
                  >
                    {readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#080818] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {locale === "nl" ? "Klaar voor uw project?" :
             locale === "fr" ? "Prêt pour votre projet ?" :
             locale === "es" ? "¿Listo para su proyecto?" :
             locale === "de" ? "Bereit für Ihr Projekt?" :
             "Ready for your project?"}
          </h2>
          <p className="mt-4 text-white/60">
            {locale === "nl" ? "Vraag een vrijblijvende offerte aan en wij nemen contact op." :
             locale === "fr" ? "Demandez un devis sans engagement et nous vous contacterons." :
             locale === "es" ? "Solicite presupuesto sin compromiso y le contactaremos." :
             locale === "de" ? "Fordern Sie ein unverbindliches Angebot an — wir melden uns." :
             "Request a free quote and we will get in touch."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-8 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
          >
            {t.nav.cta} →
          </Link>
        </div>
      </section>
    </main>
  );
}
