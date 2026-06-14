import Image from "next/image";
import Link from "next/link";
import ProjectSlider from "@/components/ProjectSlider";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

type ProjectItem = {
  title: string;
  category: string;
  location: string;
  image: string;
};

// ─── Project data ─────────────────────────────────────────────────────────────

const PROJECTS: Record<Locale, ProjectItem[]> = {
  nl: [
    { title: "Drijvend Zonnepark", category: "B2B Solar", location: "West-Nederland", image: "/projects/everkinetiq-carport-solar-villa-04.jpg" },
    { title: "Commerciële Omvormers", category: "B2B Solar", location: "Nederland", image: "/projects/everkinetiq-zonnepanelen-bedrijf-13.jpg" },
    { title: "Kas Interieur & Belichting", category: "Kasproject", location: "Nederland", image: "/projects/project-greenhouse.jpg" },
    { title: "Kas Zonnepanelen", category: "Kasproject", location: "Nederland", image: "/projects/everkinetiq-carport-overkapping-solar-06.jpg" },
    { title: "Zonnepanelen Plat Dak", category: "B2B Solar", location: "Rotterdam, NL", image: "/projects/everkinetiq-warmtepomp-grondboringen-02.jpg" },
    { title: "Agri-Solar Waterbassin", category: "B2B Solar", location: "West-Nederland", image: "/projects/everkinetiq-renovatie-gevel-afwerking-02.jpg" },
    { title: "Woningrenovatie", category: "Renovatie", location: "Nederland", image: "/projects/project-renovation.jpg" },
    { title: "Warmtepomp Installatie", category: "Warmtepomp", location: "Nederland", image: "/projects/project-heatpump.jpg" },
  ],
  en: [
    { title: "Floating Solar Park", category: "B2B Solar", location: "West Netherlands", image: "/projects/everkinetiq-carport-solar-villa-04.jpg" },
    { title: "Commercial Inverter Installation", category: "B2B Solar", location: "Netherlands", image: "/projects/everkinetiq-zonnepanelen-bedrijf-13.jpg" },
    { title: "Greenhouse Interior & Lighting", category: "Greenhouse", location: "Netherlands", image: "/projects/project-greenhouse.jpg" },
    { title: "Greenhouse Solar Installation", category: "Greenhouse", location: "Netherlands", image: "/projects/everkinetiq-carport-overkapping-solar-06.jpg" },
    { title: "Flat Roof Solar", category: "B2B Solar", location: "Rotterdam, NL", image: "/projects/everkinetiq-warmtepomp-grondboringen-02.jpg" },
    { title: "Agri-Solar Water Basin", category: "B2B Solar", location: "West Netherlands", image: "/projects/everkinetiq-renovatie-gevel-afwerking-02.jpg" },
    { title: "Home Renovation", category: "Renovation", location: "Netherlands", image: "/projects/project-renovation.jpg" },
    { title: "Heat Pump Installation", category: "Heat Pump", location: "Netherlands", image: "/projects/project-heatpump.jpg" },
  ],
  fr: [
    { title: "Parc Solaire Flottant", category: "B2B Solaire", location: "Pays-Bas Ouest", image: "/projects/everkinetiq-carport-solar-villa-04.jpg" },
    { title: "Onduleurs Commerciaux", category: "B2B Solaire", location: "Pays-Bas", image: "/projects/everkinetiq-zonnepanelen-bedrijf-13.jpg" },
    { title: "Intérieur Serre & Éclairage", category: "Serre", location: "Pays-Bas", image: "/projects/project-greenhouse.jpg" },
    { title: "Solar Serre", category: "Serre", location: "Pays-Bas", image: "/projects/everkinetiq-carport-overkapping-solar-06.jpg" },
    { title: "Solaire Toit Plat", category: "B2B Solaire", location: "Rotterdam, NL", image: "/projects/everkinetiq-warmtepomp-grondboringen-02.jpg" },
    { title: "Agri-Solar Bassin", category: "B2B Solaire", location: "Pays-Bas Ouest", image: "/projects/everkinetiq-renovatie-gevel-afwerking-02.jpg" },
    { title: "Rénovation Maison", category: "Rénovation", location: "Pays-Bas", image: "/projects/project-renovation.jpg" },
    { title: "Installation Pompe à Chaleur", category: "Pompe à Chaleur", location: "Pays-Bas", image: "/projects/project-heatpump.jpg" },
  ],
  es: [
    { title: "Parque Solar Flotante", category: "Solar B2B", location: "Países Bajos Oeste", image: "/projects/everkinetiq-carport-solar-villa-04.jpg" },
    { title: "Inversores Comerciales", category: "Solar B2B", location: "Países Bajos", image: "/projects/everkinetiq-zonnepanelen-bedrijf-13.jpg" },
    { title: "Interior Invernadero & Iluminación", category: "Invernadero", location: "Países Bajos", image: "/projects/project-greenhouse.jpg" },
    { title: "Solar en Invernadero", category: "Invernadero", location: "Países Bajos", image: "/projects/everkinetiq-carport-overkapping-solar-06.jpg" },
    { title: "Solar Tejado Plano", category: "Solar B2B", location: "Rotterdam, NL", image: "/projects/everkinetiq-warmtepomp-grondboringen-02.jpg" },
    { title: "Agri-Solar Balsa", category: "Solar B2B", location: "Países Bajos Oeste", image: "/projects/everkinetiq-renovatie-gevel-afwerking-02.jpg" },
    { title: "Reforma de Vivienda", category: "Renovación", location: "Países Bajos", image: "/projects/project-renovation.jpg" },
    { title: "Instalación Bomba de Calor", category: "Bomba de Calor", location: "Países Bajos", image: "/projects/project-heatpump.jpg" },
  ],
  de: [
    { title: "Schwimmendes Solarkraftwerk", category: "B2B Solar", location: "West-Niederlande", image: "/projects/everkinetiq-carport-solar-villa-04.jpg" },
    { title: "Gewerbliche Wechselrichter", category: "B2B Solar", location: "Niederlande", image: "/projects/everkinetiq-zonnepanelen-bedrijf-13.jpg" },
    { title: "Gewächshaus Innenraum & Beleuchtung", category: "Gewächshaus", location: "Niederlande", image: "/projects/project-greenhouse.jpg" },
    { title: "Gewächshaus Solaranlage", category: "Gewächshaus", location: "Niederlande", image: "/projects/everkinetiq-carport-overkapping-solar-06.jpg" },
    { title: "Flachdach Solar", category: "B2B Solar", location: "Rotterdam, NL", image: "/projects/everkinetiq-warmtepomp-grondboringen-02.jpg" },
    { title: "Agri-Solar Wasserbecken", category: "B2B Solar", location: "West-Niederlande", image: "/projects/everkinetiq-renovatie-gevel-afwerking-02.jpg" },
    { title: "Hausrenovierung", category: "Sanierung", location: "Niederlande", image: "/projects/project-renovation.jpg" },
    { title: "Wärmepumpe Installation", category: "Wärmepumpe", location: "Niederlande", image: "/projects/project-heatpump.jpg" },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);
  const projects = PROJECTS[locale];

  const isNl = locale === "nl";

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-[#050510] flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#7C3AED] mb-4">
                {isNl ? "Premium duurzame energie" : "Premium sustainable energy"}
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white leading-tight md:text-5xl lg:text-[3.25rem]">
                {isNl ? (
                  <>Duurzame energie &amp; totaaloplossingen voor <span className="text-[#7C3AED]">woning</span> en <span className="text-[#7C3AED]">bedrijf</span></>
                ) : locale === "fr" ? (
                  <>Énergie durable &amp; solutions complètes pour <span className="text-[#7C3AED]">maison</span> et <span className="text-[#7C3AED]">entreprise</span></>
                ) : locale === "es" ? (
                  <>Energía sostenible &amp; soluciones completas para <span className="text-[#7C3AED]">hogar</span> y <span className="text-[#7C3AED]">empresa</span></>
                ) : locale === "de" ? (
                  <>Nachhaltige Energie &amp; Komplettlösungen für <span className="text-[#7C3AED]">Haus</span> und <span className="text-[#7C3AED]">Betrieb</span></>
                ) : (
                  <>Sustainable energy &amp; total solutions for <span className="text-[#7C3AED]">home</span> and <span className="text-[#7C3AED]">business</span></>
                )}
              </h1>
              <p className="mt-6 text-white/60 leading-relaxed max-w-md">
                {isNl
                  ? "EverKinetiq realiseert toekomstgerichte oplossingen. Van zonnepanelen en carports met solar roof tot renovaties, warmtepompen en totaalprojecten."
                  : locale === "fr"
                  ? "EverKinetiq réalise des solutions durables. Des panneaux solaires aux carports, rénovations et pompes à chaleur."
                  : locale === "es"
                  ? "EverKinetiq realiza soluciones sostenibles. De paneles solares a carports, reformas y bombas de calor."
                  : locale === "de"
                  ? "EverKinetiq realisiert zukunftsweisende Lösungen: Solar, Carports, Renovierungen und Wärmepumpen."
                  : "EverKinetiq delivers future-proof solutions: solar panels, carports, renovations, heat pumps and total projects."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-7 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
                >
                  {t.nav.cta} →
                </Link>
                <Link
                  href={`/${locale}/diensten`}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {isNl ? "Ontdek onze diensten" : locale === "fr" ? "Nos services" : locale === "es" ? "Nuestros servicios" : locale === "de" ? "Unsere Leistungen" : "Our services"}
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden">
              <Image
                src="/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg"
                alt="EverKinetiq project"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-[#080818] py-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl bg-[#111126] px-8 py-6">
            {[
              { value: "1000+", label: isNl ? "Tevreden klanten" : "Happy clients" },
              { value: "30+", label: isNl ? "Jaren ervaring" : "Years experience" },
              { value: "100%", label: isNl ? "Kwaliteit & garantie" : "Quality & warranty" },
              { value: "VCA**", label: isNl ? "Gecertificeerd" : "Certified" },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <div className="font-heading text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diensten ── */}
      <section className="bg-[#F5F5F7] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7C3AED] mb-3">
              {isNl ? "Onze diensten" : locale === "fr" ? "Nos services" : locale === "es" ? "Nuestros servicios" : locale === "de" ? "Unsere Leistungen" : "Our services"}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {isNl ? "Alles onder één dak" : locale === "fr" ? "Tout sous un même toit" : locale === "es" ? "Todo bajo un mismo techo" : locale === "de" ? "Alles aus einer Hand" : "Everything under one roof"}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {isNl ? "Van advies en ontwerp tot plaatsing en opvolging. Wij begeleiden elk project van A tot Z." : "From advice and design to installation and follow-up. We guide every project from A to Z."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <rect x="4" y="10" width="32" height="20" rx="2" />
                    <line x1="4" y1="20" x2="36" y2="20" />
                    <line x1="15" y1="10" x2="15" y2="30" />
                    <line x1="25" y1="10" x2="25" y2="30" />
                    <line x1="20" y1="30" x2="20" y2="36" />
                    <line x1="13" y1="36" x2="27" y2="36" />
                  </svg>
                ),
                title: isNl ? "Zonnepanelen" : locale === "fr" ? "Panneaux solaires" : locale === "es" ? "Paneles solares" : locale === "de" ? "Solarmodule" : "Solar panels",
                desc: isNl ? "Hoogwaardige zonnepanelen voor maximale opbrengst en rendement." : "High-quality solar panels for maximum yield.",
                href: `/${locale}/diensten`,
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <path d="M2 14 L20 4 L38 14" />
                    <line x1="6" y1="14" x2="6" y2="30" />
                    <line x1="34" y1="14" x2="34" y2="30" />
                    <path d="M10 26 Q10 24 12 24 L17 22 L23 22 L28 24 Q30 24 30 26 L30 30 L10 30 Z" />
                    <circle cx="14" cy="30" r="2" />
                    <circle cx="26" cy="30" r="2" />
                  </svg>
                ),
                title: isNl ? "Carports met Solar Roof" : locale === "fr" ? "Carports SolarRoof" : locale === "es" ? "Cocheras SolarRoof" : locale === "de" ? "Carports mit SolarRoof" : "Carports with SolarRoof",
                desc: isNl ? "Duurzame carports met geïntegreerde zonnepanelen." : "Sustainable carports with integrated solar panels.",
                href: `/${locale}/diensten`,
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <path d="M6 36 L6 18 L20 6 L34 18 L34 36 Z" />
                    <path d="M16 36 L16 26 L24 26 L24 36" />
                    <line x1="2" y1="36" x2="38" y2="36" />
                  </svg>
                ),
                title: isNl ? "Renovaties" : locale === "fr" ? "Rénovations" : locale === "es" ? "Reformas" : locale === "de" ? "Sanierungen" : "Renovations",
                desc: isNl ? "Totaalrenovaties met focus op energie, comfort en waarde." : "Complete renovations focused on energy, comfort and value.",
                href: `/${locale}/diensten`,
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <rect x="4" y="8" width="20" height="24" rx="3" />
                    <circle cx="14" cy="20" r="6" />
                    <circle cx="14" cy="20" r="2" />
                    <path d="M28 12 C34 12 36 16 36 20 C36 24 34 28 28 28" />
                  </svg>
                ),
                title: isNl ? "Warmtepompen" : locale === "fr" ? "Pompes à chaleur" : locale === "es" ? "Bombas de calor" : locale === "de" ? "Wärmepumpen" : "Heat pumps",
                desc: isNl ? "Efficiënte warmtepompen voor verwarming, koeling en sanitair warm water." : "Efficient heat pumps for heating, cooling and hot water.",
                href: `/${locale}/diensten`,
              },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm flex flex-col">
                <div className="text-[#7C3AED] mb-4">{s.icon}</div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                <Link href={s.href} className="mt-4 text-sm font-semibold text-[#7C3AED] hover:opacity-80 transition">
                  {isNl ? "Meer info" : "More info"} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projecten ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#7C3AED] mb-3">
                {isNl ? "Recente projecten" : "Recent projects"}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {isNl ? "Projecten waar we trots op zijn" : locale === "fr" ? "Projets dont nous sommes fiers" : locale === "es" ? "Proyectos de los que estamos orgullosos" : locale === "de" ? "Projekte, auf die wir stolz sind" : "Projects we're proud of"}
              </h2>
            </div>
            <Link href={`/${locale}/projecten`} className="hidden md:inline-flex text-sm font-semibold text-[#7C3AED] hover:opacity-80 transition whitespace-nowrap ml-8">
              {isNl ? "Bekijk alle projecten" : "View all projects"} →
            </Link>
          </div>

          <ProjectSlider
            projects={projects}
            viewAllLabel={isNl ? "Bekijk alle projecten" : "View all projects"}
            viewAllHref={`/${locale}/projecten`}
          />
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-[#080818] px-10 py-12 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#7C3AED] mb-3">
                {isNl ? "Klaar voor morgen" : "Ready for tomorrow"}
              </p>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                {isNl ? "Samen bouwen aan een duurzame toekomst" : locale === "fr" ? "Construisons ensemble un avenir durable" : locale === "es" ? "Construyamos juntos un futuro sostenible" : locale === "de" ? "Gemeinsam in eine nachhaltige Zukunft" : "Building a sustainable future together"}
              </h2>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-white/60 text-sm max-w-xs md:text-right">
                {isNl ? "Elke woning en elk bedrijf is uniek. Wij denken mee, van eerste advies tot perfecte oplevering." : "Every home and business is unique. We think along, from first advice to perfect delivery."}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-7 text-sm font-semibold text-white transition hover:bg-[#6D28D9] whitespace-nowrap"
              >
                {t.nav.cta} →
              </Link>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "👤", title: isNl ? "Persoonlijk advies" : "Personal advice", sub: isNl ? "Op maat van jouw project" : "Tailored to your project" },
              { icon: "🔧", title: isNl ? "Eigen plaatsingsploegen" : "Own installation teams", sub: isNl ? "Kwaliteit zonder compromis" : "Quality without compromise" },
              { icon: "✓", title: isNl ? "Betrouwbaar & transparant" : "Reliable & transparent", sub: isNl ? "Duidelijke communicatie" : "Clear communication" },
              { icon: "★", title: isNl ? "Nazorg & onderhoud" : "After-care & maintenance", sub: isNl ? "Ook na oplevering" : "Even after delivery" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
