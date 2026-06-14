// src/app/[locale]/gdpr/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Section = { h: string; p: string[]; list?: string[] };
type Copy = { title: string; updated: string; intro: string[]; sections: Section[] };

function getCopy(locale: Locale): Copy {
  const c: Record<Locale, Copy> = {
    nl: {
      title: "GDPR / Gegevensbescherming",
      updated: "Laatst bijgewerkt: 10/01/2026",
      intro: [
        "Op deze pagina geven we extra informatie over uw rechten en hoe u verzoeken kunt indienen (inzage, verwijdering, etc.).",
      ],
      sections: [
        {
          h: "1. Hoe dient u een verzoek in?",
          p: [
            "U kunt een verzoek indienen via info@ek-b.nl met als onderwerp “GDPR verzoek”.",
            "Vermeld duidelijk welke gegevens of welk recht u wil uitoefenen. We kunnen bijkomende info vragen om uw identiteit te verifiëren.",
          ],
        },
        {
          h: "2. Reactietermijnen",
          p: ["Wij reageren in principe binnen 30 dagen. Bij complexe verzoeken kan deze termijn worden verlengd conform GDPR."],
        },
        {
          h: "3. Uw rechten (overzicht)",
          p: ["U kan o.a. volgende rechten uitoefenen:"],
          list: [
            "Inzage in uw persoonsgegevens.",
            "Correctie van foutieve gegevens.",
            "Verwijdering (in bepaalde gevallen).",
            "Beperking van verwerking.",
            "Bezwaar tegen verwerking (met name marketing).",
            "Gegevensoverdraagbaarheid.",
            "Intrekken van toestemming.",
          ],
        },
        {
          h: "4. Klacht",
          p: [
            "U kan een klacht indienen bij de Gegevensbeschermingsautoriteit:",
            "https://www.gegevensbeschermingsautoriteit.be/",
          ],
        },
      ],
    },

    en: {
      title: "GDPR / Data Protection",
      updated: "Last updated: 10/01/2026",
      intro: ["This page explains how to exercise your GDPR rights and how to submit requests."],
      sections: [
        { h: "1. How to submit a request", p: ["Email info@ek-b.nl with subject “GDPR request”. We may ask for verification."] },
        { h: "2. Response times", p: ["We typically respond within 30 days. This may be extended for complex requests as allowed by GDPR."] },
        {
          h: "3. Your rights",
          p: ["You may have the right to:"],
          list: ["Access.", "Rectification.", "Erasure in certain cases.", "Restriction.", "Objection (especially marketing).", "Portability.", "Withdraw consent."],
        },
        { h: "4. Complaint", p: ["Belgian DPA: https://www.dataprotectionauthority.be/"] },
      ],
    },

    fr: {
      title: "RGPD / Protection des données",
      updated: "Dernière mise à jour : 10/01/2026",
      intro: ["Cette page explique comment exercer vos droits RGPD."],
      sections: [
        { h: "1. Demande", p: ["Envoyez un email à info@ek-b.nl (objet : “Demande RGPD”). Vérification possible."] },
        { h: "2. Délais", p: ["Réponse en principe sous 30 jours (prolongation possible selon le RGPD)."] },
        { h: "3. Droits", p: ["Droits possibles :"], list: ["Accès.", "Rectification.", "Effacement (dans certains cas).", "Limitation.", "Opposition (marketing).", "Portabilité.", "Retrait du consentement."] },
        { h: "4. Réclamation", p: ["APD Belgique : https://www.autoriteprotectiondonnees.be/"] },
      ],
    },

    es: {
      title: "RGPD / Protección de datos",
      updated: "Última actualización: 10/01/2026",
      intro: ["Esta página explica cómo ejercer tus derechos RGPD."],
      sections: [
        { h: "1. Solicitud", p: ["Escribe a info@ek-b.nl (asunto: “Solicitud RGPD”). Podemos verificar identidad."] },
        { h: "2. Plazos", p: ["Respondemos normalmente en 30 días (prórroga posible según RGPD)."] },
        { h: "3. Derechos", p: ["Derechos posibles:"], list: ["Acceso.", "Rectificación.", "Supresión (en ciertos casos).", "Limitación.", "Oposición (marketing).", "Portabilidad.", "Retirar consentimiento."] },
        { h: "4. Reclamación", p: ["Autoridad belga: https://www.autoriteprotectiondonnees.be/"] },
      ],
    },

    de: {
      title: "DSGVO / Datenschutz",
      updated: "Zuletzt aktualisiert: 10.01.2026",
      intro: ["Diese Seite erklärt, wie Sie Ihre DSGVO-Rechte ausüben."],
      sections: [
        { h: "1. Anfrage", p: ["E-Mail an info@ek-b.nl (Betreff: “DSGVO-Anfrage”). Identitätsprüfung möglich."] },
        { h: "2. Fristen", p: ["Antwort i. d. R. innerhalb von 30 Tagen (Verlängerung möglich)."] },
        { h: "3. Rechte", p: ["Mögliche Rechte:"], list: ["Auskunft.", "Berichtigung.", "Löschung (in bestimmten Fällen).", "Einschränkung.", "Widerspruch (Marketing).", "Übertragbarkeit.", "Widerruf der Einwilligung."] },
        { h: "4. Beschwerde", p: ["Belgische Behörde: https://www.dataprotectionauthority.be/"] },
      ],
    },
  };

  return c[locale];
}

export default function GdprPage({ params }: { params: { locale: string } }) {
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