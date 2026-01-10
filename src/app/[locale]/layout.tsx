// src/app/[locale]/layout.tsx
import "@/styles/globals.css";

import Providers from "../providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const metadata = {
  title: "EverKinetiq",
  description: "Premium duurzame energie & renovaties",
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
        <Providers>
          <Navigation
            locale={locale}
            labels={{
              services: t.nav.services,
              about: t.nav.about,
              projects: t.nav.projects,
              news: t.nav.news,
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
              contact: t.nav.contact,

              privacy: t.footer.privacy,
              terms: t.footer.terms,
              cookies: t.footer.cookies,
              gdpr: t.footer.gdpr,

              vat: t.footer.vatLabel,
              vatValue: t.footer.vatValue,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}