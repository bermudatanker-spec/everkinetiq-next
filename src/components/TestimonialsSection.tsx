import { Star } from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  project: string;
};

type Props = {
  kicker: string;
  title: string;
  subtitle: string;
  items: Testimonial[];
};

export default function TestimonialsSection({ kicker, title, subtitle, items }: Props) {
  return (
    <section id="reviews" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div data-reveal className="reveal mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide text-white/80">
            {kicker}
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              data-reveal
              className="reveal gradient-card rounded-2xl border border-white/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
              style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
            >
              <div className="flex gap-1 text-[#F4C44E]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="mt-1 text-xs text-white/60">{item.location} &middot; {item.project}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
