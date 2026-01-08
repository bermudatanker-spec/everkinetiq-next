"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const locales = ["nl", "fr", "en", "es", "de"] as const;
type Locale = (typeof locales)[number];

type Labels = {
  services: string;
  about: string;
  projects: string;
  contact: string;
  cta: string;
};

type Hash = "#diensten" | "#over-ons" | "#projecten" | "#contact";
type NavItem = { key: keyof Omit<Labels, "cta">; hash: Hash; route: "/diensten" | "/over-ons" | "/projecten" | "/contact" };

const navItems: NavItem[] = [
  { key: "services", hash: "#diensten", route: "/diensten" },
  { key: "about", hash: "#over-ons", route: "/over-ons" },
  { key: "projects", hash: "#projecten", route: "/projecten" },
  { key: "contact", hash: "#contact", route: "/contact" },
];

const localeLabel: Record<Locale, string> = { nl: "NL", fr: "FR", en: "EN", es: "ES", de: "DE" };

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  const first = parts[1];
  if ((locales as readonly string[]).includes(first)) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname || "/";
}

export default function Navigation({ locale, labels }: { locale: Locale; labels: Labels }) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  const restPath = stripLocale(pathname);
  const isHome = restPath === "/" || restPath === "";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const [langOpen, setLangOpen] = useState(false);

  const HEADER_OFFSET = 80;
  const homePath = `/${locale}`;
  const makeHomeHash = (hash: string) => `${homePath}${hash}`;

  const scrollToHash = useCallback((hash: string, behavior: ScrollBehavior = "smooth") => {
    if (!hash.startsWith("#")) return false;
    const el = document.getElementById(hash.slice(1));
    if (!el) return false;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior });
    return true;
  }, []);

  const goTo = useCallback((item: NavItem) => {
    setIsMobileMenuOpen(false);

    if (!isHome) {
      router.push(makeHomeHash(item.hash));
      return;
    }

    history.replaceState(null, "", item.hash);
    scrollToHash(item.hash, "smooth");
    setActiveHash(item.hash);
  }, [isHome, router, scrollToHash, locale]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setFromLocation = () => setActiveHash(window.location.hash || "");
    setFromLocation();
    window.addEventListener("hashchange", setFromLocation);
    return () => window.removeEventListener("hashchange", setFromLocation);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;

    let tries = 0;
    const tick = () => {
      tries += 1;
      const ok = scrollToHash(hash, tries === 1 ? "auto" : "smooth");
      if (ok) { setActiveHash(hash); return; }
      if (tries < 24) setTimeout(tick, 50);
    };
    setTimeout(tick, 0);
  }, [isHome, scrollToHash]);

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

  const isActive = useCallback((item: NavItem) => {
    if (isHome) return activeHash === item.hash;
    return restPath === item.route;
  }, [isHome, activeHash, restPath]);

  const switchLocale = useCallback((to: Locale) => {
    setLangOpen(false);
    setIsMobileMenuOpen(false);

    const newPath = `/${to}${restPath === "/" ? "" : restPath}`;
    const hash = isHome ? window.location.hash : "";
    router.push(`${newPath}${hash}`);
  }, [router, restPath, isHome]);

  return (
    <header className={headerClass}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-20 items-center justify-between">
          <Link
            href={homePath}
            className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C44E]/60"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                history.replaceState(null, "", homePath);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveHash("");
              }
            }}
          >
            <Image src="/logo-everkinetiq.png" alt="EverKinetiq logo" width={56} height={56} priority className="h-14 w-14 object-contain" />
            <span className="text-lg font-semibold tracking-tight text-white">
              Ever<span className="text-[#F4C44E]">Kinetiq</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item);
              const href = isHome ? item.hash : `/${locale}${item.route}`;

              return (
                <Link
                  key={item.hash}
                  href={href}
                  onClick={(e) => {
                    if (isHome) { e.preventDefault(); goTo(item); }
                  }}
                  className={cx("relative text-sm font-medium transition-colors", active ? "text-[#F4C44E]" : "text-white/80 hover:text-white")}
                >
                  {labels[item.key]}
                  <span className={cx("absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-[#F4C44E] transition-transform duration-300", active ? "scale-x-100" : "scale-x-0")} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/85 transition hover:bg-white/10"
              >
                {localeLabel[locale]} <ChevronDown className="h-4 w-4" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#050B2A]/90 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                  {locales.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => switchLocale(l)}
                      className={cx("w-full px-4 py-3 text-left text-sm transition", l === locale ? "bg-white/10 text-[#F4C44E]" : "text-white/85 hover:bg-white/5 hover:text-white")}
                    >
                      {l.toUpperCase()}
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
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}