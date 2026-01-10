// src/lib/i18n.ts
export const locales = ["nl", "fr", "en", "es", "de"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export type Dict = {
  nav: {
    services: string;
    about: string;
    projects: string;
    news: string;
    contact: string;
    quote: string;
    cta: string;
  };
  hero: {
    kicker: string;
    titleLeft: string;
    titleRight: string;
    subtitleLine1: string;
    subtitleLine2: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      projects: string;
      years: string;
      clients: string;
    };
  };
  sections: {
    servicesKicker: string;
    servicesTitle: string;
    servicesSubtitle: string;

    aboutKicker: string;
    aboutTitle: string;
    aboutSubtitle: string;

    projectsKicker: string;
    projectsTitle: string;
    projectsSubtitle: string;

    contactKicker: string;
    contactTitle: string;
    contactSubtitle: string;
  };
  footer: {
    brandLine: string;

    navTitle: string;
    legalTitle: string;

    home: string;

    privacy: string;
    terms: string;
    cookies: string;
    gdpr: string;

    vatLabel: string;
    vatValue: string;
  };
};

const dicts: Record<Locale, Dict> = {
  nl: {
    nav: {
      services: "Diensten",
      about: "Over ons",
      projects: "Projecten",
      news: "Nieuws",
      contact: "Contact",
      quote: "Offerte aanvragen",
      cta: "Offerte aanvragen",
    },
    hero: {
      kicker: "Premium duurzame energie & totale renovaties",
      titleLeft: "Ever",
      titleRight: "Kinetiq",
      subtitleLine1: "Premium duurzame energie & totale renovaties",
      subtitleLine2: "voor woning en bedrijf",
      ctaPrimary: "Offerte aanvragen",
      ctaSecondary: "Ontdek onze diensten",
      stats: {
        projects: "Projecten",
        years: "Jaar ervaring",
        clients: "Tevreden klanten",
      },
    },
    sections: {
      servicesKicker: "Diensten",
      servicesTitle: "Complete turnkey oplossingen",
      servicesSubtitle:
        "Van zonnepanelen tot totaalrenovaties — één partner, één plan, premium afwerking.",
      aboutKicker: "Over ons",
      aboutTitle: "Waarom EverKinetiq?",
      aboutSubtitle:
        "Meer dan 30 jaar ervaring, strakke planning en kwaliteitscontrole van A tot Z.",
      projectsKicker: "Projecten",
      projectsTitle: "Recente realisaties",
      projectsSubtitle:
        "Een selectie van projecten — premium uitvoering, meetbaar resultaat.",
      contactKicker: "Contact",
      contactTitle: "Vraag uw gratis offerte aan",
      contactSubtitle: "Laat uw gegevens achter en we nemen snel contact op.",
    },
    footer: {
      brandLine:
        "Uw Belgische partner voor premium duurzame energie oplossingen en luxe turnkey renovatieprojecten.",
      navTitle: "Navigatie",
      legalTitle: "Juridisch",
      home: "Home",
      privacy: "Privacybeleid",
      terms: "Algemene voorwaarden",
      cookies: "Cookie beleid",
      gdpr: "GDPR",
      vatLabel: "BTW:",
      vatValue: "BE XXXX.XXX.XXX",
    },
  },

  en: {
    nav: {
      services: "Services",
      about: "About",
      projects: "Projects",
      news: "News",
      contact: "Contact",
      quote: "Request a quote",
      cta: "Request a quote",
    },
    hero: {
      kicker: "Premium sustainable energy & full renovations",
      titleLeft: "Ever",
      titleRight: "Kinetiq",
      subtitleLine1: "Premium sustainable energy & full renovations",
      subtitleLine2: "for home and business",
      ctaPrimary: "Request a quote",
      ctaSecondary: "Explore our services",
      stats: {
        projects: "Projects",
        years: "Years of experience",
        clients: "Satisfied clients",
      },
    },
    sections: {
      servicesKicker: "Services",
      servicesTitle: "Complete turnkey solutions",
      servicesSubtitle:
        "From solar to full renovations — one partner, one plan, premium finish.",
      aboutKicker: "About",
      aboutTitle: "Why EverKinetiq?",
      aboutSubtitle:
        "30+ years of experience, tight planning and quality control end-to-end.",
      projectsKicker: "Projects",
      projectsTitle: "Recent work",
      projectsSubtitle:
        "A selection of projects — premium execution, measurable results.",
      contactKicker: "Contact",
      contactTitle: "Request your free quote",
      contactSubtitle: "Leave your details and we’ll get back to you quickly.",
    },
    footer: {
      brandLine:
        "Your Belgian partner for premium sustainable energy solutions and luxury turnkey renovation projects.",
      navTitle: "Navigation",
      legalTitle: "Legal",
      home: "Home",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      cookies: "Cookie Policy",
      gdpr: "GDPR",
      vatLabel: "VAT:",
      vatValue: "BE XXXX.XXX.XXX",
    },
  },

  fr: {
    nav: {
      services: "Services",
      about: "À propos",
      projects: "Projets",
      news: "Actualités",
      contact: "Contact",
      quote: "Demander un devis",
      cta: "Demander un devis",
    },
    hero: {
      kicker: "Énergie durable premium & rénovations complètes",
      titleLeft: "Ever",
      titleRight: "Kinetiq",
      subtitleLine1: "Énergie durable premium & rénovations complètes",
      subtitleLine2: "pour particuliers et entreprises",
      ctaPrimary: "Demander un devis",
      ctaSecondary: "Découvrir nos services",
      stats: {
        projects: "Projets",
        years: "Années d’expérience",
        clients: "Clients satisfaits",
      },
    },
    sections: {
      servicesKicker: "Services",
      servicesTitle: "Solutions clés en main",
      servicesSubtitle:
        "Du solaire aux rénovations — un partenaire, un plan, une finition premium.",
      aboutKicker: "À propos",
      aboutTitle: "Pourquoi EverKinetiq ?",
      aboutSubtitle:
        "30+ ans d’expérience, planning précis et contrôle qualité de A à Z.",
      projectsKicker: "Projets",
      projectsTitle: "Réalisations récentes",
      projectsSubtitle:
        "Une sélection — exécution premium, résultats mesurables.",
      contactKicker: "Contact",
      contactTitle: "Demandez votre devis gratuit",
      contactSubtitle:
        "Laissez vos coordonnées, nous vous recontactons rapidement.",
    },
    footer: {
      brandLine:
        "Votre partenaire belge pour des solutions d’énergie durable premium et des projets de rénovation clés en main haut de gamme.",
      navTitle: "Navigation",
      legalTitle: "Juridique",
      home: "Accueil",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
      cookies: "Politique de cookies",
      gdpr: "GDPR",
      vatLabel: "TVA :",
      vatValue: "BE XXXX.XXX.XXX",
    },
  },

  es: {
    nav: {
      services: "Servicios",
      about: "Nosotros",
      projects: "Proyectos",
      news: "Noticias",
      contact: "Contacto",
      quote: "Pedir presupuesto",
      cta: "Pedir presupuesto",
    },
    hero: {
      kicker: "Energía sostenible premium y renovaciones completas",
      titleLeft: "Ever",
      titleRight: "Kinetiq",
      subtitleLine1: "Energía sostenible premium y renovaciones completas",
      subtitleLine2: "para hogar y empresa",
      ctaPrimary: "Pedir presupuesto",
      ctaSecondary: "Ver servicios",
      stats: {
        projects: "Proyectos",
        years: "Años de experiencia",
        clients: "Clientes satisfechos",
      },
    },
    sections: {
      servicesKicker: "Servicios",
      servicesTitle: "Soluciones llave en mano",
      servicesSubtitle:
        "Del solar a reformas completas — un socio, un plan, acabado premium.",
      aboutKicker: "Nosotros",
      aboutTitle: "¿Por qué EverKinetiq?",
      aboutSubtitle:
        "30+ años de experiencia, planificación sólida y control de calidad total.",
      projectsKicker: "Proyectos",
      projectsTitle: "Trabajos recientes",
      projectsSubtitle:
        "Una selección — ejecución premium, resultados medibles.",
      contactKicker: "Contacto",
      contactTitle: "Solicita tu presupuesto gratis",
      contactSubtitle: "Déjanos tus datos y te contactamos rápidamente.",
    },
    footer: {
      brandLine:
        "Su socio belga para soluciones premium de energía sostenible y proyectos de renovación llave en mano.",
      navTitle: "Navegación",
      legalTitle: "Legal",
      home: "Inicio",
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      cookies: "Política de cookies",
      gdpr: "GDPR",
      vatLabel: "IVA:",
      vatValue: "BE XXXX.XXX.XXX",
    },
  },

  de: {
    nav: {
      services: "Leistungen",
      about: "Über uns",
      projects: "Projekte",
      news: "Neuigkeiten",
      contact: "Kontakt",
      quote: "Angebot anfordern",
      cta: "Angebot anfordern",
    },
    hero: {
      kicker: "Premium nachhaltige Energie & Komplettsanierungen",
      titleLeft: "Ever",
      titleRight: "Kinetiq",
      subtitleLine1: "Premium nachhaltige Energie & Komplettsanierungen",
      subtitleLine2: "für Privat & Gewerbe",
      ctaPrimary: "Angebot anfordern",
      ctaSecondary: "Leistungen entdecken",
      stats: {
        projects: "Projekte",
        years: "Jahre Erfahrung",
        clients: "Zufriedene Kunden",
      },
    },
    sections: {
      servicesKicker: "Leistungen",
      servicesTitle: "Komplette Turnkey-Lösungen",
      servicesSubtitle:
        "Von Solar bis Sanierung — ein Partner, ein Plan, Premium-Ausführung.",
      aboutKicker: "Über uns",
      aboutTitle: "Warum EverKinetiq?",
      aboutSubtitle:
        "30+ Jahre Erfahrung, klare Planung und Qualitätssicherung von A bis Z.",
      projectsKicker: "Projekte",
      projectsTitle: "Aktuelle Referenzen",
      projectsSubtitle:
        "Eine Auswahl — Premium-Umsetzung, messbare Ergebnisse.",
      contactKicker: "Kontakt",
      contactTitle: "Kostenloses Angebot anfordern",
      contactSubtitle: "Daten hinterlassen — wir melden uns schnell.",
    },
    footer: {
      brandLine:
        "Ihr belgischer Partner für Premium-Lösungen nachhaltiger Energie und hochwertige schlüsselfertige Renovationsprojekte.",
      navTitle: "Navigation",
      legalTitle: "Rechtliches",
      home: "Start",
      privacy: "Datenschutz",
      terms: "AGB",
      cookies: "Cookie-Richtlinie",
      gdpr: "GDPR",
      vatLabel: "USt.:",
      vatValue: "BE XXXX.XXX.XXX",
    },
  },
};

export function getDict(locale: Locale) {
  return dicts[locale];
}