"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export type HeroDict = {
  kicker: string;
  titleLeft: string;
  titleRight: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type Props = { t?: HeroDict };

const FALLBACK: HeroDict = {
  kicker: "Premium duurzame energie & totale renovaties",
  titleLeft: "Ever",
  titleRight: "Kinetiq",
  subtitleLine1: "Premium duurzame energie",
  subtitleLine2: "voor woning en bedrijf",
  ctaPrimary: "Offerte aanvragen",
  ctaSecondary: "Ontdek onze diensten",
};

export default function HeroSection({ t }: Props) {
  const labels = t ?? FALLBACK;

  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#050510]"
    >
      {/* Subtle dark gradient overlay across full section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(109,40,217,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[100svh] py-32 lg:py-0">

          {/* LEFT — text column */}
          <div className="flex flex-col gap-8 lg:pr-8">

            {/* Kicker badge */}
            <div className="hero-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/8 px-4 py-1.5 text-xs font-medium tracking-widest text-[#7C3AED] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                {labels.kicker}
              </span>
            </div>

            {/* Main headline */}
            <div className="hero-fade-up" style={{ animationDelay: "0.22s" }}>
              <h1 className="font-heading text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white">
                {labels.titleLeft}
                <span className="text-gradient-gold">{labels.titleRight}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/60 md:text-xl max-w-md">
                {labels.subtitleLine1}
                <br />
                {labels.subtitleLine2}
              </p>
            </div>

            {/* CTAs */}
            <div
              className="hero-fade-up flex flex-col sm:flex-row gap-3 pt-2"
              style={{ animationDelay: "0.36s" }}
            >
              <button
                onClick={() => scrollToSection("#contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#6D28D9] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(109,40,217,0.4)]"
              >
                {labels.ctaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollToSection("#diensten")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                {labels.ctaSecondary}
              </button>
            </div>

            {/* Divider + trust line */}
            <div
              className="hero-fade-up pt-2"
              style={{ animationDelay: "0.48s" }}
            >
              <div className="flex items-center gap-6 pt-4 border-t border-white/8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-xs text-white/40 mt-0.5">Projecten</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5 MW+</div>
                  <div className="text-xs text-white/40 mt-0.5">Gerealiseerd vermogen</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-white/40 mt-0.5">Turnkey</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — photo column */}
          <div
            className="hero-fade-up relative"
            style={{ animationDelay: "0.18s" }}
          >
            {/* Main hero image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <Image
                src="/projects/everkinetiq-luxe-carport-solar-roof-01.jpg"
                alt="EverKinetiq premium solar carport project"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/50 via-transparent to-transparent" />

              {/* Floating project badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl border border-white/10 bg-[#050510]/70 backdrop-blur-md p-4">
                  <div className="text-xs text-[#7C3AED] font-medium tracking-wide uppercase mb-1">Uitgelicht project</div>
                  <div className="text-sm font-semibold text-white">Luxe Solar Carport — Hoogstraten</div>
                  <div className="text-xs text-white/50 mt-1">Geïntegreerde SolarRoof constructie</div>
                </div>
              </div>
            </div>

            {/* Small accent photo — top right overlap */}
            <div className="absolute -top-6 -right-6 hidden lg:block w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#050510] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src="/projects/everkinetiq-zonnepanelen-bedrijf-05.jpg"
                alt="EverKinetiq commercieel zonnepanelen project"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 lg:left-12 lg:translate-x-0">
        <div className="text-[10px] tracking-widest text-white uppercase">Scroll</div>
        <div className="h-10 w-px bg-white/30" />
      </div>
    </section>
  );
}
