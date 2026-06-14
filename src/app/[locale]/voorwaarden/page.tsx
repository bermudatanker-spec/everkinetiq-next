// src/app/[locale]/voorwaarden/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { isLocale, type Locale } from "@/lib/i18n";

type Section = { h: string; p: string[]; list?: string[] };
type Copy = { title: string; updated: string; intro: string[]; law: string; sections: Section[] };

function getCopy(locale: Locale): Copy {
  const c: Record<Locale, Copy> = {
    nl: {
      title: "Algemene Voorwaarden",
      updated: "Laatst bijgewerkt: 10/01/2026",
      law: "Toepasselijk recht: Belgisch recht. Bevoegde rechtbank: arrondissement van de maatschappelijke zetel (tenzij dwingend anders).",
      intro: [
        "Deze algemene voorwaarden zijn van toepassing op offertes, overeenkomsten en diensten van Ever Kinetiq Belgium BV (“EverKinetiq”).",
        "Door een offerte te aanvaarden of een overeenkomst te sluiten, aanvaardt de klant deze voorwaarden.",
      ],
      sections: [
        {
          h: "1. Offertes en totstandkoming",
          p: ["Offertes zijn vrijblijvend tenzij anders vermeld. Een overeenkomst komt tot stand na schriftelijke aanvaarding (e-mail volstaat) of aanvang van de uitvoering."],
        },
        {
          h: "2. Prijzen en betaling",
          p: ["Prijzen zijn exclusief btw tenzij anders vermeld. Facturen zijn betaalbaar binnen de vermelde termijn. Bij laattijdige betaling kunnen interesten en kosten gelden volgens de wettelijke regels."],
        },
        {
          h: "3. Uitvoering en planning",
          p: [
            "Planningstermijnen zijn indicatief tenzij uitdrukkelijk als bindend overeengekomen. Vertraging door overmacht of derden kan geen aanleiding geven tot schadevergoeding.",
          ],
        },
        {
          h: "4. Medewerking klant",
          p: [
            "De klant bezorgt tijdig correcte info, toegang tot de werf en noodzakelijke vergunningen/goedkeuringen. Extra kosten door ontbrekende of foutieve info zijn voor rekening van de klant.",
          ],
        },
        {
          h: "5. Wijzigingen en meerwerken",
          p: [
            "Wijzigingen of meerwerken worden uitgevoerd na akkoord. Meerwerken kunnen de prijs en planning beïnvloeden.",
          ],
        },
        {
          h: "6. Garantie en aansprakelijkheid",
          p: [
            "Eventuele garanties volgen de wettelijke bepalingen en/of fabrikantgaranties. Onze aansprakelijkheid is beperkt tot directe schade en nooit hoger dan het factuurbedrag voor de betrokken opdracht, behalve bij opzet of dwingend recht.",
          ],
        },
        {
          h: "7. Overmacht",
          p: [
            "Overmacht omvat o.a. stakingen, leveringsproblemen, extreme weersomstandigheden, storingen, overheidsmaatregelen. In geval van overmacht kan uitvoering worden opgeschort of beëindigd zonder schadevergoeding.",
          ],
        },
        {
          h: "8. Intellectuele eigendom",
          p: [
            "Plannen, teksten, foto’s en ontwerpen blijven eigendom van EverKinetiq of haar licentiegevers tenzij anders overeengekomen.",
          ],
        },
        {
          h: "9. Klachten",
          p: [
            "Klachten moeten binnen een redelijke termijn na vaststelling schriftelijk gemeld worden. Dit schort betalingsverplichtingen niet automatisch op.",
          ],
        },
        {
          h: "10. Privacy",
          p: ["Persoonsgegevens worden verwerkt conform ons privacybeleid."],
        },
      ],
    },

    en: {
      title: "Terms & Conditions",
      updated: "Last updated: 10/01/2026",
      law: "Governing law: Belgian law. Courts: district of the company’s registered seat (unless mandatory law states otherwise).",
      intro: [
        "These terms apply to quotes, agreements and services of Ever Kinetiq Belgium BV (“EverKinetiq”).",
        "By accepting a quote or entering an agreement, the customer accepts these terms.",
      ],
      sections: [
        { h: "1. Quotes and formation", p: ["Quotes are non-binding unless stated otherwise. An agreement is formed upon written acceptance (email is sufficient) or start of performance."] },
        { h: "2. Prices and payment", p: ["Prices are excl. VAT unless stated. Invoices are payable within the stated term. Late payment may incur statutory interest and costs."] },
        { h: "3. Performance and timing", p: ["Timelines are indicative unless explicitly binding. Delays due to force majeure or third parties do not entitle damages."] },
        { h: "4. Customer cooperation", p: ["Customer provides correct info, site access and permits. Extra costs due to missing/incorrect info are borne by the customer."] },
        { h: "5. Changes and additional work", p: ["Changes/additional work require approval and may affect price and timeline."] },
        { h: "6. Warranty and liability", p: ["Warranties follow applicable law and/or manufacturer warranties. Liability is limited to direct damages and capped at the invoice amount for the relevant work, except in case of intent or mandatory law."] },
        { h: "7. Force majeure", p: ["Includes strikes, supply issues, extreme weather, outages, government measures. Performance may be suspended/terminated without damages."] },
        { h: "8. Intellectual property", p: ["Plans, texts, photos and designs remain property of EverKinetiq/licensors unless agreed otherwise."] },
        { h: "9. Complaints", p: ["Complaints must be submitted in writing within a reasonable time after discovery. Payment obligations are not automatically suspended."] },
        { h: "10. Privacy", p: ["Personal data is processed according to our Privacy Policy."] },
      ],
    },

    fr: {
      title: "Conditions générales",
      updated: "Dernière mise à jour : 10/01/2026",
      law: "Droit applicable : droit belge. Tribunal compétent : arrondissement du siège social (sauf droit impératif).",
      intro: [
        "Ces conditions s’appliquent aux devis, contrats et services de Ever Kinetiq Belgium BV (“EverKinetiq”).",
        "En acceptant un devis ou en concluant un contrat, le client accepte ces conditions.",
      ],
      sections: [
        { h: "1. Devis", p: ["Les devis sont indicatifs sauf mention contraire. Le contrat naît après acceptation écrite (email suffit) ou début d’exécution."] },
        { h: "2. Prix et paiement", p: ["Prix hors TVA sauf mention. Paiement selon délai indiqué. Retard : intérêts et frais selon la loi."] },
        { h: "3. Exécution", p: ["Délais indicatifs sauf engagement ferme. Retards (force majeure/tiers) sans indemnisation."] },
        { h: "4. Collaboration du client", p: ["Infos correctes, accès chantier, autorisations. Surcoûts dus à manquements à charge du client."] },
        { h: "5. Modifications", p: ["Modifs/travaux supplémentaires après accord, impact possible sur prix et délais."] },
        { h: "6. Garantie / responsabilité", p: ["Garanties selon loi et/ou fabricant. Responsabilité limitée aux dommages directs, plafonnée au montant facturé, sauf dol/droit impératif."] },
        { h: "7. Force majeure", p: ["Grèves, retards de livraison, météo extrême, pannes, mesures publiques… Suspension/fin possible sans indemnité."] },
        { h: "8. Propriété intellectuelle", p: ["Plans, textes, photos, designs restent propriété d’EverKinetiq sauf accord contraire."] },
        { h: "9. Réclamations", p: ["Réclamations par écrit dans un délai raisonnable. Pas de suspension automatique du paiement."] },
        { h: "10. Vie privée", p: ["Données traitées selon notre Politique de confidentialité."] },
      ],
    },

    es: {
      title: "Términos y condiciones",
      updated: "Última actualización: 10/01/2026",
      law: "Ley aplicable: ley belga. Tribunales competentes: distrito del domicilio social (salvo norma imperativa).",
      intro: [
        "Estas condiciones se aplican a presupuestos, contratos y servicios de Ever Kinetiq Belgium BV (“EverKinetiq”).",
        "Al aceptar un presupuesto o contrato, el cliente acepta estas condiciones.",
      ],
      sections: [
        { h: "1. Presupuestos", p: ["Los presupuestos no son vinculantes salvo indicación. El contrato se forma con aceptación escrita (email) o inicio de ejecución."] },
        { h: "2. Precios y pago", p: ["Precios sin IVA salvo indicación. Pago según plazo. Retrasos: intereses/costes legales."] },
        { h: "3. Ejecución y plazos", p: ["Plazos orientativos salvo acuerdo vinculante. Retrasos por fuerza mayor/terceros sin indemnización."] },
        { h: "4. Colaboración del cliente", p: ["El cliente aporta info correcta, acceso y permisos. Costes extra por fallos recaen en el cliente."] },
        { h: "5. Cambios", p: ["Cambios/trabajos extra con aprobación; pueden afectar precio y plazos."] },
        { h: "6. Garantía / responsabilidad", p: ["Garantías según ley/fabricante. Responsabilidad limitada a daños directos y al importe facturado, salvo dolo/ley imperativa."] },
        { h: "7. Fuerza mayor", p: ["Huelgas, problemas de suministro, clima extremo, fallos, medidas públicas… suspensión/fin sin indemnización."] },
        { h: "8. Propiedad intelectual", p: ["Planes, textos, fotos y diseños son de EverKinetiq salvo acuerdo."] },
        { h: "9. Reclamaciones", p: ["Reclamaciones por escrito en plazo razonable. El pago no se suspende automáticamente."] },
        { h: "10. Privacidad", p: ["Datos tratados según nuestra Política de privacidad."] },
      ],
    },

    de: {
      title: "Allgemeine Geschäftsbedingungen",
      updated: "Zuletzt aktualisiert: 10.01.2026",
      law: "Anwendbares Recht: belgisches Recht. Gerichtsstand: Bezirk des Firmensitzes (sofern nicht zwingend anders).",
      intro: [
        "Diese Bedingungen gelten für Angebote, Verträge und Leistungen von Ever Kinetiq Belgium BV („EverKinetiq“).",
        "Mit Annahme eines Angebots akzeptiert der Kunde diese Bedingungen.",
      ],
      sections: [
        { h: "1. Angebote", p: ["Angebote sind unverbindlich, sofern nicht anders angegeben. Vertrag durch schriftliche Annahme (E-Mail genügt) oder Leistungsbeginn."] },
        { h: "2. Preise und Zahlung", p: ["Preise zzgl. MwSt. sofern nicht anders. Zahlung gemäß Frist. Verzug: gesetzliche Zinsen/Kosten."] },
        { h: "3. Ausführung und Termine", p: ["Termine sind Richtwerte, außer ausdrücklich verbindlich. Verzögerungen durch höhere Gewalt/Dritte ohne Schadensersatz."] },
        { h: "4. Mitwirkung", p: ["Kunde liefert korrekte Infos, Zugang und Genehmigungen. Mehrkosten durch fehlende/falsche Infos trägt der Kunde."] },
        { h: "5. Änderungen", p: ["Änderungen/Mehrleistungen nach Freigabe; Preis/Termine können sich ändern."] },
        { h: "6. Gewährleistung / Haftung", p: ["Gewährleistung nach Gesetz und/oder Hersteller. Haftung auf direkte Schäden begrenzt, max. Rechnungsbetrag, außer Vorsatz/zwingendes Recht."] },
        { h: "7. Höhere Gewalt", p: ["Streiks, Lieferprobleme, extreme Wetterlagen, Ausfälle, Behördenmaßnahmen… Aussetzung/Beendigung ohne Ersatz."] },
        { h: "8. Geistiges Eigentum", p: ["Pläne, Texte, Fotos, Designs bleiben Eigentum von EverKinetiq, sofern nicht anders vereinbart."] },
        { h: "9. Beschwerden", p: ["Beschwerden schriftlich innerhalb angemessener Frist. Zahlungspflicht wird nicht automatisch ausgesetzt."] },
        { h: "10. Datenschutz", p: ["Verarbeitung gemäß Datenschutzerklärung."] },
      ],
    },
  };

  return c[locale];
}

export default function TermsPage({ params }: { params: { locale: string } }) {
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
          {t.law}
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