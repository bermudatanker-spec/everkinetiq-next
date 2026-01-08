"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Particle = { left: string; top: string; delay: string };

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
  subtitleLine1: "Premium duurzame energie & totale renovaties",
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

  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
      })),
    );
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-1/4 h-96 w-[200%] blur-3xl animate-wave bg-gradient-to-r from-[hsl(var(--primary)/0.20)] via-[hsl(var(--primary)/0.40)] to-[hsl(var(--primary)/0.20)]" />
          <div
            className="absolute left-0 top-1/2 h-96 w-[200%] blur-3xl animate-wave bg-gradient-to-r from-[hsl(var(--secondary)/0.10)] via-[hsl(var(--secondary)/0.30)] to-[hsl(var(--secondary)/0.10)]"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="absolute bottom-1/4 left-0 h-96 w-[200%] blur-3xl animate-wave bg-gradient-to-r from-[hsl(var(--primary)/0.10)] via-[hsl(var(--primary)/0.20)] to-[hsl(var(--primary)/0.10)]"
            style={{ animationDelay: "-10s" }}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20 animate-pulse-slow"
              style={{ left: p.left, top: p.top, animationDelay: p.delay }}
            />
          ))}
        </div>
      </div>

      {/* Hero image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/projects/hero-carport.jpg)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* ✅ Floating logo: ABSOLUTE + HOGER + boven alles */}
      <div className="pointer-events-none absolute left-1/2 top-[90px] z-30 -translate-x-1/2 md:top-[10px]">
        <Image
          src="/logo-everkinetiq.png"
          alt="EverKinetiq Logo"
          width={520}
          height={520}
          priority
          className="h-28 w-auto md:h-36 lg:h-40 drop-shadow-[0_0_22px_rgba(244,196,78,0.45)] animate-float"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 text-center">
        {/* 👇 ruimte voor je fixed header + ruimte voor het absolute logo */}
        <div className="mx-auto max-w-4xl pt-44 md:pt-52 lg:pt-56 pb-10 space-y-7">
          {/* Kicker pill */}
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="mx-auto inline-flex max-w-[92vw] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              <span className="whitespace-nowrap">{labels.kicker}</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <span>{labels.titleLeft}</span>
            <span className="text-gradient-gold">{labels.titleRight}</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-lg font-light text-white/80 md:text-2xl lg:text-3xl animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            {labels.subtitleLine1}
            <br />
            <span className="text-white/70">{labels.subtitleLine2}</span>
          </p>

          {/* CTA */}
          <div
            className="flex flex-col justify-center gap-3 pt-2 sm:flex-row animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              size="xl"
              onClick={() => scrollToSection("#contact")}
              className="rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.92)]"
            >
              {labels.ctaPrimary} <span className="ml-2">→</span>
            </Button>

            <Button
              size="xl"
              variant="outline"
              onClick={() => scrollToSection("#diensten")}
              className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10"
            >
              {labels.ctaSecondary}
            </Button>
          </div>

          {/* Spacer zodat jouw stats-bar (in page) mooi aansluit */}
          <div className="pt-10 md:pt-12" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("#diensten")}
          className="text-white/60 hover:text-[hsl(var(--accent))] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}