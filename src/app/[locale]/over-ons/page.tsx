import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Card = { t: string; d: string };
type Step = { t: string; d: string };

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function getAboutCopy(locale: Locale) {
  const L = locale;

  const copy = {
    metaTitle:
      L === "nl"
        ? "Over ons | EverKinetiq"
        : L === "fr"
          ? "À propos | EverKinetiq"
          : L === "es"
            ? "Nosotros | EverKinetiq"
            : L === "de"
              ? "Über uns | EverKinetiq"
              : "About | EverKinetiq",

    metaDesc:
      L === "nl"
        ? "Leer EverKinetiq kennen: aanpak, waarden en werkwijze."
        : L === "fr"
          ? "Découvrez EverKinetiq : approche, valeurs et méthode."
          : L === "es"
            ? "Conoce EverKinetiq: enfoque, valores y método."
            : L === "de"
              ? "Lernen Sie EverKinetiq kennen: Ansatz, Werte und Vorgehen."
              : "Get to know EverKinetiq: approach, values and process.",

    kicker:
      L === "nl"
        ? "Over ons"
        : L === "fr"
          ? "À propos"
          : L === "es"
            ? "Nosotros"
            : L === "de"
              ? "Über uns"
              : "About",

    titleA:
      L === "nl"
        ? "Eén team,"
        : L === "fr"
          ? "Une seule équipe,"
          : L === "es"
            ? "Un solo equipo,"
            : L === "de"
              ? "Ein Team,"
              : "One team,",

    titleB:
      L === "nl"
        ? "premium standaard"
        : L === "fr"
          ? "standard premium"
          : L === "es"
            ? "estándar premium"
            : L === "de"
              ? "Premium-Standard"
              : "premium standard",

    intro:
      L === "nl"
        ? "We bouwen aan vertrouwen met duidelijke communicatie, strakke uitvoering en nazorg. We leveren geen half werk: alleen oplossingen die technisch kloppen én er perfect uitzien."
        : L === "fr"
          ? "Nous construisons la confiance grâce à une communication claire, une exécution soignée et un vrai suivi. Pas de travail à moitié : uniquement des solutions justes techniquement et impeccables visuellement."
          : L === "es"
            ? "Construimos confianza con comunicación clara, ejecución impecable y seguimiento real. Nada a medias: solo soluciones correctas técnicamente y perfectas en acabados."
            : L === "de"
              ? "Wir schaffen Vertrauen durch klare Kommunikation, saubere Ausführung und echte Nachbetreuung. Kein halbes Werk: nur Lösungen, die technisch stimmen und perfekt aussehen."
              : "We build trust with clear communication, clean execution and real aftercare. No half measures: only solutions that are technically correct and finished to a premium standard.",

    cta:
      L === "nl"
        ? "Plan gesprek →"
        : L === "fr"
          ? "Planifier un appel →"
          : L === "es"
            ? "Agendar una llamada →"
            : L === "de"
              ? "Gespräch planen →"
              : "Schedule a call →",

    valuesTitle:
      L === "nl"
        ? "Waar we voor staan"
        : L === "fr"
          ? "Nos engagements"
          : L === "es"
            ? "Nuestros valores"
            : L === "de"
              ? "Wofür wir stehen"
              : "What we stand for",

    valuesSubtitle:
      L === "nl"
        ? "Perfectionistisch, transparant en oplossingsgericht — met één doel: topkwaliteit leveren, elke keer opnieuw."
        : L === "fr"
          ? "Exigeants, transparents et orientés solutions — un seul objectif : livrer une qualité premium, à chaque fois."
          : L === "es"
            ? "Perfeccionistas, transparentes y orientados a soluciones — un objetivo: calidad premium, siempre."
            : L === "de"
              ? "Perfektionistisch, transparent und lösungsorientiert — ein Ziel: Premium-Qualität. Jedes Mal."
              : "Perfectionist, transparent and solution-driven — one goal: premium quality, every single time.",

    values: ((): Card[] => {
      if (L === "fr")
        return [
          { t: "Transparence", d: "Offre claire, planning précis et suivi — sans surprises." },
          { t: "Qualité premium", d: "Matériaux et marques que nous choisirions pour nous-mêmes." },
          { t: "Finitions & détail", d: "Ce qui ne nous convainc pas, n’est pas livré. Point." },
          { t: "Suivi réel", d: "Après la livraison, nous restons disponibles pour service & optimisation." },
          { t: "Sécurité & normes", d: "Exécution selon les règles, propre et professionnelle." },
          { t: "Une équipe, un standard", d: "Un seul interlocuteur et un niveau de qualité constant." },
        ];
      if (L === "es")
        return [
          { t: "Transparencia", d: "Presupuesto claro, planificación sólida y seguimiento — sin sorpresas." },
          { t: "Calidad premium", d: "Materiales y marcas que usaríamos en nuestra propia casa." },
          { t: "Detalle y acabado", d: "Lo que no aprueba nuestro estándar, no se entrega." },
          { t: "Postventa real", d: "Tras la entrega, seguimos disponibles para servicio y optimización." },
          { t: "Seguridad y normas", d: "Ejecución limpia y profesional, cumpliendo normativa." },
          { t: "Un equipo, un estándar", d: "Un solo contacto y un nivel de calidad constante." },
        ];
      if (L === "de")
        return [
          { t: "Transparenz", d: "Klares Angebot, saubere Planung und konsequente Nachverfolgung." },
          { t: "Premium-Qualität", d: "Materialien und Marken, die wir selbst wählen würden." },
          { t: "Finish & Detail", d: "Was unseren Standard nicht erfüllt, wird nicht abgeliefert." },
          { t: "Echte Nachbetreuung", d: "Auch nach Übergabe bleiben wir für Service & Optimierung erreichbar." },
          { t: "Sicherheit & Normen", d: "Sauber umgesetzt, regelkonform und professionell." },
          { t: "Ein Team, ein Standard", d: "Ein Ansprechpartner und gleichbleibende Qualität." },
        ];
      if (L === "en")
        return [
          { t: "Transparency", d: "Clear quote, solid planning and consistent follow-up — no surprises." },
          { t: "Premium quality", d: "Materials and brands we would choose for our own projects." },
          { t: "Detail & finish", d: "If it doesn’t meet our standard, it doesn’t ship. Period." },
          { t: "Real aftercare", d: "We stay available after delivery for service and optimization." },
          { t: "Safety & compliance", d: "Clean execution according to rules and best practices." },
          { t: "One team, one standard", d: "One point of contact with consistent quality throughout." },
        ];
      return [
        { t: "Transparant", d: "Heldere offerte, strakke planning en opvolging — zonder verrassingen." },
        { t: "Premium kwaliteit", d: "Materialen en merken die we zelf zouden kiezen." },
        { t: "Afwerking & detail", d: "Wat onze standaard niet haalt, leveren we niet op. Punt." },
        { t: "Echte nazorg", d: "Na oplevering blijven we bereikbaar voor service en optimalisatie." },
        { t: "Veilig & volgens normen", d: "Netjes uitgevoerd, conform regels en best practices." },
        { t: "Eén team, één standaard", d: "Eén aanspreekpunt met constante kwaliteit doorheen het project." },
      ];
    })(),

    whyTitle:
      L === "nl"
        ? "Waarom klanten voor ons kiezen"
        : L === "fr"
          ? "Pourquoi nos clients nous choisissent"
          : L === "es"
            ? "Por qué nos eligen"
            : L === "de"
              ? "Warum Kunden uns wählen"
              : "Why clients choose us",

    whyPoints: ((): string[] => {
      if (L === "fr")
        return [
          "Stricte attention aux détails — pas de “ça ira”",
          "Communication rapide, claire et structurée",
          "Chantiers propres, finitions nettes",
          "Un interlocuteur, une responsabilité",
          "Qualité mesurable : rendement, durabilité, sécurité",
        ];
      if (L === "es")
        return [
          "Obsesión por el detalle — sin “vale así”",
          "Comunicación rápida, clara y estructurada",
          "Obra limpia, acabados precisos",
          "Un solo contacto, una responsabilidad",
          "Calidad medible: rendimiento, durabilidad, seguridad",
        ];
      if (L === "de")
        return [
          "Konsequente Detailtreue — kein „passt schon“",
          "Schnelle, klare und strukturierte Kommunikation",
          "Saubere Baustellen, präzise Abschlüsse",
          "Ein Ansprechpartner, eine Verantwortung",
          "Messbare Qualität: Effizienz, Langlebigkeit, Sicherheit",
        ];
      if (L === "en")
        return [
          "Relentless attention to detail — no “good enough”",
          "Fast, clear, structured communication",
          "Clean sites and precise finishing",
          "One point of contact, one accountability",
          "Measurable quality: efficiency, durability, safety",
        ];
      return [
        "Perfectionistische afwerking — geen “kan wel”",
        "Snelle, duidelijke communicatie",
        "Nette werven, strakke details",
        "Eén aanspreekpunt, één verantwoordelijkheid",
        "Meetbare kwaliteit: rendement, duurzaamheid, veiligheid",
      ];
    })(),

    processTitle:
      L === "nl"
        ? "Onze werkwijze"
        : L === "fr"
          ? "Notre méthode"
          : L === "es"
            ? "Nuestra forma de trabajar"
            : L === "de"
              ? "Unsere Vorgehensweise"
              : "Our process",

    processSubtitle:
      L === "nl"
        ? "Een duidelijke aanpak, zodat je altijd weet waar je staat."
        : L === "fr"
          ? "Une méthode claire — vous savez toujours où vous en êtes."
          : L === "es"
            ? "Un proceso claro para que siempre sepas en qué punto estamos."
            : L === "de"
              ? "Ein klarer Ablauf — Sie wissen jederzeit, wo wir stehen."
              : "A clear process so you always know where things stand.",

    steps: ((): Step[] => {
      if (L === "fr")
        return [
          { t: "1) Intake & objectifs", d: "Besoin, budget, contraintes techniques, planning souhaité." },
          { t: "2) Proposition technique", d: "Solution + matériaux + planning + choix clairs." },
          { t: "3) Exécution premium", d: "Chantier propre, contrôle qualité continu, communication rapide." },
          { t: "4) Livraison & suivi", d: "Explication, vérifications, optimisation et service." },
        ];
      if (L === "es")
        return [
          { t: "1) Intake y objetivos", d: "Necesidades, presupuesto, requisitos técnicos y plazos." },
          { t: "2) Propuesta técnica", d: "Solución + materiales + planificación + decisiones claras." },
          { t: "3) Ejecución premium", d: "Obra limpia, control de calidad continuo, comunicación rápida." },
          { t: "4) Entrega y soporte", d: "Explicación, comprobaciones, optimización y servicio." },
        ];
      if (L === "de")
        return [
          { t: "1) Intake & Ziele", d: "Bedarf, Budget, technische Rahmenbedingungen, Zeitplan." },
          { t: "2) Technischer Vorschlag", d: "Lösung + Materialien + Planung + klare Entscheidungen." },
          { t: "3) Premium-Ausführung", d: "Saubere Baustelle, laufende QA, schnelle Kommunikation." },
          { t: "4) Übergabe & Service", d: "Erklärung, Checks, Optimierung und Support." },
        ];
      if (L === "en")
        return [
          { t: "1) Intake & goals", d: "Needs, budget, technical constraints and desired timeline." },
          { t: "2) Technical proposal", d: "Solution + materials + planning + clear choices." },
          { t: "3) Premium execution", d: "Clean site, continuous QA, fast communication." },
          { t: "4) Delivery & aftercare", d: "Explanation, checks, optimization and service." },
        ];
      return [
        { t: "1) Intake & advies", d: "Behoefte, budget, technische situatie en gewenste timing." },
        { t: "2) Technisch voorstel", d: "Oplossing + materialen + planning + duidelijke keuzes." },
        { t: "3) Premium uitvoering", d: "Nette werf, continue kwaliteitscontrole, snelle communicatie." },
        { t: "4) Oplevering & nazorg", d: "Uitleg, checks, optimalisatie en service." },
      ];
    })(),

    closingTitle:
      L === "nl"
        ? "Wil je samenwerken met een team dat kwaliteit echt serieus neemt?"
        : L === "fr"
          ? "Envie de travailler avec une équipe qui prend la qualité au sérieux ?"
          : L === "es"
            ? "¿Quieres trabajar con un equipo que se toma la calidad en serio?"
            : L === "de"
              ? "Möchten Sie mit einem Team arbeiten, das Qualität wirklich ernst nimmt?"
              : "Want to work with a team that takes quality seriously?",

    closingText:
      L === "nl"
        ? "Vertel ons wat je wil realiseren. We denken mee, adviseren eerlijk en leveren een afwerking waar we trots op zijn."
        : L === "fr"
          ? "Dites-nous ce que vous souhaitez réaliser. Nous conseillons avec honnêteté et livrons une finition dont nous sommes fiers."
          : L === "es"
            ? "Cuéntanos qué quieres realizar. Asesoramos con honestidad y entregamos un acabado del que estamos orgullosos."
            : L === "de"
              ? "Sagen Sie uns, was Sie umsetzen möchten. Wir beraten ehrlich und liefern ein Finish, auf das wir stolz sind."
              : "Tell us what you want to build. We advise honestly and deliver a finish we’re proud of.",

    closingPrimary:
      L === "nl"
        ? "Contact opnemen →"
        : L === "fr"
          ? "Nous contacter →"
          : L === "es"
            ? "Contactar →"
            : L === "de"
              ? "Kontakt →"
              : "Contact →",

    closingSecondary:
      L === "nl"
        ? "Bekijk projecten"
        : L === "fr"
          ? "Voir les projets"
          : L === "es"
            ? "Ver proyectos"
            : L === "de"
              ? "Projekte ansehen"
              : "View projects",
  };

  return copy;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const copy = getAboutCopy(locale);
  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
  };
}

