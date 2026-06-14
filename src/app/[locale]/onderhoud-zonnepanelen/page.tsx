import type { Metadata } from "next";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";
import { CheckCircle2, ShieldCheck, Zap, Wrench, BarChart3, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Onderhoud Zonnepanelen — Schoonmaak & Inspectie | EverKinetiq",
  description:
    "Professioneel onderhoud van zonnepanelen: schoonmaak, visuele inspectie, thermografisch doormeten en prestatiecontrole. Erkend installateur — EverKinetiq Belgium.",
  keywords: [
    "onderhoud zonnepanelen",
    "schoonmaak zonnepanelen",
    "inspectie zonnepanelen",
    "doormeten zonnepanelen",
    "thermografie zonnepanelen",
    "zonnepanelen reinigen",
    "solar panel maintenance Belgium",
    "EverKinetiq",
  ],
  openGraph: {
    title: "Onderhoud & Inspectie Zonnepanelen | EverKinetiq Belgium",
    description:
      "Vuile panelen verliezen 20-30% opbrengst. EverKinetiq zorgt voor schone, geïnspecteerde en doorgemeten installaties.",
    images: [{ url: "/projects/project-heatpump.jpg", width: 1200, height: 630 }],
  },
};

// JSON-LD Service structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Onderhoud & Inspectie Zonnepanelen",
  description:
    "Professioneel onderhoud van zonnepanelen inclusief schoonmaak, visuele inspectie, thermografisch doormeten en prestatiecontrole.",
  provider: {
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
  areaServed: { "@type": "Country", name: "Belgium" },
  serviceType: "Onderhoud zonnepanelen",
};

const STEPS = [
  {
    icon: ShieldCheck,
    step: "01",
    title: "Visuele inspectie",
    desc: "Grondige beoordeling van elk paneel: krassen, barsten, loslating, bevestiging, kabelmanagement en aansluitingen.",
    color: "#D97706",
  },
  {
    icon: Zap,
    step: "02",
    title: "Thermografisch doormeten",
    desc: "Met professionele thermografiecamera detecteren we hotspots, defecte cellen en bypasdiodes die niet zichtbaar zijn voor het blote oog.",
    color: "#6D28D9",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Prestatiecontrole",
    desc: "We meten de actuele opbrengst per string vs. de verwachte waarden op basis van straling en panelspecificaties.",
    color: "#15803D",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Professionele schoonmaak",
    desc: "Reiniging met gedeïoniseerd water en zachte borstels — geen krassen, geen restlagen. Geen agressieve chemicaliën.",
    color: "#0891B2",
  },
  {
    icon: CheckCircle2,
    step: "05",
    title: "Rapportage & advies",
    desc: "U ontvangt een schriftelijk rapport met bevindingen, foto's, meetresultaten en aanbevelingen voor optimalisatie.",
    color: "#DC2626",
  },
  {
    icon: Calendar,
    step: "06",
    title: "Jaarlijks onderhoudscontract",
    desc: "Optioneel jaarlijks contract met vaste prijs en prioriteitsplanning — nooit meer zelf aan onderhoud denken.",
    color: "#9333EA",
  },
];

const FACTS = [
  { value: "20–30%", label: "Opbrengstverlies bij vervuilde panelen" },
  { value: "1×/jaar", label: "Aanbevolen onderhoudscyclus" },
  { value: "100%", label: "Niet-invasieve inspectie (thermografie)" },
  { value: "15 jr", label: "Expertise in duurzame energie" },
];

const FAQ = [
  {
    q: "Hoe vaak moeten zonnepanelen worden gereinigd?",
    a: "Minimaal één keer per jaar, bij voorkeur in het voorjaar voor het zomerseizoen. In gebieden met veel stof, pollen of vogels kan tweejaarlijks reinigen lonen.",
  },
  {
    q: "Wat is thermografisch doormeten?",
    a: "Met een infraroodcamera detecteren we temperatuurverschillen in de panelen. Defecte cellen worden zichtbaar als hotspots — zelfs als een paneel er visueel perfect uitziet.",
  },
  {
    q: "Kan ik zonnepanelen zelf reinigen?",
    a: "U kunt spoelen met water, maar professionele reiniging met gedeïoniseerd water voorkomt kalkafzetting. Bovendien combineert EverKinetiq de reiniging altijd met een volledige technische inspectie.",
  },
  {
    q: "Wat kost het onderhoud van zonnepanelen?",
    a: "De prijs hangt af van het aantal panelen, de dakhoogte en de bereikbaarheid. Vraag een vrijblijvende offerte aan — wij geven u een vaste prijs zonder verrassingen.",
  },
  {
    q: "Valt onderhoud onder de garantie van de installateur?",
    a: "Fabrieksgarantie vervalt bij onvoldoende onderhoud. Een aantoonbaar onderhoudshistoriek — met onze rapporten — beschermt uw garantierechten.",
  },
];

