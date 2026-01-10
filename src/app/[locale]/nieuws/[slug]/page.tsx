// src/app/[locale]/nieuws/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import PremiumBackground from "@/components/PremiumBackground";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { marked } from "marked";

type PageParams = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  return getAllSlugs(locale).map((slug) => ({ slug, locale }));
}

export const dynamicParams = false;

const UI: Record<
  Locale,
  {
    notFound: string;
    back: string;
    ctaTitle: string;
    ctaBody: string;
    ctaFallback: string;
  }
> = {
  nl: {
    notFound: "Post niet gevonden.",
    back: "Terug naar nieuws",
    ctaTitle: "Wil je iets soortgelijks realiseren?",
    ctaBody:
      "Wij zijn niet zomaar bouwers — we zijn perfectionisten en zorgen voor topkwaliteit. Premium uitvoering, strakke planning en duidelijke communicatie. We nemen geen genoegen met minder!",
    ctaFallback: "Offerte aanvragen",
  },
  en: {
    notFound: "Post not found.",
    back: "Back to news",
    ctaTitle: "Want to build something similar?",
    ctaBody:
      "We’re not just builders — we’re perfectionists and deliver top quality. Premium execution, tight planning and clear communication. We never settle for less!",
    ctaFallback: "Request a quote",
  },
  fr: {
    notFound: "Article introuvable.",
    back: "Retour aux actualités",
    ctaTitle: "Vous souhaitez réaliser quelque chose de similaire ?",
    ctaBody:
      "Nous ne sommes pas de simples exécutants — nous sommes perfectionnistes et visons la qualité maximale. Exécution premium, planning précis et communication claire. Nous ne nous contentons jamais de moins !",
    ctaFallback: "Demander un devis",
  },
  es: {
    notFound: "Artículo no encontrado.",
    back: "Volver a noticias",
    ctaTitle: "¿Quieres realizar algo parecido?",
    ctaBody:
      "No somos simples constructores — somos perfeccionistas y entregamos máxima calidad. Ejecución premium, planificación estricta y comunicación clara. ¡No nos conformamos con menos!",
    ctaFallback: "Pedir presupuesto",
  },
  de: {
    notFound: "Beitrag nicht gefunden.",
    back: "Zurück zu Neuigkeiten",
    ctaTitle: "Möchten Sie etwas Ähnliches umsetzen?",
    ctaBody:
      "Wir sind nicht einfach nur Ausführende — wir sind Perfektionisten und liefern höchste Qualität. Premium-Umsetzung, klare Planung und transparente Kommunikation. Wir geben uns nicht mit weniger zufrieden!",
    ctaFallback: "Angebot anfordern",
  },
};

export default async function NewsPostPage({
  params,
}: {
  params: PageParams;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);
  const ui = UI[locale];

  const post = await getPostBySlug(locale, slug);

  if (!post) {
    return (
      <PremiumBackground>
        <main className="pt-28">
          <div className="mx-auto max-w-3xl px-4 text-white">
            <p className="text-white/70">{ui.notFound}</p>
            <Link
              href={`/${locale}/nieuws`}
              className="mt-4 inline-block text-[#F4C44E] hover:opacity-90"
            >
              ← {ui.back}
            </Link>
          </div>
        </main>
      </PremiumBackground>
    );
  }

  // ✅ jouw content is (nu) markdown/plaintext -> render naar HTML
  const html = marked.parse(post.content ?? "") as string;

  return (
    <PremiumBackground>
      <main className="pt-28">
        <article className="mx-auto max-w-3xl px-4 pb-16">
          <Link
            href={`/${locale}/nieuws`}
            className="text-sm text-white/70 hover:text-white"
          >
            ← {ui.back}
          </Link>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            {post.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/60">
            {post.date ? <span>{post.date}</span> : null}
            {post.date && post.readingTime ? <span>•</span> : null}
            {post.readingTime ? <span>{post.readingTime}</span> : null}
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

          {/* ✅ HTML rendering (dus géén value={...}) */}
          <div
            className="prose prose-invert mt-8 max-w-none prose-a:text-[#F4C44E] prose-a:no-underline hover:prose-a:opacity-90"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">{ui.ctaTitle}</h2>
            <p className="mt-2 text-sm text-white/70">{ui.ctaBody}</p>

            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
            >
              {(t.nav?.cta || ui.ctaFallback) + " →"}
            </Link>
          </div>
        </article>
      </main>
    </PremiumBackground>
  );
}