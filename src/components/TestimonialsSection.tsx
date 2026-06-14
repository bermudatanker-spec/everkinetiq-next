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
  light?: boolean;
};

export default function TestimonialsSection({ kicker, title, subtitle, items, light = true }: Props) {
  return (
    <section
      id="reviews"
      className={`scroll-mt-28 py-32 ${light ? "bg-[#F5F5F7]" : "bg-[#080818]"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="reveal mx-auto max-w-3xl text-center mb-14">
          <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${light ? "text-[#6D28D9]" : "text-[#a78bfa]"}`}>
            {kicker}
          </p>
          <h2 className={`font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] ${light ? "text-gray-900" : "text-white"}`}>
            {title}
          </h2>
          <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-gray-500" : "text-white/60"}`}>
            {subtitle}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              data-reveal
              className={`reveal rounded-2xl p-7 ${
                light
                  ? "bg-white border border-gray-100 shadow-sm"
                  : "border border-white/10 bg-[#111126]"
              }`}
              style={{ ["--reveal-delay" as any]: `${i * 90}ms` }}
            >
              <div className="flex gap-1 text-[#7C3AED]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${light ? "text-gray-600" : "text-white/75"}`}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className={`mt-6 border-t pt-4 ${light ? "border-gray-100" : "border-white/10"}`}>
                <div className={`text-sm font-semibold ${light ? "text-gray-900" : "text-white"}`}>{item.name}</div>
                <div className={`mt-1 text-xs ${light ? "text-gray-400" : "text-white/50"}`}>
                  {item.location} &middot; {item.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
