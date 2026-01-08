"use client";
import { useEffect, useRef, useState } from 'react';
import { Award, Leaf, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Duurzaamheid',
    description: 'Voorop in groene technologie',
  },
  {
    icon: Award,
    title: 'Premium Kwaliteit',
    description: 'Alleen de beste materialen',
  },
  {
    icon: Users,
    title: 'Turnkey Service',
    description: 'Van ontwerp tot oplevering',
  },
  {
    icon: Zap,
    title: 'Innovatie',
    description: 'Nieuwste energieoplossingen',
  },
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="over-ons"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-section" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Over Ons
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Uw Partner voor{' '}
              <span className="text-gradient-gold">Premium Duurzaamheid</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ever Kinetiq is uw Belgische partner voor hoogwaardige turnkey duurzame projecten. 
              Met expertise in luxe energieoplossingen en complete renovaties, transformeren wij 
              uw visie naar realiteit met ongeëvenaarde kwaliteit en service.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-6 lg:p-8 rounded-2xl gradient-card border border-border/30 hover:border-accent/30 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Content */}
          <div className={`mt-16 grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                Waarom Kiezen voor Ever Kinetiq?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Met meer dan 15 jaar ervaring in de sector, combineren wij vakmanschap met 
                de nieuwste technologieën. Ons team van experts begeleidt u van concept tot 
                oplevering, met aandacht voor elk detail.
              </p>
              <ul className="space-y-3">
                {[
                  'Volledig geïntegreerde projectaanpak',
                  'Hoogwaardige materialen en afwerking',
                  'Persoonlijke begeleiding en advies',
                  'Garantie op al onze projecten',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl gradient-card border border-border/30 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading font-bold text-6xl lg:text-7xl text-accent mb-4">
                    15+
                  </div>
                  <div className="font-heading text-xl text-foreground">
                    Jaar Expertise
                  </div>
                  <div className="text-muted-foreground mt-2">
                    in duurzame energie & renovaties
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
