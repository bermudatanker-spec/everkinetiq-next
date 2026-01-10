import Image from "next/image";
import Link from "next/link";
import PremiumBackground from "@/components/PremiumBackground";
import { getProjects } from "@/lib/projects";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600;

export default async function ProjectenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "nl";
  const t = getDict(locale);

  const projects = await getProjects(locale);

  const title =
    locale === "nl" ? "Projecten" :
    locale === "fr" ? "Projets" :
    locale === "es" ? "Proyectos" :
    locale === "de" ? "Projekte" :
    "Projects";

  const subtitle =
    locale === "nl"
      ? "Een selectie van onze realisaties — premium uitvoering tot in detail."
      : locale === "fr"
        ? "Une sélection de nos réalisations — exécution premium."
        : locale === "es"
          ? "Una selección de nuestros proyectos — ejecución premium."
          : locale === "de"
            ? "Eine Auswahl unserer Projekte — Premium-Ausführung."
            : "A selection of our projects — premium execution.";

  return (
    <PremiumBackground>
      <main className="pt-28">
        <section className="mx-auto max-w-6xl px-4 pb-16">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {t.nav.projects}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {title}
            </h1>

            <p className="mt-3 text-white/70 md:text-lg">
              {subtitle}
            </p>
          </div>

          {/* Projects grid */}
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p._id}
                href={`/${locale}/projecten/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:bg-white/10"
              >
                <div className="relative aspect-[16/10]">
                  {p.cover && (
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,11,42,0.75),transparent_55%)]" />
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-white">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/70">
                    {p.summary ||
                      (locale === "nl"
                        ? "Premium uitvoering met oog voor detail."
                        : "Premium execution with attention to detail.")}
                  </p>

                  <div className="mt-4 text-sm font-semibold text-[#F4C44E]">
                    {locale === "nl" ? "Bekijk →" : "View →"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">
              {locale === "nl"
                ? "Wil je jouw project ook premium aanpakken?"
                : "Want to build your project to a premium standard?"}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              {locale === "nl"
                ? "Neem contact met ons op voor een voorstel op maat."
                : "Get in touch for a tailored proposal."}
            </p>

            <div className="mt-5 flex justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
              >
                {t.nav.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}