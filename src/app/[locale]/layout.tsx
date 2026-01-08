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
  // ✅ verplicht in Next 15
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
              contact: t.nav.contact,
              cta: t.nav.cta,
            }}
          />
          <main>{children}</main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}