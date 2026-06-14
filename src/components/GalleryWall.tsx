"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery";

// ── Types ─────────────────────────────────────────────────────────────────
type FilterState = "all" | GalleryCategory;

// ── Helpers ───────────────────────────────────────────────────────────────
const FILTERS: Array<{ key: FilterState; label: string; count: number }> = [
  { key: "all", label: "Alles", count: GALLERY_ITEMS.length },
  ...Object.entries(GALLERY_CATEGORIES).map(([key, meta]) => ({
    key: key as GalleryCategory,
    label: meta.label,
    count: GALLERY_ITEMS.filter((i) => i.category === key).length,
  })),
];

// ── Component ─────────────────────────────────────────────────────────────
export default function GalleryWall() {
  const [active, setActive] = useState<FilterState>("all");
  const [lightbox, setLightbox] = useState<number | null>(null); // index into filtered
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);
  const activeColor = active !== "all" ? GALLERY_CATEGORIES[active].color : "#D97706";

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => (p !== null ? (p + 1) % filtered.length : null));
      if (e.key === "ArrowLeft")  setLightbox((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  // Lock scroll when lightbox open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const openLightbox = useCallback((idx: number) => setLightbox(idx), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const next = useCallback(() => setLightbox((p) => (p !== null ? (p + 1) % filtered.length : null)), [filtered.length]);

  const markLoaded = useCallback((idx: number) => setLoaded((s) => { const ns = new Set(s); ns.add(idx); return ns; }), []);

  const activeMeta = active !== "all" ? GALLERY_CATEGORIES[active] : null;

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 border-b border-white/10 bg-[#080818]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map(({ key, label, count }) => {
              const isActive = active === key;
              const color = key !== "all" ? GALLERY_CATEGORIES[key].color : "#D97706";
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className="group relative flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? color : "rgba(255,255,255,0.05)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                    border: `1px solid ${isActive ? color : "rgba(255,255,255,0.10)"}`,
                  }}
                >
                  {label}
                  <span
                    className="ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.08)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category description */}
          {activeMeta && (
            <p className="mt-1.5 text-xs text-white/50">{activeMeta.description}</p>
          )}
        </div>
      </div>

      {/* ── Counter strip ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="h-[2px] w-8 rounded-full"
            style={{ backgroundColor: activeColor }}
          />
          <span className="text-xs tracking-[0.2em] text-white/40 uppercase">
            {filtered.length} realisaties
            {active !== "all" && ` · ${GALLERY_CATEGORIES[active as GalleryCategory].label}`}
          </span>
        </div>
      </div>

      {/* ── Masonry Grid ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pb-24">
        {/*
          CSS columns masonry — true masonry with no JS library.
          3 cols desktop, 2 tablet, 1 mobile.
          Images break naturally across columns.
        */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3"
          style={{ columnFill: "balance" }}
        >
          {filtered.map((item, idx) => {
            const catMeta = GALLERY_CATEGORIES[item.category];
            return (
              <div
                key={`${item.file}-${active}`}
                className="group relative mb-3 break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(idx)}
                style={{
                  // Stagger animation via CSS custom property
                  animation: `fadeInUp 0.4s ease both`,
                  animationDelay: `${Math.min(idx * 15, 400)}ms`,
                }}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-white/5">
                  <Image
                    src={item.file}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className={`w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${loaded.has(idx) ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => markLoaded(idx)}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />

                  {/* Skeleton while loading */}
                  {!loaded.has(idx) && (
                    <div className="absolute inset-0 animate-pulse bg-white/5" style={{ minHeight: "200px" }} />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(8,8,24,0.85) 0%, transparent 55%)" }}>
                    <div className="p-3">
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase"
                        style={{ backgroundColor: catMeta.color }}
                      >
                        {catMeta.label}
                      </span>
                    </div>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                    <ZoomIn className="h-3.5 w-3.5 text-white" />
                  </div>

                  {/* Gold bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: catMeta.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-white/40">
            <p className="text-lg">Geen foto&apos;s in deze categorie.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={(e) => { if (e.target === lightboxRef.current) closeLightbox(); }}
        >
          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 tracking-widest font-mono">
            {String(lightbox + 1).padStart(3, "0")} / {String(filtered.length).padStart(3, "0")}
          </div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider"
              style={{ backgroundColor: GALLERY_CATEGORIES[filtered[lightbox].category].color }}
            >
              {GALLERY_CATEGORIES[filtered[lightbox].category].label}
            </span>
          </div>

          {/* Main image */}
          <div className="relative mx-16 max-h-[85vh] max-w-5xl w-full">
            <Image
              src={filtered[lightbox].file}
              alt={filtered[lightbox].alt}
              width={1600}
              height={1200}
              className="h-full max-h-[85vh] w-full rounded-lg object-contain"
              priority
            />
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Alt text / SEO description */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 text-center">
            <p className="text-xs text-white/40 leading-relaxed">{filtered[lightbox].alt}</p>
          </div>

          {/* Touch swipe hints */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 text-white/20">
            <span className="text-xs">← → pijltoetsen</span>
            <span className="text-xs">·</span>
            <span className="text-xs">ESC sluiten</span>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
