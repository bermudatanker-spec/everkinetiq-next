// src/app/[locale]/cookies/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Copy = {
  metaTitle: string;
  title: string;
  updated: string;

  intro: string;

  whatTitle: string;
  whatText: string;

  typesTitle: string;
  typesBullets: Array<{ label: string; text: string }>;

  consentTitle: string;
  consentText: string;

  manageTitle: string;
  manageIntro: string;
  manageBullets: string[];

  thirdTitle: string;
  thirdText: string;

  retentionTitle: string;
  retentionText: string;

  legalTitle: string;
  legalText: string;

  contactTitle: string;
  contactText: string;

  authorityTitle: string;
  authorityText: string;
};

function getCopy(locale: Locale): Copy {
  const c: Record<Locale, Copy> = {
    nl: {
      metaTitle: "Cookiebeleid | Ever Kinetiq Belgium BV",
      title: "Cookiebeleid",
      updated: "Laatst bijgewerkt: 10/01/2026",

      intro:
        "Op deze website gebruiken wij cookies en vergelijkbare technologieën om de website goed te laten werken, het gebruik te meten en (indien u toestemt) de ervaring te verbeteren. In dit cookiebeleid leggen we uit wat cookies zijn, welke cookies we gebruiken en hoe u uw voorkeuren kunt beheren.",

      whatTitle: "Wat zijn cookies?",
      whatText:
        "Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet of smartphone) worden opgeslagen wanneer u een website bezoekt. Ze helpen ons om de website te laten functioneren, instellingen te onthouden en inzicht te krijgen in het gebruik van de website.",

      typesTitle: "Welke soorten cookies gebruiken we?",
      typesBullets: [
        {
          label: "Noodzakelijke cookies",
          text:
            "Deze cookies zijn nodig om de website correct te laten werken (bijv. beveiliging, sessies, basisfunctionaliteit). Ze kunnen niet worden uitgeschakeld via onze instellingen.",
        },
        {
          label: "Voorkeurcookies",
          text:
            "Deze cookies onthouden keuzes die u maakt (bijv. taal of regio) zodat de website gebruiksvriendelijker wordt.",
        },
        {
          label: "Statistische (analytische) cookies",
          text:
            "Deze cookies helpen ons te begrijpen hoe bezoekers de website gebruiken (bijv. welke pagina’s populair zijn). We gebruiken dit om de website te verbeteren. Waar vereist, plaatsen we deze cookies alleen met uw toestemming.",
        },
        {
          label: "Marketingcookies",
          text:
            "Deze cookies kunnen worden gebruikt om content of advertenties relevanter te maken en om de effectiviteit te meten. We plaatsen deze alleen als u daarvoor toestemming geeft.",
        },
      ],

      consentTitle: "Toestemming",
      consentText:
        "Bij uw eerste bezoek tonen wij een cookiebanner. Daar kunt u uw voorkeuren instellen. U kunt uw toestemming op elk moment wijzigen of intrekken via uw browserinstellingen (zie hieronder) of via de cookiebanner als die op de site aanwezig is.",

      manageTitle: "Cookies beheren of verwijderen",
      manageIntro:
        "U kunt cookies beheren of verwijderen via uw browserinstellingen. Houd er rekening mee dat het uitschakelen van cookies kan leiden tot een minder goede werking van de website.",
      manageBullets: [
        "Chrome: Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens",
        "Edge: Instellingen → Cookies en site-machtigingen → Cookies en sitegegevens",
        "Safari: Voorkeuren/Instellingen → Privacy → Beheer websitegegevens",
        "Firefox: Instellingen → Privacy & Beveiliging → Cookies en sitegegevens",
      ],

      thirdTitle: "Cookies van derden",
      thirdText:
        "Sommige functionaliteiten kunnen diensten van derden gebruiken (bijv. analytics of ingesloten content). Deze derden kunnen eigen cookies plaatsen. Wij raden aan hun privacy- en cookieverklaringen te raadplegen. Waar wettelijk vereist vragen wij vooraf uw toestemming.",

      retentionTitle: "Bewaartermijnen",
      retentionText:
        "Cookies kunnen ‘sessiecookies’ zijn (verwijderd zodra u de browser sluit) of ‘permanente cookies’ (blijven langer bewaard). De bewaartermijn verschilt per cookie en per doel. We bewaren cookies niet langer dan nodig is voor het doel waarvoor ze zijn geplaatst.",

      legalTitle: "Wettelijke basis",
      legalText:
        "Voor noodzakelijke cookies baseren wij ons op ons gerechtvaardigd belang om de website veilig en werkend te houden. Voor niet-noodzakelijke cookies (zoals voorkeur-, statistische en marketingcookies) baseren wij ons (waar vereist) op uw toestemming.",

      contactTitle: "Contact",
      contactText:
        "Heeft u vragen over dit cookiebeleid of over uw privacy? Neem contact op via: info@ek-b.nl (Ever Kinetiq Belgium BV).",

      authorityTitle: "Klachten",
      authorityText:
        "Als u van mening bent dat uw gegevens onjuist worden verwerkt, kunt u een klacht indienen bij de Belgische Gegevensbeschermingsautoriteit (GBA/APD).",
    },

    en: {
      metaTitle: "Cookie Policy | Ever Kinetiq Belgium BV",
      title: "Cookie Policy",
      updated: "Last updated: 10/01/2026",

      intro:
        "We use cookies and similar technologies on this website to ensure it works properly, to measure usage and (if you consent) to improve your experience. This cookie policy explains what cookies are, which cookies we use and how you can manage your preferences.",

      whatTitle: "What are cookies?",
      whatText:
        "Cookies are small text files stored on your device (computer, tablet or smartphone) when you visit a website. They help websites function, remember settings and provide insights into how the site is used.",

      typesTitle: "Which types of cookies do we use?",
      typesBullets: [
        {
          label: "Strictly necessary cookies",
          text:
            "Required for the website to function properly (e.g. security, sessions, core features). These cannot be disabled via our settings.",
        },
        {
          label: "Preference cookies",
          text:
            "Remember choices you make (e.g. language or region) to provide a more convenient experience.",
        },
        {
          label: "Statistics (analytics) cookies",
          text:
            "Help us understand how visitors use the website (e.g. popular pages). We use this to improve the site. Where required, we set these cookies only with your consent.",
        },
        {
          label: "Marketing cookies",
          text:
            "May be used to make content or ads more relevant and to measure effectiveness. We set these only if you give consent.",
        },
      ],

      consentTitle: "Consent",
      consentText:
        "On your first visit we show a cookie banner where you can set your preferences. You can change or withdraw your consent at any time via your browser settings (see below) or via the cookie banner if available on the site.",

      manageTitle: "Managing or deleting cookies",
      manageIntro:
        "You can manage or delete cookies via your browser settings. Disabling cookies may affect the functionality of the website.",
      manageBullets: [
        "Chrome: Settings → Privacy and security → Cookies and other site data",
        "Edge: Settings → Cookies and site permissions → Cookies and site data",
        "Safari: Settings → Privacy → Manage website data",
        "Firefox: Settings → Privacy & Security → Cookies and Site Data",
      ],

      thirdTitle: "Third-party cookies",
      thirdText:
        "Some features may use third-party services (e.g. analytics or embedded content). These third parties may place their own cookies. Please review their privacy/cookie notices. Where legally required, we ask for your consent beforehand.",

      retentionTitle: "Retention periods",
      retentionText:
        "Cookies can be session cookies (deleted when you close your browser) or persistent cookies (stored for longer). Retention differs per cookie and purpose. We do not keep cookies longer than necessary for the purpose they were set.",

      legalTitle: "Legal basis",
      legalText:
        "For strictly necessary cookies we rely on our legitimate interest to keep the website secure and operational. For non-essential cookies (preference, analytics, marketing) we rely (where required) on your consent.",

      contactTitle: "Contact",
      contactText:
        "Questions about this cookie policy or your privacy? Contact us at: info@ek-b.nl (Ever Kinetiq Belgium BV).",

      authorityTitle: "Complaints",
      authorityText:
        "If you believe your data is being processed unlawfully, you may lodge a complaint with the Belgian Data Protection Authority (DPA/APD).",
    },

    fr: {
      metaTitle: "Politique de cookies | Ever Kinetiq Belgium BV",
      title: "Politique de cookies",
      updated: "Dernière mise à jour : 10/01/2026",

      intro:
        "Nous utilisons des cookies et des technologies similaires sur ce site afin d’assurer son bon fonctionnement, de mesurer son utilisation et (avec votre consentement) d’améliorer votre expérience. Cette politique explique ce que sont les cookies, lesquels nous utilisons et comment gérer vos préférences.",

      whatTitle: "Qu’est-ce qu’un cookie ?",
      whatText:
        "Les cookies sont de petits fichiers texte enregistrés sur votre appareil (ordinateur, tablette ou smartphone) lorsque vous visitez un site web. Ils aident le site à fonctionner, à mémoriser des paramètres et à analyser l’utilisation.",

      typesTitle: "Quels types de cookies utilisons-nous ?",
      typesBullets: [
        {
          label: "Cookies strictement nécessaires",
          text:
            "Indispensables au fonctionnement du site (ex. sécurité, sessions, fonctionnalités de base). Ils ne peuvent pas être désactivés via nos réglages.",
        },
        {
          label: "Cookies de préférence",
          text:
            "Mémorisent vos choix (ex. langue ou région) afin d’améliorer votre confort d’utilisation.",
        },
        {
          label: "Cookies statistiques (analytics)",
          text:
            "Nous aident à comprendre l’utilisation du site (ex. pages les plus consultées). Nous les utilisons pour améliorer le site. Lorsque requis, ils ne sont déposés qu’avec votre consentement.",
        },
        {
          label: "Cookies marketing",
          text:
            "Peuvent être utilisés pour rendre le contenu ou la publicité plus pertinents et mesurer l’efficacité. Déposés uniquement avec votre consentement.",
        },
      ],

      consentTitle: "Consentement",
      consentText:
        "Lors de votre première visite, une bannière de cookies vous permet de définir vos préférences. Vous pouvez modifier ou retirer votre consentement à tout moment via les réglages du navigateur (voir ci-dessous) ou via la bannière si elle est disponible sur le site.",

      manageTitle: "Gérer ou supprimer les cookies",
      manageIntro:
        "Vous pouvez gérer ou supprimer les cookies via les paramètres de votre navigateur. La désactivation des cookies peut réduire certaines fonctionnalités du site.",
      manageBullets: [
        "Chrome : Paramètres → Confidentialité et sécurité → Cookies et autres données",
        "Edge : Paramètres → Cookies et autorisations de site → Cookies et données",
        "Safari : Réglages → Confidentialité → Gérer les données de sites",
        "Firefox : Paramètres → Vie privée et sécurité → Cookies et données de sites",
      ],

      thirdTitle: "Cookies tiers",
      thirdText:
        "Certaines fonctionnalités peuvent utiliser des services tiers (ex. analytics ou contenus intégrés). Ces tiers peuvent déposer leurs propres cookies. Nous vous recommandons de consulter leurs politiques. Lorsque la loi l’exige, nous demandons votre consentement.",

      retentionTitle: "Durées de conservation",
      retentionText:
        "Les cookies peuvent être des cookies de session (supprimés à la fermeture du navigateur) ou persistants (conservés plus longtemps). La durée dépend du cookie et de sa finalité. Nous ne conservons pas les cookies plus longtemps que nécessaire.",

      legalTitle: "Base juridique",
      legalText:
        "Pour les cookies strictement nécessaires, nous nous appuyons sur notre intérêt légitime à maintenir un site sécurisé et fonctionnel. Pour les cookies non essentiels (préférences, statistiques, marketing), nous nous appuyons (lorsque requis) sur votre consentement.",

      contactTitle: "Contact",
      contactText:
        "Des questions ? Contactez-nous : info@ek-b.nl (Ever Kinetiq Belgium BV).",

      authorityTitle: "Réclamations",
      authorityText:
        "Si vous estimez que vos données sont traitées illégalement, vous pouvez déposer une plainte auprès de l’Autorité de protection des données belge (APD/GBA).",
    },

    es: {
      metaTitle: "Política de cookies | Ever Kinetiq Belgium BV",
      title: "Política de cookies",
      updated: "Última actualización: 10/01/2026",

      intro:
        "Usamos cookies y tecnologías similares en este sitio web para que funcione correctamente, para medir el uso y (si usted lo acepta) mejorar su experiencia. Esta política explica qué son las cookies, cuáles usamos y cómo gestionar sus preferencias.",

      whatTitle: "¿Qué son las cookies?",
      whatText:
        "Las cookies son pequeños archivos de texto que se guardan en su dispositivo (ordenador, tablet o móvil) cuando visita un sitio web. Ayudan a que el sitio funcione, recuerdan ajustes y permiten analizar el uso.",

      typesTitle: "¿Qué tipos de cookies utilizamos?",
      typesBullets: [
        {
          label: "Cookies estrictamente necesarias",
          text:
            "Necesarias para el funcionamiento del sitio (p. ej. seguridad, sesiones, funciones básicas). No se pueden desactivar desde nuestros ajustes.",
        },
        {
          label: "Cookies de preferencias",
          text:
            "Recuerdan sus elecciones (p. ej. idioma o región) para mejorar la experiencia.",
        },
        {
          label: "Cookies estadísticas (analíticas)",
          text:
            "Nos ayudan a entender cómo se usa el sitio (p. ej. páginas más visitadas). Se usan para mejorar el sitio. Cuando sea obligatorio, solo se instalan con su consentimiento.",
        },
        {
          label: "Cookies de marketing",
          text:
            "Pueden usarse para mostrar contenido/anuncios más relevantes y medir su eficacia. Solo se instalan con su consentimiento.",
        },
      ],

      consentTitle: "Consentimiento",
      consentText:
        "En su primera visita mostramos un banner de cookies para configurar preferencias. Puede cambiar o retirar su consentimiento en cualquier momento desde los ajustes del navegador (ver abajo) o desde el banner si está disponible.",

      manageTitle: "Gestionar o eliminar cookies",
      manageIntro:
        "Puede gestionar o eliminar cookies desde la configuración de su navegador. Desactivar cookies puede afectar al funcionamiento del sitio.",
      manageBullets: [
        "Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios",
        "Edge: Configuración → Cookies y permisos del sitio → Cookies y datos del sitio",
        "Safari: Configuración → Privacidad → Gestionar datos de sitios web",
        "Firefox: Configuración → Privacidad y seguridad → Cookies y datos del sitio",
      ],

      thirdTitle: "Cookies de terceros",
      thirdText:
        "Algunas funciones pueden utilizar servicios de terceros (p. ej. analítica o contenido incrustado). Estos terceros pueden instalar sus propias cookies. Recomendamos consultar sus políticas. Cuando la ley lo exija, solicitaremos su consentimiento.",

      retentionTitle: "Plazos de conservación",
      retentionText:
        "Las cookies pueden ser de sesión (se eliminan al cerrar el navegador) o persistentes (se guardan más tiempo). El plazo depende de la cookie y la finalidad. No conservamos cookies más tiempo del necesario.",

      legalTitle: "Base legal",
      legalText:
        "Para cookies estrictamente necesarias nos basamos en nuestro interés legítimo de mantener el sitio seguro y operativo. Para cookies no esenciales (preferencias, analíticas, marketing) nos basamos (cuando sea necesario) en su consentimiento.",

      contactTitle: "Contacto",
      contactText:
        "¿Preguntas? Contáctenos: info@ek-b.nl (Ever Kinetiq Belgium BV).",

      authorityTitle: "Reclamaciones",
      authorityText:
        "Si cree que sus datos se tratan de forma ilegal, puede presentar una reclamación ante la Autoridad Belga de Protección de Datos (APD/GBA).",
    },

    de: {
      metaTitle: "Cookie-Richtlinie | Ever Kinetiq Belgium BV",
      title: "Cookie-Richtlinie",
      updated: "Zuletzt aktualisiert: 10/01/2026",

      intro:
        "Wir verwenden Cookies und ähnliche Technologien, um die Website funktionsfähig zu halten, die Nutzung zu messen und (mit Ihrer Einwilligung) die Nutzererfahrung zu verbessern. Diese Richtlinie erklärt, was Cookies sind, welche wir verwenden und wie Sie Ihre Einstellungen verwalten.",

      whatTitle: "Was sind Cookies?",
      whatText:
        "Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Tablet oder Smartphone) gespeichert werden, wenn Sie eine Website besuchen. Sie helfen bei der Funktion der Website, speichern Einstellungen und ermöglichen Analysen.",

      typesTitle: "Welche Cookie-Arten verwenden wir?",
      typesBullets: [
        {
          label: "Unbedingt erforderliche Cookies",
          text:
            "Notwendig für die Grundfunktionen der Website (z. B. Sicherheit, Sitzungen, Kernfunktionen). Diese können nicht über unsere Einstellungen deaktiviert werden.",
        },
        {
          label: "Präferenz-Cookies",
          text:
            "Merken sich Ihre Auswahl (z. B. Sprache oder Region), um die Nutzung komfortabler zu machen.",
        },
        {
          label: "Statistik-/Analyse-Cookies",
          text:
            "Helfen uns zu verstehen, wie die Website genutzt wird (z. B. beliebte Seiten). Wir nutzen dies zur Verbesserung. Wo erforderlich, setzen wir diese Cookies nur mit Ihrer Einwilligung.",
        },
        {
          label: "Marketing-Cookies",
          text:
            "Können verwendet werden, um Inhalte/Werbung relevanter zu machen und die Wirksamkeit zu messen. Diese werden nur mit Ihrer Einwilligung gesetzt.",
        },
      ],

      consentTitle: "Einwilligung",
      consentText:
        "Beim ersten Besuch zeigen wir ein Cookie-Banner, in dem Sie Ihre Präferenzen festlegen können. Sie können Ihre Einwilligung jederzeit über die Browser-Einstellungen (siehe unten) oder über das Banner (falls vorhanden) ändern oder widerrufen.",

      manageTitle: "Cookies verwalten oder löschen",
      manageIntro:
        "Sie können Cookies über die Einstellungen Ihres Browsers verwalten oder löschen. Das Deaktivieren von Cookies kann die Funktionalität der Website beeinträchtigen.",
      manageBullets: [
        "Chrome: Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten",
        "Edge: Einstellungen → Cookies und Websiteberechtigungen → Cookies und Website-Daten",
        "Safari: Einstellungen → Datenschutz → Website-Daten verwalten",
        "Firefox: Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten",
      ],

      thirdTitle: "Cookies von Drittanbietern",
      thirdText:
        "Einige Funktionen nutzen ggf. Dienste von Drittanbietern (z. B. Analytics oder eingebettete Inhalte). Diese Dritten können eigene Cookies setzen. Bitte prüfen Sie deren Richtlinien. Wo gesetzlich erforderlich, holen wir Ihre Einwilligung ein.",

      retentionTitle: "Speicherdauer",
      retentionText:
        "Cookies können Sitzungs-Cookies (werden beim Schließen des Browsers gelöscht) oder permanente Cookies (bleiben länger gespeichert) sein. Die Speicherdauer hängt vom Cookie und Zweck ab. Wir speichern Cookies nicht länger als erforderlich.",

      legalTitle: "Rechtsgrundlage",
      legalText:
        "Für notwendige Cookies stützen wir uns auf unser berechtigtes Interesse, die Website sicher und funktionsfähig zu betreiben. Für nicht notwendige Cookies (Präferenzen, Statistik, Marketing) stützen wir uns (wo erforderlich) auf Ihre Einwilligung.",

      contactTitle: "Kontakt",
      contactText:
        "Fragen? Kontaktieren Sie uns: info@ek-b.nl (Ever Kinetiq Belgium BV).",

      authorityTitle: "Beschwerden",
      authorityText:
        "Wenn Sie der Meinung sind, dass Ihre Daten unrechtmäßig verarbeitet werden, können Sie eine Beschwerde bei der belgischen Datenschutzbehörde (APD/GBA) einreichen.",
    },
  };

  return c[locale];
}

