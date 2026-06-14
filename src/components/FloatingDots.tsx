"use client";

import * as React from "react";

type Dot = {
  left: string;
  top: string;
  delay: string;
};

export default function FloatingDots() {
  const [dots, setDots] = React.useState<Dot[]>([]);

  React.useEffect(() => {
    const generated = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
    }));

    setDots(generated);
  }, []);

  // ⚠️ CRUCIAAL: server en eerste client render zijn identiek
  if (dots.length === 0) return null;

  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-foreground/20 animate-pulse-slow"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </>
  );
}