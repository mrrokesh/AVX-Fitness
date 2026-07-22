"use client";

import { useEffect, useState } from "react";

/**
 * True when the device primarily uses a mouse (hover + fine pointer).
 * False on phones/tablets and other touch-first devices.
 */
export function useHasMouseHover() {
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasMouse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hasMouse;
}