export default async function OnderhoudPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";

  const ctaLabel = locale === "nl" ? "Vraag vrijblijvende offerte" : locale === "fr" ? "Demander un devis" : locale === "de" ? "Angebot anfragen" : locale === "es" ? "Solicitar presupuesto" : "Request a quote";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PremiumBackground>
        <main className="pt-20">

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden border-b border-white/10 py-20 md:py-28">
            <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#D97706]/8 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-[#6D28D9]/8 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-4 py-1.5 text-xs tracking-widest text-[#D97706] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                Dienst
              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl leading-tight">
                Onderhoud &amp; Inspectie{" "}
                <span className="text-[#D97706]">Zonnepanelen</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-white/65 leading-relaxed">
                Vuile of defecte panelen verliezen{" "}
                <strong className="text-white">20 tot 30% opbrengst</strong> zonder dat u het merkt.
                EverKinetiq combineert professionele schoonmaak, visuele inspectie,
                thermografisch doormeten en prestatieanalyse in één bezoek.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#D97706] px-8 text-sm font-bold text-[#080818] transition hover:opacity-90"
                >
                  {ctaLabel} →
                </Link>
                <a
                  href="https://wa.me/31629317622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <span className="text-[#25D366]">●</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* ── Facts strip ──────────────────────────────────────────── */}
          <section className="border-b border-white/10 bg-white/3 py-10">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {FACTS.map((f) => (
                  <div key={f.value} className="text-center">
                    <div className="text-3xl font-black text-[#D97706] md:text-4xl">{f.value}</div>
                    <div className="mt-1 text-xs text-white/50">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Werkwijze steps ──────────────────────────────────────── */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4">
              <div className="mb-12 text-center">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/60 uppercase">
                  Werkwijze
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                  Wat doet EverKinetiq{" "}
                  <span className="text-[#D97706]">bij uw installatie?</span>
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-white/55">
                  Ons onderhoud is grondig, gedocumenteerd en altijd met een helder rapport achteraf.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.step}
                      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/8"
                    >
                      {/* Step number */}
                      <div
                        className="absolute right-4 top-4 text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ color: s.color }}
                      >
                        {s.step}
                      </div>

                      <div
                        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${s.color}18` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: s.color }} />
                      </div>

                      <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>

                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Why maintenance matters ───────────────────────────────── */}
          <section className="border-t border-white/10 py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid gap-12 md:grid-cols-2 items-center">
                <div>
                  <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/60 uppercase">
                    Waarom onderhoud?
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl leading-tight">
                    Uw investering{" "}
                    <span className="text-[#D97706]">presteert alleen optimaal</span>{" "}
                    als de installatie goed onderhouden is.
                  </h2>
                  <div className="mt-6 space-y-4">
                    {[
                      "Vuil, mos en vogelpoep blokkeren zonlicht — direct opbrengstverlies",
                      "Sluipende defecten (hotspots) worden zonder thermografie niet ontdekt",
                      "Slecht onderhoud kan de fabrieksgarantie doen vervallen",
                      "Een schone installatie is een veilige installatie — brandrisico's worden geminimaliseerd",
                      "Aantoonbaar onderhoudshistoriek verhoogt de waarde van uw woning",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 text-[#D97706]">✔</span>
                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-[#D97706] md:text-6xl">20–30%</div>
                    <div className="mt-2 text-white font-semibold">meer opbrengst</div>
                    <div className="mt-1 text-sm text-white/50">na professionele reiniging en inspectie</div>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Vuile installatie</span>
                      <span className="text-white">70–80% rendement</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[75%] rounded-full bg-red-500/70" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Na EverKinetiq onderhoud</span>
                      <span className="text-[#D97706] font-semibold">98–100% rendement</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[99%] rounded-full bg-[#D97706]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────── */}
          <section className="border-t border-white/10 py-20 md:py-24">
            <div className="mx-auto max-w-4xl px-4">
              <div className="mb-12 text-center">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/60 uppercase">
                  Veelgestelde vragen
                </div>
                <h2 className="text-3xl font-black text-white md:text-4xl">FAQ</h2>
              </div>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="font-bold text-white mb-2">{item.q}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ────────────────────────────────────────────── */}
          <section className="border-t border-white/10 py-20">
            <div className="mx-auto max-w-3xl px-4 text-center">
              <h2 className="text-3xl font-black text-white md:text-4xl">
                Klaar voor een <span className="text-[#D97706]">gratis inspectie-offerte?</span>
              </h2>
              <p className="mt-4 text-white/55">
                Vul het contactformulier in of stuur ons een WhatsApp. Wij plannen een afspraak op uw locatie en geven u een vaste prijs — geen verrassingen.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#D97706] px-8 text-sm font-bold text-[#080818] transition hover:opacity-90"
                >
                  Offerte aanvragen →
                </Link>
                <a
                  href="https://wa.me/31629317622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <span className="text-[#25D366] text-base">●</span>
                  WhatsApp direct
                </a>
              </div>
            </div>
          </section>

        </main>
      </PremiumBackground>
    </>
  );
}