export const metadata = {
  title: "Cookiebeleid | Ever Kinetiq Belgium BV",
  description: "Cookiebeleid en informatie over het gebruik van cookies op deze website.",
};

export default function CookiesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const t = getCopy(locale);

  return (
    <PremiumBackground>
      <main className="pt-28">
        <article className="mx-auto max-w-4xl px-4 pb-20 text-white">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-white/60">{t.updated}</p>

          <p className="mt-6 text-white/80">{t.intro}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.whatTitle}</h2>
          <p className="mt-3 text-white/80">{t.whatText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.typesTitle}</h2>
          <ul className="mt-4 space-y-4">
            {t.typesBullets.map((b) => (
              <li key={b.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-semibold text-[#F4C44E]">{b.label}</div>
                <div className="mt-2 text-white/80">{b.text}</div>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">{t.consentTitle}</h2>
          <p className="mt-3 text-white/80">{t.consentText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.manageTitle}</h2>
          <p className="mt-3 text-white/80">{t.manageIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
            {t.manageBullets.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold">{t.thirdTitle}</h2>
          <p className="mt-3 text-white/80">{t.thirdText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.retentionTitle}</h2>
          <p className="mt-3 text-white/80">{t.retentionText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.legalTitle}</h2>
          <p className="mt-3 text-white/80">{t.legalText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.contactTitle}</h2>
          <p className="mt-3 text-white/80">{t.contactText}</p>

          <h2 className="mt-10 text-xl font-semibold">{t.authorityTitle}</h2>
          <p className="mt-3 text-white/80">{t.authorityText}</p>
        </article>
      </main>
    </PremiumBackground>
  );
}