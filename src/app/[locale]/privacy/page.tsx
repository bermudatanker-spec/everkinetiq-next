// src/app/[locale]/privacy/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Section = { h: string; p: string[]; list?: string[] };
type Copy = {
  title: string;
  updated: string;
  intro: string[];
  companyBlockTitle: string;
  companyBlockLines: string[];
  sections: Section[];
};

function getCopy(locale: Locale): Copy {
  const baseCompany = {
    // ✅ Pas dit 1x aan (adres, btw, e-mail, telefoon)
    name: "Ever Kinetiq Belgium BV",
    email: "info@ek-b.nl",
    website: "https://ek-b.nl",
    address: "Bieshof 11, Meer (Hoogstraten), België",
    vat: "BE 0819.534.291",
    phone: "+31(0)629317622",
  };

  const c: Record<Locale, Copy> = {
    nl: {
      title: "Privacybeleid",
      updated: "Laatst bijgewerkt: 10/01/2026",
      intro: [
        `Dit privacybeleid legt uit hoe ${baseCompany.name} (“wij”, “ons”) persoonsgegevens verwerkt wanneer u onze website bezoekt, contact opneemt, een offerte aanvraagt of klant wordt.`,
        "Wij verwerken persoonsgegevens in overeenstemming met de GDPR/AVG en de Belgische privacywetgeving.",
      ],
      companyBlockTitle: "Verwerkingsverantwoordelijke",
      companyBlockLines: [
        baseCompany.name,
        baseCompany.address,
        `E-mail: ${baseCompany.email}`,
        `Website: ${baseCompany.website}`,
        `BTW: ${baseCompany.vat}`,
        baseCompany.phone ? `Tel: ${baseCompany.phone}` : "",
      ].filter(Boolean),
      sections: [
        {
          h: "1. Welke gegevens verwerken wij?",
          p: [
            "Afhankelijk van uw interactie met ons kunnen wij de volgende categorieën persoonsgegevens verwerken:",
          ],
          list: [
            "Identificatie- en contactgegevens (naam, e-mail, telefoon, adres).",
            "Offerte- en projectgegevens (info die u doorgeeft over uw woning/bedrijf, plannen, foto’s, technische gegevens).",
            "Communicatiegegevens (berichten via contactformulier, e-mail, telefoon).",
            "Facturatie- en contractgegevens (voor klanten).",
            "Website- en cookiegegevens (IP-adres, apparaat-/browsergegevens, pagina-interacties) – zie Cookiebeleid.",
          ],
        },
        {
          h: "2. Waarom verwerken wij uw gegevens? (doeleinden)",
          p: ["Wij verwerken persoonsgegevens voor de volgende doeleinden:"],
          list: [
            "Contact opnemen en vragen beantwoorden.",
            "Offertes opstellen en opvolgen.",
            "Uitvoeren van overeenkomsten (planning, uitvoering, nazorg).",
            "Facturatie, administratie en boekhouding.",
            "Verbeteren van onze website en beveiliging.",
            "Marketingcommunicatie (alleen waar toegestaan en met opt-out/consent).",
          ],
        },
        {
          h: "3. Rechtsgrond (wettelijke basis)",
          p: ["Wij verwerken persoonsgegevens op basis van één of meer van deze rechtsgronden:"],
          list: [
            "Uitvoering van een overeenkomst of voorbereiding daarvan (offerte/contract).",
            "Wettelijke verplichting (boekhouding, fiscale regels).",
            "Gerechtvaardigd belang (klantenservice, beveiliging, beperkte marketing).",
            "Toestemming (bv. bepaalde cookies/nieuwsbrief) – u kunt dit altijd intrekken.",
          ],
        },
        {
          h: "4. Met wie delen wij gegevens?",
          p: [
            "Wij delen persoonsgegevens alleen wanneer dit nodig is voor de uitvoering van onze diensten of wanneer wettelijk verplicht.",
            "Mogelijke ontvangers:",
          ],
          list: [
            "IT- en hostingproviders (bv. website hosting, e-mail).",
            "CRM / planning / boekhoudsoftware (indien gebruikt).",
            "Onderaannemers of partners die bijdragen aan uw project (alleen relevante info).",
            "Overheidsinstanties (indien wettelijk verplicht).",
          ],
        },
        {
          h: "5. Internationale doorgiften",
          p: [
            "Sommige dienstverleners kunnen buiten de EER gevestigd zijn. In dat geval zorgen wij voor passende waarborgen (bv. Standard Contractual Clauses) waar vereist.",
          ],
        },
        {
          h: "6. Bewaartermijnen",
          p: [
            "Wij bewaren persoonsgegevens niet langer dan nodig voor de doeleinden waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is.",
          ],
          list: [
            "Offerte-aanvragen: doorgaans tot 24 maanden na laatste contact (tenzij u eerder verwijdering vraagt).",
            "Contract- en facturatiegegevens: volgens wettelijke verplichtingen (meestal 7 tot 10 jaar).",
            "Website/cookies: zie Cookiebeleid.",
          ],
        },
        {
          h: "7. Beveiliging",
          p: [
            "Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beveiligen tegen verlies, misbruik, ongeoorloofde toegang of openbaarmaking (bv. toegangsbeheer, updates, back-ups, minimale rechten).",
          ],
        },
        {
          h: "8. Uw rechten",
          p: ["U heeft (afhankelijk van de situatie) de volgende rechten:"],
          list: [
            "Recht op inzage, correctie en verwijdering.",
            "Recht op beperking van verwerking.",
            "Recht op overdraagbaarheid van gegevens.",
            "Recht van bezwaar tegen verwerking (bv. marketing).",
            "Recht om toestemming in te trekken (waar verwerking op toestemming is gebaseerd).",
          ],
        },
        {
          h: "9. Klachten",
          p: [
            "U kunt een klacht indienen bij de Belgische Gegevensbeschermingsautoriteit (GBA/APD):",
            "https://www.gegevensbeschermingsautoriteit.be/",
            "U kunt ons ook eerst contacteren zodat we samen een oplossing kunnen zoeken.",
          ],
        },
        {
          h: "10. Wijzigingen",
          p: [
            "Wij kunnen dit privacybeleid wijzigen. De meest recente versie staat steeds op onze website.",
          ],
        },
      ],
    },

    en: {
      title: "Privacy Policy",
      updated: "Last updated: 10/01/2026",
      intro: [
        `This Privacy Policy explains how ${baseCompany.name} (“we”, “us”) processes personal data when you visit our website, contact us, request a quote, or become a customer.`,
        "We process personal data in accordance with the GDPR and applicable Belgian privacy laws.",
      ],
      companyBlockTitle: "Data Controller",
      companyBlockLines: [
        baseCompany.name,
        baseCompany.address,
        `Email: ${baseCompany.email}`,
        `Website: ${baseCompany.website}`,
        `VAT: ${baseCompany.vat}`,
        baseCompany.phone ? `Phone: ${baseCompany.phone}` : "",
      ].filter(Boolean),
      sections: [
        {
          h: "1. What data do we process?",
          p: ["Depending on your interaction with us, we may process:"],
          list: [
            "Identification and contact details (name, email, phone, address).",
            "Quote and project details (information you provide about your home/business, plans, photos, technical details).",
            "Communication data (messages via forms, email, phone).",
            "Billing and contract data (for customers).",
            "Website and cookie data (IP address, device/browser data, interactions) – see Cookie Policy.",
          ],
        },
        {
          h: "2. Why do we process your data? (purposes)",
          p: ["We process personal data for:"],
          list: [
            "Responding to questions and contacting you.",
            "Preparing and following up on quotes.",
            "Performing agreements (planning, execution, aftercare).",
            "Billing, administration, and accounting.",
            "Improving website performance and security.",
            "Marketing communications (where permitted, with opt-out/consent).",
          ],
        },
        {
          h: "3. Legal basis",
          p: ["We rely on one or more of the following legal bases:"],
          list: [
            "Performance of a contract / pre-contractual steps (quotes/contract).",
            "Legal obligation (accounting/tax).",
            "Legitimate interest (customer service, security, limited marketing).",
            "Consent (e.g., certain cookies/newsletter) – can be withdrawn at any time.",
          ],
        },
        {
          h: "4. Who do we share data with?",
          p: ["We only share data when necessary or legally required. Possible recipients:"],
          list: [
            "IT/hosting providers (website hosting, email).",
            "CRM / planning / accounting tools (if used).",
            "Subcontractors/partners involved in your project (relevant info only).",
            "Authorities (where legally required).",
          ],
        },
        {
          h: "5. International transfers",
          p: [
            "Some providers may be located outside the EEA. Where required, we implement appropriate safeguards (e.g., Standard Contractual Clauses).",
          ],
        },
        {
          h: "6. Retention periods",
          p: [
            "We keep personal data no longer than necessary unless a longer period is required by law.",
          ],
          list: [
            "Quote requests: typically up to 24 months after last contact.",
            "Contract and billing: as required by law (often 7–10 years).",
            "Website/cookies: see Cookie Policy.",
          ],
        },
        {
          h: "7. Security",
          p: [
            "We implement appropriate technical and organizational measures (access control, updates, backups, least privilege).",
          ],
        },
        {
          h: "8. Your rights",
          p: ["You may have the right to:"],
          list: [
            "Access, rectification, and erasure.",
            "Restriction of processing.",
            "Data portability.",
            "Object to processing (e.g., marketing).",
            "Withdraw consent (where applicable).",
          ],
        },
        {
          h: "9. Complaints",
          p: [
            "You can lodge a complaint with the Belgian Data Protection Authority:",
            "https://www.dataprotectionauthority.be/",
            "You can also contact us first so we can try to resolve the matter together.",
          ],
        },
        {
          h: "10. Changes",
          p: ["We may update this policy. The latest version is always available on our website."],
        },
      ],
    },

    fr: {
      title: "Politique de confidentialité",
      updated: "Dernière mise à jour : 10/01/2026",
      intro: [
        `Cette politique explique comment ${baseCompany.name} (“nous”) traite vos données personnelles lorsque vous visitez notre site, nous contactez, demandez un devis ou devenez client.`,
        "Nous traitons les données conformément au RGPD et au droit belge applicable.",
      ],
      companyBlockTitle: "Responsable du traitement",
      companyBlockLines: [
        baseCompany.name,
        baseCompany.address,
        `E-mail : ${baseCompany.email}`,
        `Site : ${baseCompany.website}`,
        `TVA : ${baseCompany.vat}`,
        baseCompany.phone ? `Tél : ${baseCompany.phone}` : "",
      ].filter(Boolean),
      sections: [
        {
          h: "1. Données traitées",
          p: ["Selon votre interaction, nous pouvons traiter :"],
          list: [
            "Données d’identification et de contact (nom, e-mail, téléphone, adresse).",
            "Données de devis/projet (infos que vous fournissez, plans, photos, données techniques).",
            "Données de communication (formulaire, e-mail, téléphone).",
            "Données contractuelles et de facturation (clients).",
            "Données de site/cookies (IP, navigateur, interactions) – voir Politique cookies.",
          ],
        },
        {
          h: "2. Finalités",
          p: ["Nous traitons les données pour :"],
          list: [
            "Répondre à vos questions et vous contacter.",
            "Établir et suivre les devis.",
            "Exécuter les contrats (planning, réalisation, service après-vente).",
            "Facturation et obligations administratives.",
            "Sécurité et amélioration du site.",
            "Communication marketing (si autorisé, avec opt-out/consentement).",
          ],
        },
        {
          h: "3. Base légale",
          p: ["Nous nous fondons sur :"],
          list: [
            "L’exécution d’un contrat / mesures précontractuelles.",
            "Une obligation légale.",
            "Notre intérêt légitime (service, sécurité, marketing limité).",
            "Votre consentement (cookies/newsletter) – révocable à tout moment.",
          ],
        },
        {
          h: "4. Destinataires",
          p: ["Nous partageons uniquement si nécessaire. Exemples :"],
          list: [
            "Prestataires IT/hébergement.",
            "Outils CRM/planification/comptabilité (si utilisés).",
            "Sous-traitants/partenaires (infos pertinentes uniquement).",
            "Autorités (si obligation légale).",
          ],
        },
        {
          h: "5. Transferts hors EEE",
          p: ["Si nécessaire, nous mettons en place des garanties (ex. clauses contractuelles types)."],
        },
        {
          h: "6. Durées de conservation",
          p: ["Nous conservons les données uniquement le temps nécessaire, sauf obligation légale."],
          list: [
            "Demandes de devis : généralement 24 mois après le dernier contact.",
            "Contrats/factures : selon la loi (souvent 7–10 ans).",
            "Cookies : voir Politique cookies.",
          ],
        },
        { h: "7. Sécurité", p: ["Mesures appropriées (contrôle d’accès, mises à jour, sauvegardes, etc.)."] },
        {
          h: "8. Vos droits",
          p: ["Vous pouvez bénéficier des droits suivants :"],
          list: [
            "Accès, rectification, effacement.",
            "Limitation du traitement.",
            "Portabilité.",
            "Opposition (ex. marketing).",
            "Retrait du consentement.",
          ],
        },
        {
          h: "9. Réclamations",
          p: [
            "Vous pouvez déposer une plainte auprès de l’Autorité de protection des données (Belgique) :",
            "https://www.autoriteprotectiondonnees.be/",
            "Vous pouvez aussi nous contacter d’abord.",
          ],
        },
        { h: "10. Modifications", p: ["Nous pouvons mettre à jour cette politique. Version la plus récente sur le site."] },
      ],
    },

    es: {
      title: "Política de privacidad",
      updated: "Última actualización: 10/01/2026",
      intro: [
        `Esta política explica cómo ${baseCompany.name} (“nosotros”) tratamos datos personales cuando visitas el sitio, nos contactas, solicitas un presupuesto o te conviertes en cliente.`,
        "Tratamos datos conforme al RGPD y la normativa belga aplicable.",
      ],
      companyBlockTitle: "Responsable del tratamiento",
      companyBlockLines: [
        baseCompany.name,
        baseCompany.address,
        `Email: ${baseCompany.email}`,
        `Web: ${baseCompany.website}`,
        `IVA: ${baseCompany.vat}`,
        baseCompany.phone ? `Tel: ${baseCompany.phone}` : "",
      ].filter(Boolean),
      sections: [
        {
          h: "1. Qué datos tratamos",
          p: ["Según tu interacción, podemos tratar:"],
          list: [
            "Datos de identificación y contacto (nombre, email, teléfono, dirección).",
            "Datos de presupuesto/proyecto (información, planos, fotos, datos técnicos).",
            "Datos de comunicación (formularios, email, teléfono).",
            "Datos contractuales y de facturación (clientes).",
            "Datos de web/cookies (IP, navegador, interacciones) – ver Política de cookies.",
          ],
        },
        {
          h: "2. Finalidades",
          p: ["Tratamos datos para:"],
          list: [
            "Responder consultas y contactar contigo.",
            "Preparar y seguir presupuestos.",
            "Ejecutar contratos (planificación, ejecución, posventa).",
            "Facturación y administración.",
            "Seguridad y mejora del sitio.",
            "Marketing (cuando sea legal, con opt-out/consentimiento).",
          ],
        },
        {
          h: "3. Base jurídica",
          p: ["Nos basamos en:"],
          list: [
            "Ejecución de contrato / medidas precontractuales.",
            "Obligación legal.",
            "Interés legítimo (servicio, seguridad, marketing limitado).",
            "Consentimiento (cookies/newsletter) – revocable.",
          ],
        },
        {
          h: "4. Con quién compartimos",
          p: ["Solo cuando sea necesario. Ejemplos:"],
          list: [
            "Proveedores IT/hosting.",
            "Herramientas CRM/planificación/contabilidad (si se usan).",
            "Subcontratistas/partners (solo información relevante).",
            "Autoridades (si es obligatorio).",
          ],
        },
        { h: "5. Transferencias internacionales", p: ["Si procede, aplicamos garantías (p. ej. cláusulas contractuales tipo)."] },
        {
          h: "6. Conservación",
          p: ["Conservamos datos solo el tiempo necesario, salvo obligación legal."],
          list: [
            "Presupuestos: normalmente hasta 24 meses tras el último contacto.",
            "Contratos/facturas: según la ley (a menudo 7–10 años).",
            "Cookies: ver Política de cookies.",
          ],
        },
        { h: "7. Seguridad", p: ["Medidas apropiadas (control de acceso, actualizaciones, copias de seguridad, etc.)."] },
        {
          h: "8. Tus derechos",
          p: ["Puedes tener derecho a:"],
          list: [
            "Acceso, rectificación y supresión.",
            "Limitación del tratamiento.",
            "Portabilidad.",
            "Oposición (p. ej. marketing).",
            "Retirar el consentimiento.",
          ],
        },
        {
          h: "9. Reclamaciones",
          p: [
            "Puedes reclamar ante la Autoridad Belga de Protección de Datos:",
            "https://www.autoriteprotectiondonnees.be/",
            "También puedes contactarnos primero.",
          ],
        },
        { h: "10. Cambios", p: ["Podemos actualizar esta política. La última versión estará en el sitio web."] },
      ],
    },

    de: {
      title: "Datenschutzerklärung",
      updated: "Zuletzt aktualisiert: 10.01.2026",
      intro: [
        `Diese Erklärung beschreibt, wie ${baseCompany.name} („wir“) personenbezogene Daten verarbeitet, wenn Sie unsere Website besuchen, Kontakt aufnehmen, ein Angebot anfragen oder Kunde werden.`,
        "Wir verarbeiten Daten gemäß DSGVO und geltendem belgischem Datenschutzrecht.",
      ],
      companyBlockTitle: "Verantwortlicher",
      companyBlockLines: [
        baseCompany.name,
        baseCompany.address,
        `E-Mail: ${baseCompany.email}`,
        `Website: ${baseCompany.website}`,
        `USt-ID: ${baseCompany.vat}`,
        baseCompany.phone ? `Tel.: ${baseCompany.phone}` : "",
      ].filter(Boolean),
      sections: [
        {
          h: "1. Welche Daten verarbeiten wir?",
          p: ["Je nach Kontakt können wir verarbeiten:"],
          list: [
            "Kontakt- und Identifikationsdaten (Name, E-Mail, Telefon, Adresse).",
            "Angebots-/Projektdaten (Angaben, Pläne, Fotos, technische Details).",
            "Kommunikationsdaten (Formulare, E-Mail, Telefon).",
            "Vertrags- und Rechnungsdaten (Kunden).",
            "Website-/Cookie-Daten (IP, Browser, Interaktionen) – siehe Cookie-Richtlinie.",
          ],
        },
        {
          h: "2. Zwecke",
          p: ["Wir verarbeiten Daten für:"],
          list: [
            "Antwort auf Anfragen und Kontaktaufnahme.",
            "Angebotserstellung und -nachverfolgung.",
            "Vertragsabwicklung (Planung, Ausführung, Nachbetreuung).",
            "Rechnung, Verwaltung, Buchhaltung.",
            "Sicherheit und Verbesserung der Website.",
            "Marketing (nur soweit zulässig, mit Opt-out/Einwilligung).",
          ],
        },
        {
          h: "3. Rechtsgrundlagen",
          p: ["Wir stützen uns auf:"],
          list: [
            "Vertrag / vorvertragliche Maßnahmen.",
            "Rechtliche Verpflichtung.",
            "Berechtigtes Interesse (Service, Sicherheit, begrenztes Marketing).",
            "Einwilligung (Cookies/Newsletter) – jederzeit widerrufbar.",
          ],
        },
        {
          h: "4. Empfänger",
          p: ["Nur wenn nötig. Beispiele:"],
          list: [
            "IT-/Hosting-Dienstleister.",
            "CRM/Planung/Buchhaltung (falls genutzt).",
            "Subunternehmer/Partner (nur relevante Informationen).",
            "Behörden (gesetzlich erforderlich).",
          ],
        },
        { h: "5. Drittlandtransfers", p: ["Falls erforderlich: geeignete Garantien (z. B. Standardvertragsklauseln)."] },
        {
          h: "6. Speicherdauer",
          p: ["Wir speichern Daten nur so lange wie nötig, außer gesetzliche Pflichten."],
          list: [
            "Angebote: typischerweise bis 24 Monate nach letztem Kontakt.",
            "Verträge/Rechnungen: gesetzlich (oft 7–10 Jahre).",
            "Cookies: siehe Cookie-Richtlinie.",
          ],
        },
        { h: "7. Sicherheit", p: ["Geeignete Maßnahmen (Zugriffskontrolle, Updates, Backups usw.)."] },
        {
          h: "8. Ihre Rechte",
          p: ["Sie haben ggf. das Recht auf:"],
          list: ["Auskunft, Berichtigung, Löschung.", "Einschränkung.", "Datenübertragbarkeit.", "Widerspruch.", "Widerruf der Einwilligung."],
        },
        {
          h: "9. Beschwerden",
          p: [
            "Beschwerde bei der belgischen Datenschutzbehörde:",
            "https://www.dataprotectionauthority.be/",
            "Sie können uns auch zuerst kontaktieren.",
          ],
        },
        { h: "10. Änderungen", p: ["Wir können diese Erklärung aktualisieren. Die aktuelle Version steht auf der Website."] },
      ],
    },
  };

  return c[locale];
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">{t.companyBlockTitle}</h2>
          <div className="mt-3 space-y-1 text-sm text-white/80">
            {t.companyBlockLines.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </div>

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