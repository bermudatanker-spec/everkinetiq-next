import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";

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
    <main className="bg-white pt-28">
      {/* Header */}
      <section className="bg-[#F5F5F7] px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-1 text-xs font-medium text-[#7C3AED]">
            {t.nav.projects}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            {title}
          </h1>

          <p className="mt-3 text-gray-500 md:text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Projects grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/${locale}/projecten/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
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

                {p.category && GALLERY_CATEGORIES[p.category as GalleryCategory] && (
                  <span
                    className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur"
                    style={{
                      borderColor: `${GALLERY_CATEGORIES[p.category as GalleryCategory].color}40`,
                      backgroundColor: `${GALLERY_CATEGORIES[p.category as GalleryCategory].color}26`,
                      color: GALLERY_CATEGORIES[p.category as GalleryCategory].color,
                    }}
                  >
                    {locale === "nl"
                      ? GALLERY_CATEGORIES[p.category as GalleryCategory].label
                      : GALLERY_CATEGORIES[p.category as GalleryCategory].labelEn}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {p.title}
                </h3>

                {p.location && (
                  <div className="mt-1 text-xs text-gray-400">📍 {p.location}</div>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  {p.summary ||
                    (locale === "nl"
                      ? "Premium uitvoering met oog voor detail."
                      : "Premium execution with attention to detail.")}
                </p>

                <div className="mt-4 text-sm font-semibold text-[#7C3AED]">
                  {locale === "nl" ? "Bekijk →" : "View →"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-[#080818] p-6 text-center">
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
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#7C3AED] px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}