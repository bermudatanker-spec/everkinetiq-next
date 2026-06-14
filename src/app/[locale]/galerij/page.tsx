import type { Metadata } from "next";
import PremiumBackground from "@/components/PremiumBackground";
import GalleryWall from "@/components/GalleryWall";
import { TOTAL_PHOTOS } from "@/lib/gallery";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Galerij — Realisaties | EverKinetiq",
  description: `Ontdek ${TOTAL_PHOTOS}+ afgewerkte projecten van EverKinetiq Belgium: zonnepanelen, carports, kasprojecten, renovaties, warmtepompen en meer. Premium vakmanschap in woord en beeld.`,
  openGraph: {
    title: `${TOTAL_PHOTOS}+ Gerealiseerde Projecten | EverKinetiq Belgium`,
    description: "Premium duurzame energie en renovatieprojecten — het bewijs zit in het werk.",
    images: [{ url: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

// JSON-LD structured data for image gallery
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "EverKinetiq Projectgalerij",
  description: `Collectie van ${TOTAL_PHOTOS}+ gerealiseerde projecten door EverKinetiq Belgium`,
  author: {
    "@type": "LocalBusiness",
    name: "EverKinetiq Belgium BV",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bieshof 11",
      addressLocality: "Meer (Hoogstraten)",
      postalCode: "2321",
      addressCountry: "BE",
    },
    telephone: "+31629317622",
    url: "https://ek-b.be",
  },
};

const HERO_COPY: Record<string, { title: string; sub: string; badge: string }> = {
  nl: {
    badge: "Realisaties",
    title: "Het Werk",
    sub: `${TOTAL_PHOTOS} afgewerkte projecten. Geen compromissen.`,
  },
  en: {
    badge: "Portfolio",
    title: "The Work",
    sub: `${TOTAL_PHOTOS} completed projects. No compromises.`,
  },
  fr: {
    badge: "Réalisations",
    title: "Le Travail",
    sub: `${TOTAL_PHOTOS} projets réalisés. Sans compromis.`,
  },
  es: {
    badge: "Proyectos",
    title: "El Trabajo",
    sub: `${TOTAL_PHOTOS} proyectos completados. Sin compromisos.`,
  },
  de: {
    badge: "Referenzen",
    title: "Die Arbeit",
    sub: `${TOTAL_PHOTOS} abgeschlossene Projekte. Keine Kompromisse.`,
  },
};

export default async function GallerijPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const copy = HERO_COPY[locale] ?? HERO_COPY.nl;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PremiumBackground>
        <main className="pt-20">
          {/* ── Page hero ──────────────────────────────────────────── */}
          <section className="relative overflow-hidden border-b border-white/10 py-16 md:py-24">
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#D97706]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 translate-y-1/2 rounded-full bg-[#6D28D9]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-4 py-1.5 text-xs tracking-widest text-[#D97706] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                {copy.badge}
              </div>

              <h1 className="mt-4 text-6xl font-black tracking-tighter text-white md:text-8xl lg:text-[10rem] leading-none">
                {copy.title}
              </h1>

              <p className="mt-6 text-lg text-white/50 md:text-xl">
                {copy.sub}
              </p>

              {/* Thin gold rule */}
              <div className="mx-auto mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D97706] to-transparent" />
            </div>
          </section>

          {/* ── Gallery wall ───────────────────────────────────────── */}
          <GalleryWall />
        </main>
      </PremiumBackground>
    </>
  );
}
