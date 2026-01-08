"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Sun,
  Home,
  Car,
  Dumbbell,
  Thermometer,
  Wrench,
  Lightbulb,
  Leaf,
} from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Zonnepaneelprojecten",
    description:
      "Complete zonneënergie installaties voor woningen en bedrijven met premium panelen.",
  },
  {
    icon: Home,
    title: "Sandwichpanelen",
    description:
      "Hoogwaardige isolerende sandwichpanelen voor duurzame gebouwconstructies.",
  },
  {
    icon: Car,
    title: "Luxe Carports met Solar Roof",
    description:
      "Elegante carports met geïntegreerde zonnepanelen voor stijlvolle energieopwekking.",
  },
  {
    icon: Dumbbell,
    title: "Padelbaan Overkappingen",
    description:
      "Moderne padelcourt overkappingen met zonnepanelen voor sportfaciliteiten.",
  },
  {
    icon: Home,
    title: "Premium Renovaties",
    description:
      "Volledige woning- en bedrijfsrenovaties met focus op luxe en duurzaamheid.",
  },
  {
    icon: Thermometer,
    title: "Warmtepompen",
    description:
      "Efficiënte warmtepompsystemen inclusief grondboringen voor optimale prestaties.",
  },
  {
    icon: Wrench,
    title: "Bestrating & Riolering",
    description: "Complete bestratings- en rioleringswerken voor uw buitenruimte.",
  },
  {
    icon: Lightbulb,
    title: "Assimilatielampen",
    description:
      "Professionele grow lights met volledige elektrische bekabeling en installatie.",
  },
  {
    icon: Leaf,
    title: "Kasprojecten",
    description:
      "Turnkey greenhouse projecten voor professionele tuinbouw en kwekerijen.",
  },
] as const;

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="diensten"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Onze Diensten
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Complete{" "}
              <span className="text-gradient-gold">Turnkey Oplossingen</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Van zonnepanelen tot volledige renovaties — wij bieden hoogwaardige,
              duurzame oplossingen voor elk project.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`group relative p-8 rounded-2xl gradient-card border border-border/30 
                    hover:border-accent/40 transition-all duration-500 
                    hover:shadow-xl hover:shadow-accent/10 hover:scale-[1.02] 
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  style={{ transitionDelay: `${index * 50 + 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-muted-foreground mb-6">
              Op zoek naar een specifieke oplossing? Wij denken graag met u mee.
            </p>
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-heading font-semibold transition-colors"
            >
              Neem contact op
              <span className="transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}