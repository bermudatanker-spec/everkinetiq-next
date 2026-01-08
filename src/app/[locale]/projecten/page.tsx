// src/app/[locale]/projecten/page.tsx
import Image from "next/image";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata = {
  title: "Projecten | EverKinetiq",
  description: "Een selectie van projecten en realisaties van EverKinetiq.",
};

type Item = { title: string; tag: string; img: string };

function getProjectsCopy(locale: Locale) {
  const copy = {
    kicker:
      locale === "nl"
        ? "Projecten"
        : locale === "fr"
          ? "Projets"
          : locale === "es"
            ? "Proyectos"
            : locale === "de"
              ? "Projekte"
              : "Projects",

    h1a:
      locale === "nl"
        ? "Reële realisaties,"
        : locale === "fr"
          ? "Réalisations concrètes,"
          : locale === "es"
            ? "Proyectos reales,"
            : locale === "de"
              ? "Reale Referenzen,"
              : "Real work,",


    h1b:
      locale === "nl"
        ? "premium afwerking"
        : locale === "fr"
          ? "finitions premium"
          : locale === "es"
            ? "acabado premium"
            : locale === "de"
              ? "Premium-Finish"
              : "premium finish",

    intro:
      locale === "nl"
        ? "Bekijk enkele voorbeelden. Elk project start met een plan en eindigt met kwaliteit."
        : locale === "fr"
          ? "Découvrez quelques exemples. Chaque projet commence par un plan et se termine par une qualité impeccable."
          : locale === "es"
            ? "Mira algunos ejemplos. Cada proyecto comienza con un plan y termina con calidad."
            : locale === "de"
              ? "Sehen Sie einige Beispiele. Jedes Projekt startet mit einem Plan und endet mit Qualität."
              : "See a few examples. Every project starts with a plan and ends with quality.",

    cta:
      locale === "nl"
        ? "Offerte aanvragen →"
        : locale === "fr"
          ? "Demander un devis →"
          : locale === "es"
            ? "Pedir presupuesto →"
            : locale === "de"
              ? "Angebot anfordern →"
              : "Request a quote →",

    country:
      locale === "nl"
        ? "België"
        : locale === "fr"
          ? "Belgique"
          : locale === "es"
            ? "Bélgica"
            : locale === "de"
              ? "Belgien"
              : "Belgium",

    cardText:
      locale === "nl"
        ? "Wil je iets gelijkaardigs? We maken een voorstel op maat."
        : locale === "fr"
          ? "Vous voulez quelque chose de similaire ? Nous faisons une proposition sur mesure."
          : locale === "es"
            ? "¿Quieres algo parecido? Preparamos una propuesta a medida."
            : locale === "de"
              ? "Möchten Sie etwas Ähnliches? Wir erstellen ein maßgeschneidertes Angebot."
              : "Want something similar? We’ll create a tailored proposal.",

    bottomTitle:
      locale === "nl"
        ? "Wil je jouw project ook premium aanpakken?"
        : locale === "fr"
          ? "Vous voulez un projet au niveau premium ?"
          : locale === "es"
            ? "¿Quieres un proyecto con acabado premium?"
            : locale === "de"
              ? "Möchten Sie Ihr Projekt auf Premium-Niveau umsetzen?"
              : "Want to build your project to a premium standard?",

    bottomText:
      locale === "nl"
        ? "Stuur ons kort je plannen. We reageren snel met een voorstel of een afspraak."
        : locale === "fr"
          ? "Envoyez-nous vos plans. Nous répondons rapidement avec une proposition ou un rendez-vous."
          : locale === "es"
            ? "Envíanos tus planes. Respondemos rápido con una propuesta o una cita."
            : locale === "de"
              ? "Senden Sie uns kurz Ihre Pläne. Wir melden uns schnell mit Angebot oder Termin."
              : "Send us your plans. We’ll respond quickly with a proposal or a meeting.",

    viewServices:
      locale === "nl"
        ? "Bekijk diensten"
        : locale === "fr"
          ? "Voir les services"
          : locale === "es"
            ? "Ver servicios"
            : locale === "de"
              ? "Leistungen ansehen"
              : "View services",

    items: ((): Item[] => {
      if (locale === "fr")
        return [
          { title: "Réalisation carport", tag: "Carport", img: "/projects/hero-carport.jpg" },
          { title: "Projet serre", tag: "PV", img: "/projects/project-greenhouse.jpg" },
          { title: "Installation pompe à chaleur", tag: "Pompe à chaleur", img: "/projects/project-heatpump.jpg" },
          { title: "Projet padel", tag: "PV", img: "/projects/project-padel.jpg" },
          { title: "Rénovation clé en main", tag: "Rénovation", img: "/projects/project-renovation.jpg" },
        ];

      if (locale === "es")
        return [
          { title: "Carport realizado", tag: "Carport", img: "/projects/hero-carport.jpg" },
          { title: "Proyecto invernadero", tag: "FV", img: "/projects/project-greenhouse.jpg" },
          { title: "Instalación de bomba de calor", tag: "Bomba de calor", img: "/projects/project-heatpump.jpg" },
          { title: "Proyecto pádel", tag: "FV", img: "/projects/project-padel.jpg" },
          { title: "Renovación llave en mano", tag: "Renovación", img: "/projects/project-renovation.jpg" },
        ];

      if (locale === "de")
        return [
          { title: "Carport-Realisierung", tag: "Carport", img: "/projects/hero-carport.jpg" },
          { title: "Gewächshaus-Projekt", tag: "PV", img: "/projects/project-greenhouse.jpg" },
          { title: "Wärmepumpen-Installation", tag: "Wärmepumpe", img: "/projects/project-heatpump.jpg" },
          { title: "Padel-Projekt", tag: "PV", img: "/projects/project-padel.jpg" },
          { title: "Turnkey-Sanierung", tag: "Sanierung", img: "/projects/project-renovation.jpg" },
        ];

      if (locale === "en")
        return [
          { title: "Carport installation", tag: "Carport", img: "/projects/hero-carport.jpg" },
          { title: "Greenhouse project", tag: "PV", img: "/projects/project-greenhouse.jpg" },
          { title: "Heat pump installation", tag: "Heat pump", img: "/projects/project-heatpump.jpg" },
          { title: "Padel project", tag: "PV", img: "/projects/project-padel.jpg" },
          { title: "Turnkey renovation", tag: "Renovation", img: "/projects/project-renovation.jpg" },
        ];

      // NL default
      return [
        { title: "Carport realisatie", tag: "Carport", img: "/projects/hero-carport.jpg" },
        { title: "Greenhouse project", tag: "PV", img: "/projects/project-greenhouse.jpg" },
        { title: "Warmtepomp installatie", tag: "Warmtepomp", img: "/projects/project-heatpump.jpg" },
        { title: "Padel project", tag: "PV", img: "/projects/project-padel.jpg" },
        { title: "Turnkey renovatie", tag: "Renovatie", img: "/projects/project-renovation.jpg" },
      ];
    })(),
  };

  return copy;
}

export default function ProjectenPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const copy = getProjectsCopy(locale);

  return (
    <PremiumBackground>
      <main className="pt-28">
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {copy.kicker}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {copy.h1a} <span className="text-[#F4C44E]">{copy.h1b}</span>
            </h1>

            <p className="mt-4 text-white/70 md:text-lg">{copy.intro}</p>

            <div className="mt-7 flex justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {copy.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.items.map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition hover:bg-white/10"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.70),transparent_55%)]" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                      {p.tag}
                    </span>
                    <span className="text-xs text-white/60">{copy.country}</span>
                  </div>

                  <h2 className="mt-3 text-base font-semibold text-white">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-sm text-white/70">{copy.cardText}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">{copy.bottomTitle}</h3>
            <p className="mt-2 text-sm text-white/70">{copy.bottomText}</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {copy.cta}
              </Link>
              <Link
                href={`/${locale}/diensten`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {copy.viewServices}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}