"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer({ locale }: { locale: string }) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  return (
    <footer className="border-t border-white/10 bg-[#050B2A]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href={base} className="inline-flex items-center gap-3 rounded-xl p-1 hover:bg-white/5">
              <Image src="/logo-everkinetiq.png" alt="EverKinetiq logo" width={160} height={160} className="h-14 w-auto object-contain" />
              <span className="text-xl font-semibold text-white">
                Ever<span className="text-[#F4C44E]">Kinetiq</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm text-white/70">
              Uw Belgische partner voor premium duurzame energie oplossingen en luxe turnkey renovatieprojecten.
            </p>

            <div className="mt-6 flex gap-3">
              <Social href="#" icon={<Linkedin />} />
              <Social href="#" icon={<Instagram />} />
              <Social href="#" icon={<Facebook />} />
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-semibold text-white">Navigatie</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><Link href={base}>Home</Link></li>
              <li><Link href={`${base}#diensten`}>Diensten</Link></li>
              <li><Link href={`${base}#over-ons`}>Over ons</Link></li>
              <li><Link href={`${base}#projecten`}>Projecten</Link></li>
              <li><Link href={`${base}#contact`}>Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-sm font-semibold text-white">Juridisch</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><Link href={`${base}/privacy`}>Privacybeleid</Link></li>
              <li><Link href={`${base}/voorwaarden`}>Algemene voorwaarden</Link></li>
              <li><Link href={`${base}/cookies`}>Cookie beleid</Link></li>
              <li><Link href={`${base}/gdpr`}>GDPR</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-2 md:flex-row md:justify-between text-sm text-white/60">
          <span>© {year} Ever Kinetiq Belgium</span>
          <span>BTW: BE XXXX.XXX.XXX</span>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white">
      {icon}
    </Link>
  );
}