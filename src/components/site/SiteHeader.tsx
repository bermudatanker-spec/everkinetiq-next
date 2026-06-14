// src/components/site/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const NAV = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/projecten", label: "Projecten" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    const exact = NAV.find((n) => n.href === pathname)?.href;
    if (exact) return exact;
    // simpele fallback voor nested routes
    return NAV.find((n) => n.href !== "/" && pathname?.startsWith(n.href))?.href ?? "/";
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4">
            {/* LEFT: logo */}
            <Link href="/" className="flex items-center gap-3">
              {/* vervang src naar jouw logo */}
              <img
                src="/logo-everkinetiq.png"
                alt="EverKinetiq"
                className="h-9 w-9 object-contain"
                draggable={false}
              />
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-white">Ever</span>
                <span className="text-[hsl(var(--accent))]">Kinetiq</span>
              </span>
            </Link>

            {/* CENTER: desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((item) => {
                const active = item.href === activeHref;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "text-sm text-white/80 hover:text-white transition",
                      active && "text-white relative"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[hsl(var(--accent))]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: CTA + mobile */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact#offerte"
                className="hidden md:inline-flex h-10 items-center rounded-xl bg-[hsl(var(--accent))] px-4 text-sm font-semibold text-black hover:opacity-90 transition"
              >
                Offerte aanvragen
              </Link>

              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                {/* simpel hamburger */}
                <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="md:hidden border-t border-white/10 px-4 py-3">
              <div className="flex flex-col gap-2">
                {NAV.map((item) => {
                  const active = item.href === activeHref;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cx(
                        "rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5",
                        active && "bg-white/5 text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact#offerte"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-[hsl(var(--accent))] px-4 text-sm font-semibold text-black"
                >
                  Offerte aanvragen
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}