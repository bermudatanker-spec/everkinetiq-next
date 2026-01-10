// src/app/[locale]/cookies/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Section = { h: string; p: string[]; list?: string[] };
type Copy = { title: string; updated: string; intro: string[]; sections: Section[] };

function getCopy(locale: Locale): Copy {
  const c: Record<Locale, Copy> = {
    nl: {
      title: "Cookiebeleid",
      updated: "Laatst bijgewerkt: 10/01/2026",
      intro: [
        "Wij gebruiken cookies en gelijkaardige technologieën om onze website goed te laten werken, te beveiligen en te verbeteren.",
        "Waar vereist vragen wij uw toestemming (bv. voor marketing/analytics cookies).",
      ],
      sections: [
        {
          h: "1. Wat zijn cookies?",
          p: [
            "Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u een website bezoekt. Ze helpen o.a. om voorkeuren te onthouden en de website goed te laten functioneren.",
          ],
        },
        {
          h: "2. Welke soorten cookies gebruiken wij?",
          p: ["Wij kunnen de volgende categorieën gebruiken:"],
          list: [
            "Essentiële cookies: noodzakelijk voor basisfunctionaliteit en beveiliging.",
            "Functionele cookies: onthouden voorkeuren (bv. taal).",
            "Analytische cookies: helpen ons inzicht te krijgen in gebruik (geanonimiseerd waar mogelijk).",
            "Marketing cookies: voor gepersonaliseerde marketing (alleen met toestemming).",
          ],
        },
        {
          h: "3. Beheer van cookies",
          p: [
            "U kunt cookies beheren via uw browserinstellingen (cookies verwijderen/blokkeren). Let op: het uitschakelen van cookies kan bepaalde functies beperken.",
            "Indien u een cookie-banner gebruikt: u kunt uw keuze daar ook aanpassen.",
          ],
        },
        {
          h: "4. Cookies van derden",
          p: [
            "Sommige cookies kunnen van externe partijen zijn (bv. analytics, embedded content). Deze partijen kunnen eigen privacy- en cookievoorwaarden hanteren.",
          ],
        },
        {
          h: "5. Contact",
          p: ["Vragen over cookies? Contacteer ons via info@ek-b.nl."],
        },
      ],
    },

    en: {
      title: "Cookie Policy",
      updated: "Last updated: 10/01/2026",
      intro: [
        "We use cookies and similar technologies to operate, secure and improve our website.",
        "Where required, we ask for your consent (e.g., analytics/marketing cookies).",
      ],
      sections: [
        { h: "1. What are cookies?", p: ["Cookies are small text files stored on your device to help websites function and remember preferences."] },
        {
          h: "2. What types do we use?",
          p: ["We may use:"],
          list: ["Essential cookies (required).", "Functional cookies (preferences like language).", "Analytics cookies (usage insights).", "Marketing cookies (only with consent)."],
        },
        {
          h: "3. Managing cookies",
          p: [
            "You can manage cookies in your browser settings. Disabling cookies may impact site functionality.",
            "If a cookie banner is used, you can also change your preferences there.",
          ],
        },
        { h: "4. Third-party cookies", p: ["Some cookies may be set by third parties (analytics/embedded content). They may have their own policies."] },
        { h: "5. Contact", p: ["Questions? Contact us at info@ek-b.nl."] },
      ],
    },

    fr: {
      title: "Politique relative aux cookies",
      updated: "Dernière mise à jour : 10/01/2026",
      intro: [
        "Nous utilisons des cookies et technologies similaires pour faire fonctionner, sécuriser et améliorer notre site.",
        "Lorsque requis, nous demandons votre consentement (ex. cookies analytics/marketing).",
      ],
      sections: [
        { h: "1. Que sont les cookies ?", p: ["Les cookies sont de petits fichiers texte enregistrés sur votre appareil pour faciliter le fonctionnement du site."] },
        {
          h: "2. Types de cookies",
          p: ["Nous pouvons utiliser :"],
          list: ["Cookies essentiels.", "Cookies fonctionnels (préférences, langue).", "Cookies analytiques.", "Cookies marketing (avec consentement)."],
        },
        { h: "3. Gestion", p: ["Vous pouvez gérer les cookies via votre navigateur. La désactivation peut limiter certaines fonctions."] },
        { h: "4. Cookies tiers", p: ["Certains cookies peuvent provenir de tiers (analytics, contenus intégrés)."] },
        { h: "5. Contact", p: ["Contact : info@ek-b.nl."] },
      ],
    },

    es: {
      title: "Política de cookies",
      updated: "Última actualización: 10/01/2026",
      intro: [
        "Usamos cookies y tecnologías similares para operar, proteger y mejorar el sitio.",
        "Cuando sea necesario, pedimos tu consentimiento (p. ej. cookies de analítica/marketing).",
      ],
      sections: [
        { h: "1. ¿Qué son las cookies?", p: ["Son pequeños archivos de texto que se guardan en tu dispositivo para que el sitio funcione y recuerde preferencias."] },
        {
          h: "2. Tipos de cookies",
          p: ["Podemos usar:"],
          list: ["Cookies esenciales.", "Cookies funcionales (idioma, preferencias).", "Cookies analíticas.", "Cookies de marketing (solo con consentimiento)."],
        },
        { h: "3. Gestión", p: ["Puedes gestionarlas en el navegador. Desactivarlas puede limitar funciones."] },
        { h: "4. Cookies de terceros", p: ["Algunas cookies pueden ser de terceros (analítica, contenido incrustado)."] },
        { h: "5. Contacto", p: ["Contacto: info@ek-b.nl."] },
      ],
    },

    de: {
      title: "Cookie-Richtlinie",
      updated: "Zuletzt aktualisiert: 10.01.2026",
      intro: [
        "Wir verwenden Cookies und ähnliche Technologien, um die Website zu betreiben, zu sichern und zu verbessern.",
        "Soweit erforderlich, holen wir Ihre Einwilligung ein (z. B. Analytics/Marketing).",
      ],
      sections: [
        { h: "1. Was sind Cookies?", p: ["Cookies sind kleine Textdateien auf Ihrem Gerät, die Funktionen und Einstellungen unterstützen."] },
        {
          h: "2. Cookie-Arten",
          p: ["Wir können verwenden:"],
          list: ["Essenzielle Cookies.", "Funktionale Cookies (z. B. Sprache).", "Analytics-Cookies.", "Marketing-Cookies (nur mit Einwilligung)."],
        },
        { h: "3. Verwaltung", p: ["Sie können Cookies im Browser verwalten. Deaktivierung kann Funktionen einschränken."] },
        { h: "4. Drittanbieter", p: ["Einige Cookies können von Drittanbietern stammen (Analytics/Embedded Content)."] },
        { h: "5. Kontakt", p: ["Kontakt: info@ek-b.nl."] },
      ],
    },
  };

  return c[locale];
}

export default function CookiePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const t = getCopy(locale);

  return (
    <PremiumBackground>
      <main className="mx-auto max-w-4xl px-4 pt-28 pb-20 text-white">
        <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-sm text-white/60">{t.updated}</p>

        {t.intro.map((p, i) => (
          <p key={i} className="mt-4 text-white/80 leading-relaxed">
            {p}
          </p>
        ))}

        <div className="mt-10 space-y-10">
          {t.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold">{s.h}</h2>
              {s.p.map((p, idx) => (
                <p key={idx} className="mt-3 text-white/80 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list?.length ? (
                <ul className="mt-4 list-disc pl-6 text-white/80 space-y-2">
                  {s.list.map((li, idx) => (
                    <li key={idx}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </main>
    </PremiumBackground>
  );
}