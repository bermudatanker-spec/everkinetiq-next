// src/app/[locale]/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import HeroSection from "@/components/HeroSection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import ContactForm from "@/components/ContactForm";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";
import Link from "next/link";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { getNewsList } from "@/lib/blog";

type ServiceItem = { title: string; desc: string; icon: string; href?: string };
type ProjectItem = { title: string; image: string };

const SERVICES: Record<Locale, ServiceItem[]> = {
  nl: [
    { title: "Kasprojecten", desc: "Turnkey greenhouse projecten voor professionele tuinbouw en kwekerijen.", icon: "🌿" },
    { title: "Zonnepaneelprojecten", desc: "Residentieel & B2B: premium panelen, omvormers en monitoring.", icon: "☀️" },
    { title: "Sandwichpanelen", desc: "Isolerende panelen voor duurzame bouwconstructies.", icon: "🏠" },
    { title: "Carports met SolarRoof", desc: "Luxe carports met geïntegreerde zonnepanelen.", icon: "🚗" },
    { title: "Renovaties (woning & bedrijf)", desc: "Complete renovaties met strakke planning en afwerking.", icon: "🏗️" },
    { title: "Warmtepompen incl. boringen", desc: "Efficiënt verwarmings- en koelsysteem met grondboringen.", icon: "🌡️" },
    { title: "Bestrating & riolering", desc: "Complete buitenaanleg en rioleringswerken.", icon: "🧱" },
    { title: "Padelbaan overkappingen (solar)", desc: "Overkappingen met geïntegreerde zonne-energie.", icon: "🎾" },
    { title: "Opkoop assimilatie lampen & bekabeling", desc: "Wij kopen professionele assimilatieverlichting en bekabeling op.", icon: "💡" },
    { title: "Onderhoud zonnepanelen", desc: "Schoonmaak, visuele inspectie, thermografisch doormeten en prestatiecontrole van uw installatie.", icon: "🔧", href: "/onderhoud-zonnepanelen" },
  ],
  en: [
    { title: "Greenhouse projects", desc: "Turnkey greenhouse builds for professional horticulture and growers.", icon: "🌿" },
    { title: "Solar projects", desc: "Residential & B2B: premium panels, inverters and monitoring.", icon: "☀️" },
    { title: "Sandwich panels", desc: "Insulated panels for durable building structures.", icon: "🏠" },
    { title: "Carports with SolarRoof", desc: "Luxury carports with integrated solar roof solutions.", icon: "🚗" },
    { title: "Renovations (home & business)", desc: "Complete renovations with tight planning and premium finish.", icon: "🏗️" },
    { title: "Heat pumps incl. drilling", desc: "Efficient heating/cooling systems with ground drilling when applicable.", icon: "🌡️" },
    { title: "Paving & drainage", desc: "Complete exterior works, paving and drainage solutions.", icon: "🧱" },
    { title: "Padel court canopy (solar)", desc: "Padel canopies with integrated solar energy.", icon: "🎾" },
    { title: "Buyback: grow lights & cabling", desc: "We buy back professional grow lights and cabling.", icon: "💡" },
    { title: "Solar panel maintenance", desc: "Cleaning, visual inspection, thermographic testing and performance analysis of your installation.", icon: "🔧", href: "/onderhoud-zonnepanelen" },
  ],
  fr: [
    { title: "Projets de serres", desc: "Projets de serres clés en main pour l’horticulture professionnelle.", icon: "🌿" },
    { title: "Projets solaires", desc: "Résidentiel & B2B : panneaux premium, onduleurs et monitoring.", icon: "☀️" },
    { title: "Panneaux sandwich", desc: "Panneaux isolants pour des constructions durables.", icon: "🏠" },
    { title: "Carports SolarRoof", desc: "Carports premium avec toiture solaire intégrée.", icon: "🚗" },
    { title: "Rénovations (maison & entreprise)", desc: "Rénovations complètes avec planning précis et finition premium.", icon: "🏗️" },
    { title: "Pompes à chaleur + forages", desc: "Chauffage/refroidissement efficace avec forages si applicable.", icon: "🌡️" },
    { title: "Pavage & égouttage", desc: "Travaux extérieurs complets : pavage et égouttage.", icon: "🧱" },
    { title: "Couverture padel (solaire)", desc: "Couvertures de padel avec énergie solaire intégrée.", icon: "🎾" },
    { title: "Rachat : lampes & câblage", desc: "Nous rachetons des lampes d’assimilation et du câblage.", icon: "💡" },
    { title: "Entretien panneaux solaires", desc: "Nettoyage, inspection visuelle, thermographie et analyse des performances de votre installation.", icon: "🔧", href: "/onderhoud-zonnepanelen" },
  ],
  es: [
    { title: "Proyectos de invernadero", desc: "Invernaderos llave en mano para horticultura profesional.", icon: "🌿" },
    { title: "Proyectos solares", desc: "Residencial y B2B: paneles premium, inversores y monitorización.", icon: "☀️" },
    { title: "Paneles sándwich", desc: "Paneles aislantes para construcciones duraderas.", icon: "🏠" },
    { title: "Cocheras SolarRoof", desc: "Carports premium con techo solar integrado.", icon: "🚗" },
    { title: "Reformas (hogar y empresa)", desc: "Reformas completas con planificación estricta y acabado premium.", icon: "🏗️" },
    { title: "Bombas de calor + perforación", desc: "Calefacción/refrigeración eficiente con perforación si aplica.", icon: "🌡️" },
    { title: "Pavimentación y drenaje", desc: "Obra exterior completa: pavimentos y drenaje.", icon: "🧱" },
    { title: "Cubierta de pádel (solar)", desc: "Cubiertas para pádel con energía solar integrada.", icon: "🎾" },
    { title: "Compra: lámparas y cableado", desc: "Compramos lámparas de cultivo y cableado profesional.", icon: "💡" },
    { title: "Mantenimiento paneles solares", desc: "Limpieza, inspección visual, termografía y análisis de rendimiento de su instalación.", icon: "🔧", href: "/onderhoud-zonnepanelen" },
  ],
  de: [
    { title: "Gewächshausprojekte", desc: "Schlüsselfertige Gewächshausprojekte für Profihortikultur.", icon: "🌿" },
    { title: "Solarprojekte", desc: "Privat & B2B: Premium-Module, Wechselrichter und Monitoring.", icon: "☀️" },
    { title: "Sandwichpaneele", desc: "Isolierte Paneele für nachhaltige Baukonstruktionen.", icon: "🏠" },
    { title: "Carports mit SolarRoof", desc: "Premium-Carports mit integrierter Solardach-Lösung.", icon: "🚗" },
    { title: "Sanierungen (Privat & Gewerbe)", desc: "Komplettsanierungen mit klarer Planung und Premium-Finish.", icon: "🏗️" },
    { title: "Wärmepumpen inkl. Bohrungen", desc: "Effizientes Heizen/Kühlen inkl. Bohrungen (falls erforderlich).", icon: "🌡️" },
    { title: "Pflaster & Entwässerung", desc: "Außenanlagen komplett: Pflasterarbeiten und Entwässerung.", icon: "🧱" },
    { title: "Padel-Überdachung (Solar)", desc: "Padel-Überdachungen mit integrierter Solarenergie.", icon: "🎾" },
    { title: "Ankauf: Lampen & Kabel", desc: "Wir kaufen Assimilationslampen und Kabel auf.", icon: "💡" },
    { title: "Wartung Solaranlage", desc: "Reinigung, Sichtprüfung, Thermografie und Leistungsanalyse Ihrer Photovoltaikanlage.", icon: "🔧", href: "/onderhoud-zonnepanelen" },
  ],
};

