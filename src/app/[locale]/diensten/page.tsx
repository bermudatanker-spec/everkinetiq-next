// src/app/[locale]/diensten/page.tsx
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const metadata = {
  title: "Diensten | EverKinetiq",
  description:
    "EKB / EverKinetiq: kas- en zonnepaneelprojecten, sandwichpanelen, carports met solar roof, renovaties, warmtepompen incl. boringen, bestrating & riolering, padel-overkappingen met solar én opkoop van assimilatie lampen en bekabeling.",
};

type Service = {
  title: string;
  desc: string;
  bullets: string[];
  tag?: string;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function tServiceText(locale: Locale) {
  const L = locale;

  return {
    kicker:
      L === "nl" ? "Diensten" : L === "fr" ? "Services" : L === "es" ? "Servicios" : L === "de" ? "Leistungen" : "Services",

    heroTitleLeft:
      L === "nl" ? "Alles onder één dak:" :
      L === "fr" ? "Tout sous un même toit :" :
      L === "es" ? "Todo bajo un mismo techo:" :
      L === "de" ? "Alles aus einer Hand:" :
      "All-in-one:",

    heroTitleGold:
      L === "nl" ? "Solar, renovatie en totaalprojecten" :
      L === "fr" ? "Solaire, rénovation & projets clés en main" :
      L === "es" ? "Solar, reformas y proyectos llave en mano" :
      L === "de" ? "Solar, Sanierung & schlüsselfertige Projekte" :
      "Solar, renovation & turnkey projects",

    heroSubtitle:
      L === "nl"
        ? "EKB / EverKinetiq realiseert projecten voor woning én bedrijf: van zonnepanelen en carports met solarroof tot renovaties, warmtepompen (incl. boringen) en grond-/rioleringswerken."
        : L === "fr"
          ? "EKB / EverKinetiq réalise des projets pour particuliers et entreprises : du photovoltaïque et carports SolarRoof aux rénovations, pompes à chaleur (forages inclus selon projet) et travaux de voirie/égouttage."
          : L === "es"
            ? "EKB / EverKinetiq realiza proyectos para hogar y empresa: desde fotovoltaica y carports SolarRoof hasta reformas, bombas de calor (con perforaciones según proyecto) y obras de pavimentación/alcantarillado."
            : L === "de"
              ? "EKB / EverKinetiq realisiert Projekte für Privat & Gewerbe: von PV und SolarRoof-Carports bis Sanierungen, Wärmepumpen (inkl. Bohrungen je nach Projekt) sowie Erd-/Kanalbau."
              : "EKB / EverKinetiq delivers projects for home & business: from solar and SolarRoof carports to renovations, heat pumps (incl. drilling where applicable) and ground/drainage works.",

    ctaProjects:
      L === "nl" ? "Bekijk projecten" :
      L === "fr" ? "Voir les projets" :
      L === "es" ? "Ver proyectos" :
      L === "de" ? "Projekte ansehen" :
      "View projects",

    bottomTitle:
      L === "nl" ? "Klaar om jouw project te starten?" :
      L === "fr" ? "Prêt à démarrer votre projet ?" :
      L === "es" ? "¿Listo para empezar tu proyecto?" :
      L === "de" ? "Bereit, Ihr Projekt zu starten?" :
      "Ready to start your project?",

    bottomSubtitle:
      L === "nl"
        ? "Stuur ons een korte beschrijving van je project. We antwoorden snel met een voorstel of een afspraak."
        : L === "fr"
          ? "Envoyez une brève description de votre projet. Nous répondons rapidement avec une proposition ou un rendez-vous."
          : L === "es"
            ? "Envíanos una breve descripción de tu proyecto. Respondemos rápido con una propuesta o una cita."
            : L === "de"
              ? "Senden Sie uns eine kurze Beschreibung Ihres Projekts. Wir melden uns schnell mit einem Vorschlag oder Termin."
              : "Send a short description of your project. We'll respond quickly with a proposal or appointment.",

    bottomContact:
      L === "nl" ? "Contact opnemen →" :
      L === "fr" ? "Nous contacter →" :
      L === "es" ? "Contactar →" :
      L === "de" ? "Kontakt →" :
      "Contact →",

    bottomInspiration:
      L === "nl" ? "Inspiratie in projecten" :
      L === "fr" ? "Inspiration projets" :
      L === "es" ? "Inspiración en proyectos" :
      L === "de" ? "Inspiration in Projekten" :
      "Project inspiration",

    sectionSolar:
      L === "nl" ? "Solar & Energie" :
      L === "fr" ? "Solaire & Énergie" :
      L === "es" ? "Solar y Energía" :
      L === "de" ? "Solar & Energie" :
      "Solar & Energy",

    sectionGreenhouse:
      L === "nl" ? "Kas- & Constructieprojecten" :
      L === "fr" ? "Serres & Projets de construction" :
      L === "es" ? "Invernaderos y Construcción" :
      L === "de" ? "Gewächshaus & Konstruktion" :
      "Greenhouse & Construction",

    sectionRenovation:
      L === "nl" ? "Renovatie (woning & bedrijf)" :
      L === "fr" ? "Rénovation (particuliers & entreprises)" :
      L === "es" ? "Reformas (hogar y empresa)" :
      L === "de" ? "Sanierung (Privat & Gewerbe)" :
      "Renovation (home & business)",

    sectionGroundworks:
      L === "nl" ? "Grond-, Wegenis- & Rioleringswerken" :
      L === "fr" ? "Terrassement, voirie & égouttage" :
      L === "es" ? "Movimiento de tierras, pavimentos y alcantarillado" :
      L === "de" ? "Erdarbeiten, Wege & Kanalbau" :
      "Ground, paving & drainage",

    sectionBuyback:
      L === "nl" ? "Opkoop / Recuperatie" :
      L === "fr" ? "Rachat / Récupération" :
      L === "es" ? "Compra / Recuperación" :
      L === "de" ? "Ankauf / Rücknahme" :
      "Buyback / Recovery",
  };
}

export default async function DienstenPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const t = getDict(locale);
  const tt = tServiceText(locale);

  const services: Array<{ section: string; items: Service[] }> = [
    {
      section: tt.sectionSolar,
      items: [
        {
          title:
            locale === "nl"
              ? "Zonnepaneelprojecten (particulier & zakelijk)"
              : locale === "fr"
                ? "Projets photovoltaïques (particuliers & entreprises)"
                : locale === "es"
                  ? "Proyectos fotovoltaicos (hogar y empresa)"
                  : locale === "de"
                    ? "PV-Projekte (Privat & Gewerbe)"
                    : "Solar projects (residential & business)",
          desc:
            locale === "nl"
              ? "Van ontwerp tot plaatsing en oplevering: rendement, veiligheid en nette afwerking staan centraal."
              : locale === "fr"
                ? "De la conception à la mise en service : rendement, sécurité et finitions impeccables."
                : locale === "es"
                  ? "Del diseño a la puesta en marcha: rendimiento, seguridad y acabados impecables."
                  : locale === "de"
                    ? "Von Planung bis Inbetriebnahme: Effizienz, Sicherheit und saubere Ausführung."
                    : "From design to delivery: efficiency, safety and clean finishing.",
          bullets:
            locale === "nl"
              ? [
                  "Advies en dimensionering op verbruik & dak",
                  "Montage op dak, carport of constructie",
                  "Kabeltrajecten, omvormers en afwerking",
                  "Oplevering met duidelijke uitleg",
                ]
              : locale === "fr"
                ? [
                    "Conseil & dimensionnement selon bâtiment",
                    "Montage toiture, carport ou structure",
                    "Câblage, onduleurs et finitions",
                    "Mise en service avec explications claires",
                  ]
                : locale === "es"
                  ? [
                      "Asesoramiento y dimensionamiento",
                      "Montaje en cubierta, carport o estructura",
                      "Cableado, inversores y acabados",
                      "Puesta en marcha con explicación clara",
                    ]
                  : locale === "de"
                    ? [
                        "Beratung & Auslegung nach Bedarf",
                        "Montage Dach, Carport oder Struktur",
                        "Kabelwege, Wechselrichter, Finish",
                        "Inbetriebnahme mit klarer Erklärung",
                      ]
                    : [
                        "Advice & sizing based on consumption",
                        "Installation on roof, carport or structure",
                        "Cabling, inverters and finishing",
                        "Handover with clear explanation",
                      ],
          tag: "Solar",
        },
        {
          title:
            locale === "nl"
              ? "Carports met Solar Roof"
              : locale === "fr"
                ? "Carports avec SolarRoof"
                : locale === "es"
                  ? "Carports con SolarRoof"
                  : locale === "de"
                    ? "Carports mit SolarRoof"
                    : "SolarRoof carports",
          desc:
            locale === "nl"
              ? "Design carports met geïntegreerde zonnepanelen (solarroof) voor een premium uitstraling en maximaal nut."
              : locale === "fr"
                ? "Carports design avec PV intégré (SolarRoof) : premium, utile et élégant."
                : locale === "es"
                  ? "Carports de diseño con PV integrado (SolarRoof): premium, útil y elegante."
                  : locale === "de"
                    ? "Design-Carports mit integriertem PV (SolarRoof): premium, praktisch, elegant."
                    : "Design carports with integrated PV (SolarRoof) for premium looks and maximum use.",
          bullets:
            locale === "nl"
              ? [
                  "Constructie + dakopbouw met solar geïntegreerd",
                  "Afwatering en nette detaillering",
                  "Optioneel: laadpunt voorbereidingen",
                  "Voor woning én bedrijf",
                ]
              : locale === "fr"
                ? [
                    "Structure + toiture avec PV intégré",
                    "Évacuation des eaux & détails soignés",
                    "Option : préparation borne de recharge",
                    "Pour maison & entreprise",
                  ]
                : locale === "es"
                  ? [
                      "Estructura + techo con PV integrado",
                      "Drenaje y detalles impecables",
                      "Opcional: preinstalación de cargador",
                      "Para hogar y empresa",
                    ]
                  : locale === "de"
                    ? [
                        "Konstruktion + Dach mit integriertem PV",
                        "Entwässerung & saubere Details",
                        "Optional: Vorbereitung Wallbox",
                        "Für Privat & Gewerbe",
                      ]
                    : [
                        "Structure + roof with integrated PV",
                        "Drainage and clean detailing",
                        "Optional: EV charger preparation",
                        "For home and business",
                      ],
          tag: "Solar",
        },
        {
          title:
            locale === "nl"
              ? "Padelbaan overkapping met solar"
              : locale === "fr"
                ? "Couverture de padel avec solaire"
                : locale === "es"
                  ? "Cubierta de pádel con solar"
                  : locale === "de"
                    ? "Padel-Überdachung mit Solar"
                    : "Padel cover with solar",
          desc:
            locale === "nl"
              ? "Overkappingen voor padelbanen met zonne-energie: functioneel, robuust en esthetisch."
              : locale === "fr"
                ? "Couvertures pour padel avec énergie solaire : robustes, fonctionnelles et esthétiques."
                : locale === "es"
                  ? "Cubiertas para pádel con energía solar: robustas, funcionales y estéticas."
                  : locale === "de"
                    ? "Padel-Überdachungen mit Solar: robust, funktional, hochwertig."
                    : "Padel court covers with solar: robust, functional and premium.",
          bullets:
            locale === "nl"
              ? [
                  "Constructie- en stabiliteitsconcept",
                  "Dakopbouw met PV-integratie",
                  "Verlichting- en kabeltrajecten mogelijk",
                  "Oplevering voor sportclubs en investeerders",
                ]
              : locale === "fr"
                ? [
                    "Concept structure & stabilité",
                    "Toiture avec PV intégré",
                    "Éclairage & câblage possibles",
                    "Pour clubs et investisseurs",
                  ]
                : locale === "es"
                  ? [
                      "Concepto estructural y estabilidad",
                      "Techo con PV integrado",
                      "Posible iluminación y cableado",
                      "Para clubes e inversores",
                    ]
                  : locale === "de"
                    ? [
                        "Konstruktions- & Stabilitätskonzept",
                        "Dach mit PV-Integration",
                        "Beleuchtung & Kabelwege möglich",
                        "Für Clubs und Investoren",
                      ]
                    : [
                        "Structure & stability concept",
                        "Roof build-up with PV integration",
                        "Lighting and cable routes possible",
                        "Delivered for clubs and investors",
                      ],
          tag: "Solar",
        },
      ],
    },

    {
      section: tt.sectionGreenhouse,
      items: [
        {
          title:
            locale === "nl"
              ? "Kasprojecten"
              : locale === "fr"
                ? "Projets de serre"
                : locale === "es"
                  ? "Proyectos de invernadero"
                  : locale === "de"
                    ? "Gewächshaus-Projekte"
                    : "Greenhouse projects",
          desc:
            locale === "nl"
              ? "Professionele kas- en serreprojecten met focus op duurzaamheid en technische uitvoering."
              : locale === "fr"
                ? "Projets de serres professionnels, axés sur la durabilité et la technique."
                : locale === "es"
                  ? "Proyectos profesionales de invernadero, con foco en durabilidad y técnica."
                  : locale === "de"
                    ? "Professionelle Gewächshaus-Projekte mit Fokus auf Technik und Nachhaltigkeit."
                    : "Professional greenhouse projects focused on durability and technical execution.",
          bullets:
            locale === "nl"
              ? [
                  "Realisatie en montage van kasconstructies",
                  "Technische integraties mogelijk (energie/elektra)",
                  "Projectmatige aanpak met planning en coördinatie",
                ]
              : locale === "fr"
                ? [
                    "Réalisation et montage de structures",
                    "Intégrations techniques possibles (énergie/électricité)",
                    "Approche projet avec planning et coordination",
                  ]
                : locale === "es"
                  ? [
                      "Ejecución y montaje de estructuras",
                      "Integraciones técnicas (energía/electricidad)",
                      "Enfoque de proyecto con planificación",
                    ]
                  : locale === "de"
                    ? [
                        "Realisierung & Montage von Konstruktionen",
                        "Technische Integrationen (Energie/Elektrik)",
                        "Projektansatz mit Planung & Koordination",
                      ]
                    : [
                        "Construction and installation",
                        "Technical integrations (energy/electrical)",
                        "Project-based planning and coordination",
                      ],
          tag: locale === "nl" ? "Project" : "Project",
        },
        {
          title:
            locale === "nl"
              ? "Sandwichpanelen (wand & dak)"
              : locale === "fr"
                ? "Panneaux sandwich (mur & toit)"
                : locale === "es"
                  ? "Paneles sándwich (pared y techo)"
                  : locale === "de"
                    ? "Sandwichpaneele (Wand & Dach)"
                    : "Sandwich panels (wall & roof)",
          desc:
            locale === "nl"
              ? "Isolerende sandwichpanelen voor bedrijfsgebouwen, loodsen en bijgebouwen: strak, efficiënt en duurzaam."
              : locale === "fr"
                ? "Panneaux isolants pour bâtiments : propres, efficaces et durables."
                : locale === "es"
                  ? "Paneles aislantes para edificios: limpios, eficientes y duraderos."
                  : locale === "de"
                    ? "Isolierende Paneele für Gebäude: sauber, effizient und langlebig."
                    : "Insulated panels for buildings: clean, efficient and durable.",
          bullets:
            locale === "nl"
              ? [
                  "Levering en montage (wand- en dakpanelen)",
                  "Afwerking met profielen en details",
                  "Geschikt voor nieuwbouw en renovatie",
                ]
              : locale === "fr"
                ? ["Fourniture & montage (mur/toit)", "Finition avec profils et détails", "Neuf ou rénovation"]
                : locale === "es"
                  ? ["Suministro e instalación (pared/techo)", "Acabados con perfiles y detalles", "Para obra nueva o reforma"]
                  : locale === "de"
                    ? ["Lieferung & Montage (Wand/Dach)", "Finish mit Profilen & Details", "Neubau oder Sanierung"]
                    : ["Supply & installation (wall/roof)", "Finishing profiles and details", "New build or renovation"],
          tag: locale === "nl" ? "Bouw" : locale === "de" ? "Bau" : "Build",
        },
      ],
    },

    {
      section: tt.sectionRenovation,
      items: [
        {
          title:
            locale === "nl"
              ? "Complete renovaties (turnkey)"
              : locale === "fr"
                ? "Rénovations complètes (clés en main)"
                : locale === "es"
                  ? "Reformas completas (llave en mano)"
                  : locale === "de"
                    ? "Komplettsanierungen (schlüsselfertig)"
                    : "Complete renovations (turnkey)",
          desc:
            locale === "nl"
              ? "Volledige renovatie van woning of bedrijfspand: één aanspreekpunt, één kwaliteitsstandaard."
              : locale === "fr"
                ? "Rénovation totale : un interlocuteur, une norme qualité."
                : locale === "es"
                  ? "Reforma total: un contacto, un estándar de calidad."
                  : locale === "de"
                    ? "Komplettsanierung: ein Ansprechpartner, ein Qualitätsstandard."
                    : "Full renovation: one point of contact, one quality standard.",
          bullets:
            locale === "nl"
              ? [
                  "Totaalcoördinatie van A tot Z",
                  "Planning, uitvoering en kwaliteitscontrole",
                  "Premium afwerking, duidelijke communicatie",
                  "Geschikt voor totaalprojecten en deelrenovaties",
                ]
              : locale === "fr"
                ? [
                    "Coordination de A à Z",
                    "Planning, exécution et contrôle qualité",
                    "Finition premium, communication claire",
                    "Total ou partiel",
                  ]
                : locale === "es"
                  ? [
                      "Coordinación de A a Z",
                      "Planificación, ejecución y control de calidad",
                      "Acabado premium, comunicación clara",
                      "Total o parcial",
                    ]
                  : locale === "de"
                    ? [
                        "Gesamtkoordination von A bis Z",
                        "Planung, Ausführung und Qualitätskontrolle",
                        "Premium-Finish, klare Kommunikation",
                        "Gesamt- oder Teilsanierung",
                      ]
                    : [
                        "End-to-end coordination",
                        "Planning, execution and QA",
                        "Premium finish, clear communication",
                        "Full or partial renovations",
                      ],
          tag:
            locale === "nl"
              ? "Renovatie"
              : locale === "fr"
                ? "Rénov."
                : locale === "es"
                  ? "Reforma"
                  : locale === "de"
                    ? "Sanierung"
                    : "Renovation",
        },
      ],
    },

    {
      section: "HVAC",
      items: [
        {
          title:
            locale === "nl"
              ? "Warmtepompen (incl. boringen)"
              : locale === "fr"
                ? "Pompes à chaleur (forages inclus)"
                : locale === "es"
                  ? "Bombas de calor (con perforaciones)"
                  : locale === "de"
                    ? "Wärmepumpen (inkl. Bohrungen)"
                    : "Heat pumps (incl. drilling)",
          desc:
            locale === "nl"
              ? "Warmtepompinstallaties inclusief boringen (waar van toepassing): correct gedimensioneerd en professioneel afgewerkt."
              : locale === "fr"
                ? "Installations de PAC avec forages (selon projet) : dimensionnement correct et finitions pro."
                : locale === "es"
                  ? "Instalaciones con perforaciones (según proyecto): dimensionamiento correcto y acabado profesional."
                  : locale === "de"
                    ? "Installationen inkl. Bohrungen (je nach Projekt): korrekt ausgelegt und sauber umgesetzt."
                    : "Installations incl. drilling where applicable: correctly sized and professionally finished.",
          bullets:
            locale === "nl"
              ? [
                  "Advies en dimensionering op gebouw en verbruik",
                  "Installatie en inregeling",
                  "Boringen inbegrepen (projectafhankelijk)",
                  "Voor woning én bedrijf",
                ]
              : locale === "fr"
                ? [
                    "Conseil & dimensionnement",
                    "Installation & réglages",
                    "Forages inclus (selon projet)",
                    "Maison & entreprise",
                  ]
                : locale === "es"
                  ? [
                      "Asesoramiento y dimensionamiento",
                      "Instalación y puesta a punto",
                      "Perforaciones (según proyecto)",
                      "Hogar y empresa",
                    ]
                  : locale === "de"
                    ? [
                        "Beratung & Auslegung",
                        "Installation & Einregulierung",
                        "Bohrungen (je nach Projekt)",
                        "Privat & Gewerbe",
                      ]
                    : [
                        "Advice & sizing",
                        "Installation & commissioning",
                        "Drilling (project dependent)",
                        "Home & business",
                      ],
          tag: locale === "nl" ? "Warmtepomp" : "HVAC",
        },
      ],
    },

    {
      section: tt.sectionGroundworks,
      items: [
        {
          title:
            locale === "nl"
              ? "Bestratingswerken"
              : locale === "fr"
                ? "Pavage"
                : locale === "es"
                  ? "Pavimentación"
                  : locale === "de"
                    ? "Pflasterarbeiten"
                    : "Paving works",
          desc:
            locale === "nl"
              ? "Opritten, terrassen en bedrijfsterreinen: duurzame onderbouw en strakke plaatsing."
              : locale === "fr"
                ? "Allées, terrasses et sites : base durable et pose précise."
                : locale === "es"
                  ? "Entradas, terrazas y zonas: base duradera y colocación precisa."
                  : locale === "de"
                    ? "Einfahrten, Terrassen, Flächen: stabiler Unterbau und saubere Verlegung."
                    : "Driveways, terraces and sites: durable base and clean installation.",
          bullets:
            locale === "nl"
              ? ["Voorbereiding en fundering", "Plaatsing klinkers/tegels (projectafhankelijk)", "Afwatering en afwerking"]
              : locale === "fr"
                ? ["Préparation & fondation", "Pose pavés/dalles (selon projet)", "Drainage & finitions"]
                : locale === "es"
                  ? ["Preparación y base", "Colocación (según proyecto)", "Drenaje y acabados"]
                  : locale === "de"
                    ? ["Vorbereitung & Fundament", "Verlegung (je nach Projekt)", "Entwässerung & Finish"]
                    : ["Preparation and foundation", "Installation (project dependent)", "Drainage and finishing"],
          tag:
            locale === "nl"
              ? "Wegenis"
              : locale === "fr"
                ? "Voirie"
                : locale === "es"
                  ? "Vial"
                  : locale === "de"
                    ? "Wege"
                    : "Paving",
        },
        {
          title:
            locale === "nl"
              ? "Rioleringswerken"
              : locale === "fr"
                ? "Égouttage"
                : locale === "es"
                  ? "Alcantarillado"
                  : locale === "de"
                    ? "Kanalbau"
                    : "Drainage works",
          desc:
            locale === "nl"
              ? "Aanleg en aanpassing van riolering met focus op correcte hellingen, aansluitingen en netheid."
              : locale === "fr"
                ? "Pose et adaptation d’égouts avec pentes correctes, raccordements et propreté."
                : locale === "es"
                  ? "Instalación y ajuste con pendientes correctas, conexiones y limpieza."
                  : locale === "de"
                    ? "Neu- und Umbau mit korrekten Gefällen, Anschlüssen und sauberer Ausführung."
                    : "Install and adapt drainage with correct slopes, connections and clean work.",
          bullets:
            locale === "nl"
              ? ["Nieuwe aansluitingen en vernieuwing", "Herstellingen en optimalisaties", "Afwatering en technische afwerking"]
              : locale === "fr"
                ? ["Nouveaux raccordements", "Réparations & optimisations", "Drainage & finitions techniques"]
                : locale === "es"
                  ? ["Nuevas conexiones", "Reparaciones y optimización", "Drenaje y acabados técnicos"]
                  : locale === "de"
                    ? ["Neue Anschlüsse", "Reparaturen & Optimierung", "Entwässerung & technische Details"]
                    : ["New connections", "Repairs and optimization", "Drainage and technical finishing"],
          tag:
            locale === "nl"
              ? "Riolering"
              : locale === "fr"
                ? "Égouts"
                : locale === "es"
                  ? "Drenaje"
                  : locale === "de"
                    ? "Kanal"
                    : "Drainage",
        },
      ],
    },

    {
      section: tt.sectionBuyback,
      items: [
        {
          title:
            locale === "nl"
              ? "Opkoop assimilatie lampen & bekabeling"
              : locale === "fr"
                ? "Rachat lampes d’assimilation & câblage"
                : locale === "es"
                  ? "Compra de lámparas de asimilación y cableado"
                  : locale === "de"
                    ? "Ankauf Assimilationslampen & Verkabelung"
                    : "Buyback of grow lights & cabling",
          desc:
            locale === "nl"
              ? "Wij kopen assimilatie lampen en bekabeling op. Snelle afhandeling en correcte overname."
              : locale === "fr"
                ? "Nous rachetons lampes d’assimilation et câblage. Traitement rapide et reprise correcte."
                : locale === "es"
                  ? "Compramos lámparas de asimilación y cableado. Gestión rápida y compra justa."
                  : locale === "de"
                    ? "Wir kaufen Assimilationslampen und Verkabelung an. Schnell und fair."
                    : "We buy back grow lights and cabling. Fast handling and fair take-over.",
          bullets:
            locale === "nl"
              ? ["Opkoop van assimilatie lampen", "Opkoop van bekabeling", "Ophaling/afhandeling in overleg"]
              : locale === "fr"
                ? ["Rachat lampes d’assimilation", "Rachat câblage", "Enlèvement selon accord"]
                : locale === "es"
                  ? ["Compra de lámparas", "Compra de cableado", "Recogida según acuerdo"]
                  : locale === "de"
                    ? ["Ankauf Lampen", "Ankauf Verkabelung", "Abholung nach Absprache"]
                    : ["Buyback of lights", "Buyback of cabling", "Pickup/handling by arrangement"],
          tag:
            locale === "nl"
              ? "Opkoop"
              : locale === "fr"
                ? "Rachat"
                : locale === "es"
                  ? "Compra"
                  : locale === "de"
                    ? "Ankauf"
                    : "Buyback",
        },
      ],
    },
  ];

  return (
    <PremiumBackground>
      <main className="pt-28">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {t.sections?.servicesKicker ?? tt.kicker}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {tt.heroTitleLeft} <span className="text-[#F4C44E]">{tt.heroTitleGold}</span>
            </h1>

            <p className="mt-4 text-white/70 md:text-lg">{tt.heroSubtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {/* Gebruik altijd t.nav.cta (die bestaat overal) */}
                {t.nav?.cta ?? tt.kicker}
              </Link>

              <Link
                href={`/${locale}/projecten`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {tt.ctaProjects}
              </Link>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-10">
            {services.map((group) => (
              <div key={group.section}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{group.section}</h2>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-white md:text-lg">{s.title}</h3>
                        {s.tag ? <Badge>{s.tag}</Badge> : null}
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>

                      <ul className="mt-4 space-y-2 text-sm text-white/70">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#F4C44E]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">{tt.bottomTitle}</h3>
            <p className="mt-2 text-sm text-white/70">{tt.bottomSubtitle}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {tt.bottomContact}
              </Link>
              <Link
                href={`/${locale}/projecten`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {tt.bottomInspiration}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}