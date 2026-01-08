import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Premium blauwe achtergrond (lichter) + gouden lijnen (SVG overlay)
 * Herbruikbaar op ALLE pagina's.
 */
export default function PremiumBackground({ children, className }: Props) {
  return (
    <div className={["relative min-h-screen text-white", className].filter(Boolean).join(" ")}>
      {/* Base background */}
      <div className="absolute inset-0 -z-10 bg-[#07144A]" />

      {/* Soft gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(62,104,255,0.35),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(700px_520px_at_15%_15%,rgba(244,196,78,0.20),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(760px_520px_at_85%_25%,rgba(43,210,255,0.12),transparent_70%)]" />

      {/* Very subtle texture */}
      <div className="absolute inset-0 -z-10 opacity-15 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* Gold lines overlay (SVG) */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4C44E" stopOpacity="0.0" />
            <stop offset="0.35" stopColor="#F4C44E" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="#F4C44E" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F4C44E" stopOpacity="0.0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Corner waves */}
        <path
          d="M-40,140 C180,40 380,40 600,140 C820,240 1020,240 1240,140 C1340,90 1410,60 1500,40"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="3"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M-60,240 C200,140 420,140 640,240 C860,340 1080,340 1300,240 C1400,190 1470,160 1540,140"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="2"
          opacity="0.55"
        />

        <path
          d="M-80,720 C200,620 420,620 640,720 C860,820 1080,820 1300,720 C1400,670 1470,640 1540,620"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="3"
          filter="url(#glow)"
          opacity="0.85"
        />
        <path
          d="M-100,820 C220,720 460,720 700,820 C940,920 1180,920 1420,820"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="2"
          opacity="0.45"
        />
      </svg>

      {children}
    </div>
  );
}