export default function OverOnsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const copy = getAboutCopy(locale);

  return (
    <PremiumBackground>
      <main className="pt-28">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {copy.kicker}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {copy.titleA} <span className="text-[#F4C44E]">{copy.titleB}</span>
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

        {/* VALUES */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {copy.valuesTitle}
            </h2>
            <p className="mt-3 text-sm text-white/70 md:text-base">
              {copy.valuesSubtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.values.map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.20)] transition hover:bg-white/10"
              >
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {x.t}
                </h3>
                <p className="mt-2 text-sm text-white/70">{x.d}</p>
              </div>
            ))}
          </div>

          {/* WHY */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              {copy.whyTitle}
            </h2>

            <ul className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-2">
              {copy.whyPoints.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#F4C44E]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PROCESS */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-lg font-semibold text-white md:text-xl">
                {copy.processTitle}
              </h2>
              <p className="text-sm text-white/60">{copy.processSubtitle}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {copy.steps.map((s) => (
                <div
                  key={s.t}
                  className={cx(
                    "rounded-2xl border border-white/10 bg-[#050B2A]/30 p-5",
                    "shadow-[0_18px_60px_rgba(0,0,0,0.15)]",
                  )}
                >
                  <h3 className="text-sm font-semibold text-white md:text-base">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CLOSING CTA */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-white md:text-xl">
              {copy.closingTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-3xl text-sm text-white/70 md:text-base">
              {copy.closingText}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {copy.closingPrimary}
              </Link>

              <Link
                href={`/${locale}/projecten`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {copy.closingSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}