const PROJECTS: Record<Locale, ProjectItem[]> = {
  nl: [
    { title: "Residentiële Zonnepanelen", image: "/projects/everkinetiq-professionele-kas-turnkey-01.jpg" },
    { title: "Bedrijfshal Zonnepanelen", image: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg" },
    { title: "Solar Carport", image: "/projects/everkinetiq-zonnepanelen-residentieel-10.jpg" },
    { title: "Warmtepomp Installatie", image: "/projects/everkinetiq-warmtepomp-compleet-systeem-05.jpg" },
    { title: "Agrarisch Project (Kasbouw)", image: "/projects/everkinetiq-kas-projecten-tuinbouw-07.jpg" },
    { title: "Groot Commercieel Project", image: "/projects/everkinetiq-woningrenovatie-totaal-01.jpg" },
  ],
  en: [
    { title: "Residential Solar Panels", image: "/projects/everkinetiq-professionele-kas-turnkey-01.jpg" },
    { title: "Commercial Roof Solar", image: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg" },
    { title: "Solar Carport", image: "/projects/everkinetiq-zonnepanelen-residentieel-10.jpg" },
    { title: "Heat Pump Installation", image: "/projects/everkinetiq-warmtepomp-compleet-systeem-05.jpg" },
    { title: "Agricultural Project (Greenhouse)", image: "/projects/everkinetiq-kas-projecten-tuinbouw-07.jpg" },
    { title: "Large Commercial Project", image: "/projects/everkinetiq-woningrenovatie-totaal-01.jpg" },
  ],
  fr: [
    { title: "Panneaux solaires résidentiels", image: "/projects/everkinetiq-professionele-kas-turnkey-01.jpg" },
    { title: "Toiture commerciale solaire", image: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg" },
    { title: "Carport solaire", image: "/projects/everkinetiq-zonnepanelen-residentieel-10.jpg" },
    { title: "Installation pompe à chaleur", image: "/projects/everkinetiq-warmtepomp-compleet-systeem-05.jpg" },
    { title: "Projet agricole (serre)", image: "/projects/everkinetiq-kas-projecten-tuinbouw-07.jpg" },
    { title: "Grand projet commercial", image: "/projects/everkinetiq-woningrenovatie-totaal-01.jpg" },
  ],
  es: [
    { title: "Paneles solares residenciales", image: "/projects/everkinetiq-professionele-kas-turnkey-01.jpg" },
    { title: "Tejado comercial solar", image: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg" },
    { title: "Carport solar", image: "/projects/everkinetiq-zonnepanelen-residentieel-10.jpg" },
    { title: "Instalación bomba de calor", image: "/projects/everkinetiq-warmtepomp-compleet-systeem-05.jpg" },
    { title: "Proyecto agrícola (invernadero)", image: "/projects/everkinetiq-kas-projecten-tuinbouw-07.jpg" },
    { title: "Gran proyecto comercial", image: "/projects/everkinetiq-woningrenovatie-totaal-01.jpg" },
  ],
  de: [
    { title: "Wohnhaus-Solaranlage", image: "/projects/everkinetiq-professionele-kas-turnkey-01.jpg" },
    { title: "Gewerbedach-Solaranlage", image: "/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg" },
    { title: "Solar-Carport", image: "/projects/everkinetiq-zonnepanelen-residentieel-10.jpg" },
    { title: "Wärmepumpen-Installation", image: "/projects/everkinetiq-warmtepomp-compleet-systeem-05.jpg" },
    { title: "Agrarprojekt (Gewächshaus)", image: "/projects/everkinetiq-kas-projecten-tuinbouw-07.jpg" },
    { title: "Großes Gewerbeprojekt", image: "/projects/everkinetiq-woningrenovatie-totaal-01.jpg" },
  ],
};

const TESTIMONIALS: Record<Locale, { quote: string; name: string; location: string; project: string }[]> = {
  nl: [
    { quote: "Van eerste gesprek tot oplevering verliep alles vlekkeloos. Het team dacht echt mee en de kwaliteit van de afwerking is top.", name: "Marc Verhoeven", location: "Hoogstraten", project: "Solar carport" },
    { quote: "Onze nieuwe kas werd volledig turnkey geleverd, op tijd en binnen budget. Aanrader voor elke kweker.", name: "Lieve Janssens", location: "Meer", project: "Kasproject" },
    { quote: "De warmtepomp inclusief boring is perfect geïnstalleerd. Duidelijke communicatie en vakkundige uitvoering.", name: "Tom De Wilde", location: "Breda", project: "Warmtepomp & boring" },
  ],
  en: [
    { quote: "From the first conversation to delivery, everything went smoothly. The team really listened and the finish quality is excellent.", name: "Marc Verhoeven", location: "Hoogstraten, BE", project: "Solar carport" },
    { quote: "Our new greenhouse was delivered fully turnkey, on time and within budget. Highly recommended for any grower.", name: "Lieve Janssens", location: "Meer, BE", project: "Greenhouse project" },
    { quote: "The heat pump including drilling was installed perfectly. Clear communication and skilled execution throughout.", name: "Tom De Wilde", location: "Breda, NL", project: "Heat pump & drilling" },
  ],
  fr: [
    { quote: "De la première conversation à la livraison, tout s'est déroulé sans accroc. L'équipe a vraiment écouté nos besoins et la finition est excellente.", name: "Marc Verhoeven", location: "Hoogstraten, BE", project: "Carport solaire" },
    { quote: "Notre nouvelle serre a été livrée clé en main, à temps et dans le budget. Recommandé pour tout horticulteur.", name: "Lieve Janssens", location: "Meer, BE", project: "Projet de serre" },
    { quote: "La pompe à chaleur avec forage a été installée parfaitement. Communication claire et exécution professionnelle.", name: "Tom De Wilde", location: "Breda, NL", project: "Pompe à chaleur & forage" },
  ],
  es: [
    { quote: "Desde la primera conversación hasta la entrega, todo fue impecable. El equipo realmente escuchó y el acabado es excelente.", name: "Marc Verhoeven", location: "Hoogstraten, BE", project: "Cochera solar" },
    { quote: "Nuestro nuevo invernadero se entregó llave en mano, a tiempo y dentro del presupuesto. Muy recomendable para cualquier productor.", name: "Lieve Janssens", location: "Meer, BE", project: "Proyecto de invernadero" },
    { quote: "La bomba de calor con perforación se instaló perfectamente. Comunicación clara y ejecución profesional en todo momento.", name: "Tom De Wilde", location: "Breda, NL", project: "Bomba de calor y perforación" },
  ],
  de: [
    { quote: "Vom ersten Gespräch bis zur Übergabe lief alles reibungslos. Das Team ist wirklich auf unsere Wünsche eingegangen und die Verarbeitung ist erstklassig.", name: "Marc Verhoeven", location: "Hoogstraten, BE", project: "Solar-Carport" },
    { quote: "Unser neues Gewächshaus wurde komplett schlüsselfertig, termingerecht und im Budget geliefert. Sehr empfehlenswert für jeden Gärtner.", name: "Lieve Janssens", location: "Meer, BE", project: "Gewächshausprojekt" },
    { quote: "Die Wärmepumpe inklusive Bohrung wurde perfekt installiert. Klare Kommunikation und fachkundige Ausführung.", name: "Tom De Wilde", location: "Breda, NL", project: "Wärmepumpe & Bohrung" },
  ],
};

const UI: Record<
  Locale,
  {
    viewAllServices: string;
    readMore: string;
    viewProjects: string;
    goContact: string;
    premiumLine: string;
    aboutCards: { t: string; d: string }[];
    testimonialsKicker: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    contactSending: string;
    contactSuccess: string;
    contactError: string;
    contact: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      details: string;
      address: string;
      tel: string;
      mail: string;
      premiumCopy: string;
    };
  }
> = {
  nl: {
    viewAllServices: "Bekijk alle diensten →",
    readMore: "Lees meer over ons →",
    viewProjects: "Naar projectenpagina →",
    goContact: "Naar contactpagina →",
    premiumLine: "Premium uitvoering met oog voor detail.",
    testimonialsKicker: "Reviews",
    testimonialsTitle: "Wat onze klanten zeggen",
    testimonialsSubtitle: "Echte ervaringen van klanten die ons hun project toevertrouwden.",
    contactSending: "Verzenden...",
    contactSuccess: "Bericht verzonden! We nemen zo snel mogelijk contact met u op.",
    contactError: "Er ging iets mis bij het verzenden. Probeer het later opnieuw of bel ons direct.",
    aboutCards: [
      { t: "Eén aanspreekpunt", d: "Van intake tot oplevering: helder, snel en transparant." },
      { t: "Premium afwerking", d: "We werken met hoogwaardige materialen en strikte kwaliteitscontrole." },
      { t: "Service & nazorg", d: "Ook na oplevering blijven we bereikbaar voor opvolging en optimalisatie." },
    ],
    contact: {
      name: "Naam *",
      email: "E-mail *",
      phone: "Telefoon",
      message: "Uw bericht *",
      submit: "Verstuur bericht →",
      details: "Gegevens",
      address: "Adres:",
      tel: "Telefoon:",
      mail: "E-mail:",
      premiumCopy: "Door te verzenden ga je akkoord dat we je contacteren over je aanvraag.",
    },
  },
  en: {
    viewAllServices: "View all services →",
    readMore: "Read more →",
    viewProjects: "View projects →",
    goContact: "Go to contact →",
    premiumLine: "Premium execution with attention to detail.",
    testimonialsKicker: "Reviews",
    testimonialsTitle: "What our clients say",
    testimonialsSubtitle: "Real experiences from clients who trusted us with their project.",
    contactSending: "Sending...",
    contactSuccess: "Message sent! We'll get back to you as soon as possible.",
    contactError: "Something went wrong while sending. Please try again later or call us directly.",
    aboutCards: [
      { t: "One point of contact", d: "Clear, fast and transparent from start to finish." },
      { t: "Premium finish", d: "Top materials and strict quality control — no compromises." },
      { t: "Aftercare & service", d: "We stay available after delivery for follow-up and optimization." },
    ],
    contact: {
      name: "Name *",
      email: "Email *",
      phone: "Phone",
      message: "Your message *",
      submit: "Send message →",
      details: "Details",
      address: "Address:",
      tel: "Phone:",
      mail: "Email:",
      premiumCopy: "By sending, you agree that we contact you about your request.",
    },
  },
  fr: {
    viewAllServices: "Voir tous les services →",
    readMore: "En savoir plus →",
    viewProjects: "Voir les projets →",
    goContact: "Aller au contact →",
    premiumLine: "Exécution premium, souci du détail.",
    testimonialsKicker: "Avis",
    testimonialsTitle: "Ce que disent nos clients",
    testimonialsSubtitle: "Des expériences réelles de clients qui nous ont confié leur projet.",
    contactSending: "Envoi en cours...",
    contactSuccess: "Message envoyé ! Nous vous recontacterons dans les plus brefs délais.",
    contactError: "Une erreur est survenue lors de l'envoi. Réessayez plus tard ou appelez-nous directement.",
    aboutCards: [
      { t: "Un seul interlocuteur", d: "Clair, rapide et transparent du début à la fin." },
      { t: "Finition premium", d: "Matériaux haut de gamme et contrôle qualité strict." },
      { t: "Service & suivi", d: "Nous restons disponibles après livraison pour le suivi." },
    ],
    contact: {
      name: "Nom *",
      email: "E-mail *",
      phone: "Téléphone",
      message: "Votre message *",
      submit: "Envoyer →",
      details: "Coordonnées",
      address: "Adresse :",
      tel: "Téléphone :",
      mail: "E-mail :",
      premiumCopy: "En envoyant, vous acceptez que nous vous contactions au sujet de votre demande.",
    },
  },
  es: {
    viewAllServices: "Ver todos los servicios →",
    readMore: "Saber más →",
    viewProjects: "Ver proyectos →",
    goContact: "Ir a contacto →",
    premiumLine: "Ejecución premium con atención al detalle.",
    testimonialsKicker: "Opiniones",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonialsSubtitle: "Experiencias reales de clientes que nos confiaron su proyecto.",
    contactSending: "Enviando...",
    contactSuccess: "¡Mensaje enviado! Nos pondremos en contacto lo antes posible.",
    contactError: "Algo salió mal al enviar. Inténtelo más tarde o llámenos directamente.",
    aboutCards: [
      { t: "Un único contacto", d: "Claro, rápido y transparente de principio a fin." },
      { t: "Acabado premium", d: "Materiales de primera y control de calidad estricto." },
      { t: "Servicio y postventa", d: "Seguimos disponibles tras la entrega para soporte y optimización." },
    ],
    contact: {
      name: "Nombre *",
      email: "Email *",
      phone: "Teléfono",
      message: "Mensaje *",
      submit: "Enviar →",
      details: "Datos",
      address: "Dirección:",
      tel: "Teléfono:",
      mail: "Email:",
      premiumCopy: "Al enviar, aceptas que te contactemos sobre tu solicitud.",
    },
  },
  de: {
    viewAllServices: "Alle Leistungen ansehen →",
    readMore: "Mehr erfahren →",
    viewProjects: "Projekte ansehen →",
    goContact: "Zum Kontakt →",
    premiumLine: "Premium-Umsetzung mit Liebe zum Detail.",
    testimonialsKicker: "Bewertungen",
    testimonialsTitle: "Das sagen unsere Kunden",
    testimonialsSubtitle: "Echte Erfahrungen von Kunden, die uns ihr Projekt anvertraut haben.",
    contactSending: "Wird gesendet...",
    contactSuccess: "Nachricht gesendet! Wir melden uns so schnell wie möglich bei Ihnen.",
    contactError: "Beim Senden ist ein Fehler aufgetreten. Versuchen Sie es später erneut oder rufen Sie uns direkt an.",
    aboutCards: [
      { t: "Ein Ansprechpartner", d: "Klar, schnell und transparent von Anfang bis Ende." },
      { t: "Premium-Ausführung", d: "Hochwertige Materialien und strenge Qualitätskontrolle." },
      { t: "Service & Nachbetreuung", d: "Auch nach der Übergabe bleiben wir erreichbar." },
    ],
    contact: {
      name: "Name *",
      email: "E-Mail *",
      phone: "Telefon",
      message: "Nachricht *",
      submit: "Senden →",
      details: "Daten",
      address: "Adresse:",
      tel: "Telefon:",
      mail: "E-Mail:",
      premiumCopy: "Mit dem Absenden stimmen Sie zu, dass wir Sie zu Ihrer Anfrage kontaktieren.",
    },
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const newsPosts = (await getNewsList(locale)).slice(0, 3);

  const stats = [
    { value: "1000+", label: t.hero.stats.projects },
    { value: "30+", label: t.hero.stats.years },
    { value: "100%", label: t.hero.stats.clients },
  ];

  const services = SERVICES[locale];
  const projects = PROJECTS[locale];
  const testimonials = TESTIMONIALS[locale];
  const ui = UI[locale];

  return (
    <PremiumBackground>
      <main className="pt-0">
        <ScrollRevealProvider />

        {/* HERO */}
        <HeroSection t={t.hero} />

        {/* STATS (alleen hier) */}
        <section data-reveal className="reveal relative -mt-10 pb-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  data-reveal
                  className="reveal text-center"
                  style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
                >
                  <div className="text-2xl font-semibold text-[#F4C44E] md:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-white/70 md:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIENSTEN */}
        <section id="diensten" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div data-reveal className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
                {t.sections.servicesKicker}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t.sections.servicesTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                {t.sections.servicesSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const cardClass = "reveal rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10 block";
                const inner = (
                  <>
                    <div className="text-2xl">{s.icon}</div>
                    <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
                    {s.href && (
                      <div className="mt-4 text-xs font-semibold text-[#D97706]">Meer info →</div>
                    )}
                  </>
                );
                return s.href ? (
                  <Link
                    key={s.title}
                    href={`/${locale}${s.href}`}
                    data-reveal
                    className={cardClass + " hover:border-[#D97706]/40"}
                    style={{ ["--reveal-delay" as any]: `${i * 80}ms` }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={s.title}
                    data-reveal
                    className={cardClass}
                    style={{ ["--reveal-delay" as any]: `${i * 80}ms` }}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            <div data-reveal className="reveal mt-10 text-center" style={{ ["--reveal-delay" as any]: `120ms` }}>
              <Link
                href={`/${locale}/diensten`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {ui.viewAllServices}
              </Link>
            </div>
          </div>
        </section>

        {/* OVER ONS */}
        <section id="over-ons" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div data-reveal className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
                {t.sections.aboutKicker}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t.sections.aboutTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                {t.sections.aboutSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {ui.aboutCards.map((x, i) => (
                <div
                  key={x.t}
                  data-reveal
                  className="reveal rounded-2xl border border-white/10 bg-white/5 p-6"
                  style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
                >
                  <h3 className="text-base font-semibold text-white">{x.t}</h3>
                  <p className="mt-2 text-sm text-white/70">{x.d}</p>
                </div>
              ))}
            </div>

            <div data-reveal className="reveal mt-10 text-center" style={{ ["--reveal-delay" as any]: `120ms` }}>
              <Link
                href={`/${locale}/over-ons`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {ui.readMore}
              </Link>
            </div>
          </div>
        </section>

        {/* PROJECTEN */}
        <section id="projecten" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div data-reveal className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
                {t.sections.projectsKicker}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t.sections.projectsTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                {t.sections.projectsSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article
                  key={p.title}
                  data-reveal
                  className="reveal overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
                  style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.7),transparent_55%)]" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{ui.premiumLine}</p>
                  </div>
                </article>
              ))}
            </div>

            <div data-reveal className="reveal mt-10 text-center" style={{ ["--reveal-delay" as any]: `120ms` }}>
              <Link
                href={`/${locale}/projecten`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {ui.viewProjects}
              </Link>
            </div>
          </div>
        </section>

        {/* WAAROM WIJ */}
        <WhyChooseUsSection />

        {/* TESTIMONIALS */}
        <TestimonialsSection
          kicker={ui.testimonialsKicker}
          title={ui.testimonialsTitle}
          subtitle={ui.testimonialsSubtitle}
          items={testimonials}
        />

        {/* LAATSTE NIEUWS */}
        {newsPosts.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-4">
              <div data-reveal className="reveal mx-auto max-w-3xl text-center">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
                  {locale === "nl" ? "Nieuws" : locale === "fr" ? "Actualités" : locale === "es" ? "Noticias" : locale === "de" ? "Neuigkeiten" : "News"}
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {locale === "nl" ? "Laatste nieuws" : locale === "fr" ? "Dernières actualités" : locale === "es" ? "Últimas noticias" : locale === "de" ? "Neuste Beiträge" : "Latest news"}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                  {locale === "nl" ? "Inzichten, projecten en updates van EverKinetiq." : locale === "fr" ? "Analyses, projets et actualités d'EverKinetiq." : locale === "es" ? "Novedades, proyectos y actualizaciones de EverKinetiq." : locale === "de" ? "Einblicke, Projekte und Updates von EverKinetiq." : "Insights, projects and updates from EverKinetiq."}
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {newsPosts.map((post, i) => (
                  <Link
                    key={post._id}
                    href={`/${locale}/nieuws/${post.slug}`}
                    data-reveal
                    className="reveal group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
                    style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
                  >
                    {post.cover && (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.7),transparent_55%)]" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-white">{post.title}</h3>
                      {post.excerpt && (
                        <p className="mt-2 text-sm text-white/70 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="mt-4 text-sm font-semibold text-[#F4C44E]">
                        {locale === "nl" ? "Lees meer →" : locale === "fr" ? "Lire la suite →" : locale === "es" ? "Leer más →" : locale === "de" ? "Mehr lesen →" : "Read more →"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div data-reveal className="reveal mx-auto max-w-3xl text-center">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
                {t.sections.contactKicker}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t.sections.contactTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                {t.sections.contactSubtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div
                data-reveal
                className="reveal rounded-2xl border border-white/10 bg-white/5 p-6"
                style={{ ["--reveal-delay" as any]: `80ms` }}
              >
                <ContactForm
                  labels={ui.contact}
                  sending={ui.contactSending}
                  successMessage={ui.contactSuccess}
                  errorMessage={ui.contactError}
                />
              </div>

              <div className="grid gap-4">
                <div
                  data-reveal
                  className="reveal rounded-2xl border border-white/10 bg-white/5 p-6"
                  style={{ ["--reveal-delay" as any]: `140ms` }}
                >
                  <h3 className="text-base font-semibold text-white">{ui.contact.details}</h3>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <p>
                      <span className="text-white/90">{ui.contact.address}</span>{" "}
                      Ever Kinetiq BV, Bieshof 11, 2321 Meer (Hoogstraten)
                    </p>
                    <p>
                      <span className="text-white/90">{ui.contact.tel}</span> +31 (0)629317622
                    </p>
                    <p>
                      <span className="text-white/90">{ui.contact.mail}</span> info@ek-b.be
                    </p>
                  </div>
                </div>

                <div
                  data-reveal
                  className="reveal overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  style={{ ["--reveal-delay" as any]: `200ms` }}
                >
                  <iframe
                    title="Google Maps"
                    className="h-[280px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=51.4167,4.7667&hl=nl&z=15&output=embed"
                  />
                </div>
              </div>
            </div>

            <div data-reveal className="reveal mt-10 text-center" style={{ ["--reveal-delay" as any]: `120ms` }}>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {ui.goContact}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}