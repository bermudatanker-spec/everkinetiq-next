// src/app/[locale]/layout.tsx
import "@/styles/globals.css";

import type { Metadata } from "next";
import Providers from "../providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

import { getDict, isLocale, type Locale } from "@/lib/i18n";

const SITE_NAME = "EverKinetiq";
const SITE_DESCRIPTION =
  "Premium duurzame energie & totale renovaties voor woning en bedrijf. Zonnepanelen, kasprojecten, warmtepompen, carports en meer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ek-b.be"),
  title: {
    default: `${SITE_NAME} — Premium duurzame energie & renovaties`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "zonnepanelen",
    "warmtepomp",
    "renovatie",
    "kasprojecten",
    "carport solar",
    "duurzame energie",
    "EverKinetiq",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Premium duurzame energie & renovaties`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Premium duurzame energie & renovaties`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ever Kinetiq Belgium BV",
  image: "/logo-everkinetiq.png",
  telephone: "+31629317622",
  email: "info@ek-b.be",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bieshof 11",
    postalCode: "2321",
    addressLocality: "Meer (Hoogstraten)",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.4167,
    longitude: 4.7667,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ✅ Next 15: params is Promise
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <Providers>
          <Navigation
            locale={locale}
            labels={{
              services: t.nav.services,
              about: t.nav.about,
              projects: t.nav.projects,
              news: t.nav.news,
              gallery: locale === "nl" ? "Galerij" : locale === "fr" ? "Galerie" : locale === "de" ? "Galerie" : locale === "es" ? "Galería" : "Gallery",
              contact: t.nav.contact,
              cta: t.nav.cta,
            }}
          />

          <main>{children}</main>

          <Footer
            locale={locale}
            labels={{
              brandLine: t.footer.brandLine,
              navTitle: t.footer.navTitle,
              legalTitle: t.footer.legalTitle,

              home: t.footer.home,
              services: t.nav.services,
              about: t.nav.about,
              projects: t.nav.projects,
              news: t.nav.news,
              contact: t.nav.contact,

              privacy: t.footer.privacy,
              terms: t.footer.terms,
              cookies: t.footer.cookies,
              gdpr: t.footer.gdpr,

              vat: t.footer.vatLabel,
              vatValue: t.footer.vatValue,
            }}
          />

          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}