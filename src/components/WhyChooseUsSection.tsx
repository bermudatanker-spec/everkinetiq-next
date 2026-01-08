"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Premium Kwaliteit",
    description:
      "Wij werken uitsluitend met hoogwaardige materialen en gerenommeerde leveranciers.",
  },
  {
    title: "Duurzaamheid Voorop",
    description:
      "Elke oplossing is ontworpen met respect voor het milieu en toekomstige generaties.",
  },
  {
    title: "Volledig Turnkey",
    description:
      "Van ontwerp tot oplevering — inclusief grondboringen, bestrating en riolering.",
  },
  {
    title: "Vakkundig Team",
    description:
      "Meer dan 15 jaar ervaring met gespecialiseerde experts in elk vakgebied.",
  },
  {
    title: "Persoonlijk Advies",
    description:
      "Uw wensen staan centraal, met op maat gemaakte oplossingen voor elk project.",
  },
  {
    title: "Garantie & Service",
    description:
      "Uitgebreide garantie op al onze installaties met 24/7 service ondersteuning.",
  },
] as const;

export default function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Waarom Wij?
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              De <span className="text-gradient-gold">Ever Kinetiq</span> Garantie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wij onderscheiden ons door een ongeëvenaarde combinatie van kwaliteit,
              expertise en service.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`group flex gap-4 p-6 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-muted/30 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div
            className={`mt-16 flex flex-wrap justify-center gap-8 items-center transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              "ISO 9001 Gecertificeerd",
              "VCA Veiligheid",
              "Erkend Installateur",
              "EPC Label A+",
            ].map((badge) => (
              <div
                key={badge}
                className="px-6 py-3 rounded-full border border-border/50 bg-muted/20 text-muted-foreground text-sm font-medium"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}