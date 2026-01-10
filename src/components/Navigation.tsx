// src/components/Navigation.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { locales as ALL_LOCALES } from "@/lib/i18n";

type Hash = "#diensten" | "#over-ons" | "#projecten" | "#contact";

type Labels = {
  services: string;
  about: string;
  projects: string;
  contact: string;
  news: string; // ✅ NIEUWS in header
  cta: string;
};

type Props = {
  locale: Locale;
  labels: Labels;
};

type NavItem = {
  key: keyof Pick<Labels, "services" | "about" | "projects" | "contact">;
  hash: Hash;
  route: "/diensten" | "/over-ons" | "/projecten" | "/contact";
};

const NAV: NavItem[] = [
  { key: "services", hash: "#diensten", route: "/diensten" },
  { key: "about", hash: "#over-ons", route: "/over-ons" },
  { key: "projects", hash: "#projecten", route: "/projecten" },
  { key: "contact", hash: "#contact", route: "/contact" },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function stripLocaleFromPath(pathname: string) {
  // "/nl/diensten" -> "/diensten"
  // "/nl" -> "/"
  const parts = (pathname || "/").split("/");
  const first = parts[1];
  if ((ALL_LOCALES as readonly string[]).includes(first)) {
    const rest = "/" + parts.slice(2).join("/");
    const clean = rest === "/" ? "/" : rest.replace(/\/$/, "");
    return clean;
  }
  return pathname || "/";
}

export default function Navigation({ locale, labels }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  const restPath = stripLocaleFromPath(pathname);
  const isHome = restPath === "/" || restPath === "";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null);

  const HEADER_OFFSET = 80; // header h-20
  const homePath = `/${locale}`;

  const isNewsActive = useMemo(() => restPath === "/nieuws" || restPath.startsWith("/nieuws/"), [restPath]);

  const scrollToHash = useCallback(
    (hash: string, behavior: ScrollBehavior = "smooth") => {
      if (!hash?.startsWith("#")) return false;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return false;

      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior });
      return true;
    },
    [HEADER_OFFSET],
  );

  const goTo = useCallback(
    (item: NavItem) => {
      setIsMobileMenuOpen(false);
      setLangOpen(false);

      // Niet op home? -> naar /[locale]#hash zodat secties bestaan
      if (!isHome) {
        router.push(`${homePath}${item.hash}`);
        return;
      }

      // Home: hash set + scroll met offset
      history.replaceState(null, "", item.hash);
      scrollToHash(item.hash, "smooth");
      setActiveHash(item.hash);
    },
    [homePath, isHome, router, scrollToHash],
  );

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep hash in state
  useEffect(() => {
    const setFromLocation = () => setActiveHash(window.location.hash || "");
    setFromLocation();
    window.addEventListener("hashchange", setFromLocation);
    return () => window.removeEventListener("hashchange", setFromLocation);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // If landed on /[locale]#hash, scroll after render
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;

    let tries = 0;
    const maxTries = 24;

    const tick = () => {
      tries += 1;
      const ok = scrollToHash(hash, tries === 1 ? "auto" : "smooth");
      if (ok) {
        setActiveHash(hash);
        return;
      }
      if (tries < maxTries) window.setTimeout(tick, 50);
    };

    window.setTimeout(tick, 0);
  }, [isHome, scrollToHash]);

  // Close language dropdown on outside click + ESC
  useEffect(() => {
    if (!langOpen) return;

    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const headerClass = useMemo(
    () =>
      cx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#050B2A]/80 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "bg-transparent",
      ),
    [isScrolled],
  );

  const isActive = useCallback(
    (item: NavItem) => {
      if (isHome) return activeHash === item.hash;
      return restPath === item.route;
    },
    [activeHash, isHome, restPath],
  );

  const switchLocale = useCallback(
    (to: Locale) => {
      setLangOpen(false);
      setIsMobileMenuOpen(false);

      const hash = isHome ? window.location.hash : "";
      const target = `/${to}${restPath === "/" ? "" : restPath}${hash}`;
      router.push(target);
    },
    [router, isHome, restPath],
  );

  return (
    <header className={headerClass}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo -> /[locale] */}
          <Link
            href={homePath}
            className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C44E]/60"
            aria-label="Go home"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                history.replaceState(null, "", homePath);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveHash("");
              }
            }}
          >
            <Image
              src="/logo-everkinetiq.png"
              alt="EverKinetiq logo"
              width={56}
              height={56}
              priority
              className="h-14 w-14 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              Ever<span className="text-[#F4C44E]">Kinetiq</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => {
              const active = isActive(item);
              const label = labels[item.key];
              const href = isHome ? item.hash : `/${locale}${item.route}`;

              return (
                <Link
                  key={item.hash}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (isHome) {
                      e.preventDefault();
                      goTo(item);
                    }
                  }}
                  className={cx(
                    "relative text-sm font-medium transition-colors",
                    active ? "text-[#F4C44E]" : "text-white/80 hover:text-white",
                  )}
                >
                  {label}
                  <span
                    className={cx(
                      "absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-[#F4C44E] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}

            {/* ✅ NIEUWS (blog) in header */}
            <Link
              href={`/${locale}/nieuws`}
              aria-current={isNewsActive ? "page" : undefined}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setLangOpen(false);
              }}
              className={cx(
                "relative text-sm font-medium transition-colors",
                isNewsActive ? "text-[#F4C44E]" : "text-white/80 hover:text-white",
              )}
            >
              {labels.news}
              <span
                className={cx(
                  "absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-[#F4C44E] transition-transform duration-300",
                  isNewsActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div ref={langRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/85 transition hover:bg-white/10"
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {locale.toUpperCase()}
                <ChevronDown className="h-4 w-4" />
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#050B2A]/90 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                  role="menu"
                >
                  {(ALL_LOCALES as readonly Locale[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchLocale(l)}
                      className={cx(
                        "w-full px-4 py-3 text-left text-sm transition",
                        l === locale
                          ? "bg-white/10 text-[#F4C44E]"
                          : "text-white/85 hover:bg-white/5 hover:text-white",
                      )}
                      role="menuitem"
                    >
                      {String(l).toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button className="hidden sm:inline-flex" onClick={() => router.push(`/${locale}/contact`)}>
              {labels.cta}
            </Button>

            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C44E]/60"
              aria-label={isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cx(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          isMobileMenuOpen ? "max-h-[740px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <div className="rounded-2xl border border-white/10 bg-[#050B2A]/85 backdrop-blur-md p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-2">
              {/* mobile language */}
              <div className="grid grid-cols-5 gap-2 pb-2">
                {(ALL_LOCALES as readonly Locale[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => switchLocale(l)}
                    className={cx(
                      "rounded-xl px-2 py-2 text-xs font-semibold transition",
                      l === locale
                        ? "bg-white/10 text-[#F4C44E]"
                        : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {String(l).toUpperCase()}
                  </button>
                ))}
              </div>

              {NAV.map((item) => {
                const active = isActive(item);
                const label = labels[item.key];
                const href = isHome ? item.hash : `/${locale}${item.route}`;

                return (
                  <Link
                    key={item.hash}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        goTo(item);
                      } else {
                        setIsMobileMenuOpen(false);
                        setLangOpen(false);
                      }
                    }}
                    className={cx(
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-white/10 text-[#F4C44E]"
                        : "text-white/85 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* ✅ NIEUWS (blog) in mobile menu */}
              <Link
                href={`/${locale}/nieuws`}
                aria-current={isNewsActive ? "page" : undefined}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLangOpen(false);
                }}
                className={cx(
                  "rounded-xl px-4 py-3 text-sm font-medium transition",
                  isNewsActive
                    ? "bg-white/10 text-[#F4C44E]"
                    : "text-white/85 hover:bg-white/5 hover:text-white",
                )}
              >
                {labels.news}
              </Link>

              <Button
                className="mt-2 w-full rounded-xl bg-[#F4C44E] text-[#0B1033] hover:bg-[#F4C44E]/90"
                onClick={() => router.push(`/${locale}/contact`)}
              >
                {labels.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}