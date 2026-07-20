"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function useDevicePerformance() {
  const [tier, setTier] = useState<"high" | "medium" | "low">("medium");
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebgl(!!gl);
    } catch {
      setWebgl(false);
    }

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (!webgl || cores <= 2 || memory <= 2 || isMobile) {
      setTier("low");
    } else if (cores <= 4 || memory <= 4) {
      setTier("medium");
    } else {
      setTier("high");
    }
  }, [webgl]);

  return { tier, webglSupported: webgl };
}
