// src/app/[locale]/nieuws/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import PremiumBackground from "@/components/PremiumBackground";
import PortableContent from "@/components/PortableContent";
import { getNewsPost, getAllNewsSlugs } from "@/lib/blog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600; // 1 uur

export async function generateStaticParams() {
  // ✅ Optie B: slugs zijn niet per locale, dus 1x ophalen
  const slugs = await getAllNewsSlugs();

  // Build voor alle locales × alle slugs
  const locales: Locale[] = ["nl", "fr", "en", "es", "de"];
  const all: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      all.push({ locale, slug });
    }
  }

  return all;
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const post = await getNewsPost(locale, slug);

  const backLabel =
    locale === "nl"
      ? "Terug naar nieuws"
      : locale === "fr"
        ? "Retour aux actualités"
        : locale === "es"
          ? "Volver a noticias"
          : locale === "de"
            ? "Zurück zu Neuigkeiten"
            : "Back to news";

  if (!post) {
    return (
      <PremiumBackground>
        <main className="pt-28">
          <div className="mx-auto max-w-3xl px-4 text-white">
            <p className="text-white/70">
              {locale === "nl"
                ? "Post niet gevonden."
                : locale === "fr"
                  ? "Article introuvable."
                  : locale === "es"
                    ? "Artículo no encontrado."
                    : locale === "de"
                      ? "Beitrag nicht gefunden."
                      : "Post not found."}
            </p>
            <Link
              href={`/${locale}/nieuws`}
              className="mt-4 inline-block text-[#F4C44E]"
            >
              ← {backLabel}
            </Link>
          </div>
        </main>
      </PremiumBackground>
    );
  }

  return (
    <PremiumBackground>
      <main className="pt-28">
        <article className="mx-auto max-w-3xl px-4 pb-16">
          <Link
            href={`/${locale}/nieuws`}
            className="text-sm text-white/70 hover:text-white"
          >
            ← {backLabel}
          </Link>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            {post.title}
          </h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-white/60">
            <span>
              {post.date ? new Date(post.date).toLocaleDateString() : ""}
            </span>
            <span>•</span>
            <span>{post.readingTime ?? "—"}</span>
          </div>

          {post.cover ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          ) : null}

          {/* ✅ Portable Text */}
          <div className="mt-8">
            <PortableContent value={post.content ?? []} />
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">
              {locale === "nl"
                ? "Wil je iets soortgelijks realiseren?"
                : locale === "fr"
                  ? "Vous voulez réaliser quelque chose de similaire ?"
                  : locale === "es"
                    ? "¿Quieres realizar algo parecido?"
                    : locale === "de"
                      ? "Möchten Sie etwas Ähnliches umsetzen?"
                      : "Want to build something similar?"}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {locale === "nl"
                ? "Wij zijn perfectionisten: premium uitvoering, strakke planning en duidelijke communicatie."
                : locale === "fr"
                  ? "Nous sommes perfectionnistes : exécution premium, planning précis et communication claire."
                  : locale === "es"
                    ? "Somos perfeccionistas: ejecución premium, planificación sólida y comunicación clara."
                    : locale === "de"
                      ? "Wir sind Perfektionisten: Premium-Ausführung, klare Planung und Kommunikation."
                      : "We are perfectionists: premium execution, tight planning and clear communication."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
            >
              {t.nav.cta} →
            </Link>
          </div>
        </article>
      </main>
    </PremiumBackground>
  );
}