"use client";

import { useEffect, useState } from "react";
import Index from "@/pages/Index";

export default function ClientIndex() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Index />;
}