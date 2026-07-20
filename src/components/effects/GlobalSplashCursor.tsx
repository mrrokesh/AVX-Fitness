"use client";

import dynamic from "next/dynamic";
import { useDevicePerformance, usePrefersReducedMotion } from "@/lib/hooks/performance";

const SplashCursor = dynamic(() => import("@/components/bits/SplashCursor"), { ssr: false });

/** Site-wide fluid cursor — desktop only, respects reduced motion / low-power devices. */
export function GlobalSplashCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const { tier, webglSupported } = useDevicePerformance();
  const show = !reducedMotion && webglSupported && tier !== "low";

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] hidden md:block" aria-hidden>
      <SplashCursor
        TRANSPARENT
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
        COLOR="#cf0a2c"
        RAINBOW_MODE={false}
        DENSITY_DISSIPATION={2.2}
        SPLAT_FORCE={4500}
      />
    </div>
  );
}
