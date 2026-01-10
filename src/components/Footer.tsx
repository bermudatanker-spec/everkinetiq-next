// src/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type FooterLabels = {
  brandLine: string;

  navTitle: string;
  legalTitle: string;

  home: string;
  services: string;
  about: string;
  projects: string;
  contact: string;

  privacy: string;
  terms: string;
  cookies: string;
  gdpr: string;

  vat: string;
  vatValue: string;
};

export default function Footer({
  locale,
  labels,
}: {
  locale: Locale;
  labels: FooterLabels;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050B2A]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-3 rounded-xl p-1 hover:bg-white/5"
              aria-label="Go home"
            >
              <Image
                src="/logo-everkinetiq.png"
                alt="EverKinetiq logo"
                width={160}
                height={160}
                className="h-14 w-auto object-contain"
              />
              <span className="text-xl font-semibold text-white">
                Ever<span className="text-[#F4C44E]">Kinetiq</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm text-white/70">
              {labels.brandLine}
            </p>

            <div className="mt-6 flex gap-3">
              <Social href="#" icon={<Linkedin className="h-5 w-5" />} />
              <Social href="#" icon={<Instagram className="h-5 w-5" />} />
              <Social href="#" icon={<Facebook className="h-5 w-5" />} />
            </div>
          </div>

          {/* Navigatie */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-semibold text-white">
              {labels.navTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href={`/${locale}`}>{labels.home}</Link>
              </li>
              <li>
                <Link href={`/${locale}#diensten`}>{labels.services}</Link>
              </li>
              <li>
                <Link href={`/${locale}#over-ons`}>{labels.about}</Link>
              </li>
              <li>
                <Link href={`/${locale}#projecten`}>{labels.projects}</Link>
              </li>
              <li>
                <Link href={`/${locale}#contact`}>{labels.contact}</Link>
              </li>
            </ul>
          </div>

          {/* Juridisch */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-sm font-semibold text-white">
              {labels.legalTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href={`/${locale}/privacy`}>{labels.privacy}</Link>
              </li>
              <li>
                <Link href={`/${locale}/voorwaarden`}>{labels.terms}</Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`}>{labels.cookies}</Link>
              </li>
              <li>
                <Link href={`/${locale}/gdpr`}>{labels.gdpr}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:justify-between">
          <span>© {year} Ever Kinetiq Belgium</span>
          <span>
            {labels.vat} {labels.vatValue}
          </span>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
      aria-label="Social link"
    >
      {icon}
    </Link>
  );
}