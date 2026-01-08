"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    image: "/projects/hero-carport.jpg",
    title: "Luxe Solar Carport",
    category: "Carports",
    description: "Premium carport met geïntegreerde zonnepanelen voor een moderne villa.",
  },
  {
    image: "/projects/project-renovation.jpg",
    title: "Totale Woningrenovatie",
    category: "Renovaties",
    description: "Complete renovatie met zonnepanelen en moderne afwerking.",
  },
  {
    image: "/projects/project-padel.jpg",
    title: "Padelbaan Overkapping",
    category: "Sport Faciliteiten",
    description: "Moderne padelcourt met solar overkapping en LED verlichting.",
  },
  {
    image: "/projects/project-greenhouse.jpg",
    title: "Professionele Kas",
    category: "Kasprojecten",
    description: "Turnkey kas met assimilatielampen en klimaatbeheersing.",
  },
  {
    image: "/projects/project-heatpump.jpg",
    title: "Warmtepomp Installatie",
    category: "Warmtepompen",
    description: "Efficiënte warmtepomp met grondboringen voor optimaal rendement.",
  },
] as const;

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const active = projects[currentIndex];

  return (
    <section id="projecten" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-section" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Onze Projecten
            </span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl">
              Recente <span className="text-gradient-gold">Realisaties</span>
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={active.image}
                alt={active.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              <div className="absolute bottom-0 p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-accent/20 text-accent mb-3">
                  {active.category}
                </span>
                <h3 className="text-2xl font-heading font-bold">{active.title}</h3>
                <p className="text-muted-foreground max-w-lg">{active.description}</p>
              </div>

              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length)}
                  className="pointer-events-auto bg-background/80 backdrop-blur"
                >
                  <ChevronLeft />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentIndex((i) => (i + 1) % projects.length)}
                  className="pointer-events-auto bg-background/80 backdrop-blur"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-3 rounded-full transition-all ${
                    i === currentIndex ? "w-8 bg-accent" : "w-3 bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}