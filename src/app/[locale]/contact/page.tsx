// src/app/[locale]/contact/page.tsx
import PremiumBackground from "@/components/PremiumBackground";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export const metadata = {
  title: "Contact | EverKinetiq",
  description:
    "Neem contact op met EverKinetiq of vraag een vrijblijvende offerte aan.",
};

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "nl";
  const t = getDict(locale);

  // Mini fallback als je dict nog geen "contactPage" keys heeft:
  const L = {
    badge: t.sections?.contactKicker ?? (locale === "nl" ? "Contact" : "Contact"),
    title:
      locale === "nl"
        ? `Vraag uw gratis offerte aan`
        : locale === "fr"
          ? "Demandez votre devis gratuit"
          : locale === "de"
            ? "Kostenloses Angebot anfordern"
            : locale === "es"
              ? "Solicita tu presupuesto gratis"
              : "Request your free quote",
    subtitle:
      locale === "nl"
        ? "Vertel ons kort wat je nodig hebt. We contacteren je snel voor een vrijblijvend gesprek."
        : locale === "fr"
          ? "Dites-nous brièvement ce dont vous avez besoin. Nous vous recontactons rapidement pour un échange sans engagement."
          : locale === "de"
            ? "Beschreiben Sie kurz, was Sie benötigen. Wir melden uns schnell für ein unverbindliches Gespräch."
            : locale === "es"
              ? "Cuéntanos brevemente lo que necesitas. Te contactaremos pronto para una conversación sin compromiso."
              : "Tell us briefly what you need. We'll get back to you quickly for a no-obligation call.",
    name: locale === "nl" ? "Naam *" : locale === "fr" ? "Nom *" : locale === "de" ? "Name *" : locale === "es" ? "Nombre *" : "Name *",
    namePh:
      locale === "nl"
        ? "Uw naam"
        : locale === "fr"
          ? "Votre nom"
          : locale === "de"
            ? "Ihr Name"
            : locale === "es"
              ? "Tu nombre"
              : "Your name",
    email: locale === "nl" ? "E-mail *" : locale === "fr" ? "E-mail *" : locale === "de" ? "E-Mail *" : locale === "es" ? "Correo *" : "Email *",
    emailPh:
      locale === "nl"
        ? "uw@email.be"
        : locale === "fr"
          ? "vous@email.be"
          : locale === "de"
            ? "ihre@email.de"
            : locale === "es"
              ? "tu@email.es"
              : "you@email.com",
    phone: locale === "nl" ? "Telefoon" : locale === "fr" ? "Téléphone" : locale === "de" ? "Telefon" : locale === "es" ? "Teléfono" : "Phone",
    phonePh: locale === "nl" ? "+32 ..." : "+32 ...",
    msg: locale === "nl" ? "Uw bericht *" : locale === "fr" ? "Votre message *" : locale === "de" ? "Ihre Nachricht *" : locale === "es" ? "Tu mensaje *" : "Your message *",
    msgPh:
      locale === "nl"
        ? "Vertel ons over uw project..."
        : locale === "fr"
          ? "Parlez-nous de votre projet..."
          : locale === "de"
            ? "Erzählen Sie uns von Ihrem Projekt..."
            : locale === "es"
              ? "Cuéntanos sobre tu proyecto..."
              : "Tell us about your project...",
    submit:
      locale === "nl"
        ? "Verstuur bericht →"
        : locale === "fr"
          ? "Envoyer →"
          : locale === "de"
            ? "Senden →"
            : locale === "es"
              ? "Enviar →"
              : "Send →",
    consent:
      locale === "nl"
        ? "Door te verzenden ga je akkoord dat we je contacteren over je aanvraag."
        : locale === "fr"
          ? "En envoyant, vous acceptez que nous vous contactions au sujet de votre demande."
          : locale === "de"
            ? "Mit dem Absenden stimmen Sie zu, dass wir Sie bezüglich Ihrer Anfrage kontaktieren."
            : locale === "es"
              ? "Al enviar, aceptas que te contactemos sobre tu solicitud."
              : "By sending, you agree that we contact you about your request.",
    details:
      locale === "nl"
        ? "Gegevens"
        : locale === "fr"
          ? "Coordonnées"
          : locale === "de"
            ? "Daten"
            : locale === "es"
              ? "Datos"
              : "Details",
    addressLabel:
      locale === "nl"
        ? "Adres:"
        : locale === "fr"
          ? "Adresse :"
          : locale === "de"
            ? "Adresse:"
            : locale === "es"
              ? "Dirección:"
              : "Address:",
    phoneLabel:
      locale === "nl"
        ? "Telefoon:"
        : locale === "fr"
          ? "Téléphone :"
          : locale === "de"
            ? "Telefon:"
            : locale === "es"
              ? "Teléfono:"
              : "Phone:",
    emailLabel:
      locale === "nl"
        ? "E-mail:"
        : locale === "fr"
          ? "E-mail :"
          : locale === "de"
            ? "E-Mail:"
            : locale === "es"
              ? "Correo:"
              : "Email:",
  };

  return (
    <PremiumBackground>
      <main className="pt-28">
        {/* HEADER */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              {L.badge}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {locale === "nl" ? (
                <>
                  Vraag uw <span className="text-[#F4C44E]">gratis offerte</span>{" "}
                  aan
                </>
              ) : (
                <span className="text-[#F4C44E]">{L.title}</span>
              )}
            </h1>

            <p className="mt-4 text-white/70 md:text-lg">{L.subtitle}</p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* FORM */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">{L.name}</label>
                  <input
                    required
                    name="name"
                    placeholder={L.namePh}
                    className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F4C44E]/60"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">{L.email}</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder={L.emailPh}
                      className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F4C44E]/60"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">{L.phone}</label>
                    <input
                      name="phone"
                      placeholder={L.phonePh}
                      className="h-12 rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F4C44E]/60"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-white/80">{L.msg}</label>
                  <textarea
                    required
                    name="message"
                    placeholder={L.msgPh}
                    rows={6}
                    className="rounded-xl border border-white/10 bg-[#050B2A]/35 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F4C44E]/60"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#F4C44E] px-6 text-sm font-semibold text-[#0B1033] transition hover:opacity-90"
                >
                  {L.submit}
                </button>

                <p className="text-xs text-white/60">{L.consent}</p>
              </form>
            </div>

            {/* DETAILS + MAP */}
            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-base font-semibold">{L.details}</h2>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  <p>
                    <span className="text-white/90">{L.addressLabel}</span>{" "}
                    Ever Kinetiq BV, Industriezone Noord, 1000 Brussel, België
                  </p>
                  <p>
                    <span className="text-white/90">{L.phoneLabel}</span> +32 2
                    123 45 67
                  </p>
                  <p>
                    <span className="text-white/90">{L.emailLabel}</span>{" "}
                    info@everkinetiq.be
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <iframe
                  title="Google Maps"
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Brussels&output=embed"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </PremiumBackground>
  );
}