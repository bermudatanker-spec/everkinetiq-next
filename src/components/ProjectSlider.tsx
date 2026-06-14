"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectItem = {
  title: string;
  category: string;
  location: string;
  image: string;
};

type Props = {
  projects: ProjectItem[];
  viewAllLabel: string;
  viewAllHref: string;
};

export default function ProjectSlider({ projects, viewAllLabel, viewAllHref }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((p) => (
          <article
            key={p.title}
            className="group flex-none w-[300px] md:w-[320px] rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="320px"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">{p.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{p.location}</span>
                <span className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-semibold text-[#6D28D9] uppercase tracking-wide">
                  {p.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#6D28D9] hover:text-[#6D28D9] mr-2"
          aria-label="Vorige"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#6D28D9] hover:text-[#6D28D9]"
          aria-label="Volgende"
        >
          →
        </button>
      </div>
    </div>
  );
}
