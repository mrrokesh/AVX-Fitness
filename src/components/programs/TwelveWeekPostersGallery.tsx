"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fatLossProgramPosters } from "@/data/fat-loss-posters";

export function TwelveWeekPostersGallery({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getStepWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.children.item(0) as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? track.clientWidth;
    const gap = 16;
    return cardWidth + gap;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const intervalMs = 3200;
    const timer = window.setInterval(() => {
      // Auto-swipe only on mobile where carousel mode is active.
      if (window.innerWidth >= 640) return;

      const firstCard = track.children.item(0) as HTMLElement | null;
      const cardWidth = firstCard?.offsetWidth ?? track.clientWidth;
      const gap = 16;
      const nextLeft = track.scrollLeft + cardWidth + gap;
      const maxLeft = track.scrollWidth - track.clientWidth;

      track.scrollTo({
        left: nextLeft >= maxLeft - 4 ? 0 : nextLeft,
        behavior: "smooth",
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (window.innerWidth >= 640) return;
      const firstCard = track.children.item(0) as HTMLElement | null;
      const cardWidth = firstCard?.offsetWidth ?? track.clientWidth;
      const gap = 16;
      const step = cardWidth + gap;
      const next = Math.round(track.scrollLeft / Math.max(step, 1));
      const normalized = ((next % fatLossProgramPosters.length) + fatLossProgramPosters.length) %
        fatLossProgramPosters.length;
      setActiveIndex(normalized);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none sm:grid-cols-2"
      >
        {fatLossProgramPosters.map((poster) => (
          <figure
            key={poster.src}
            className="group min-w-[85%] snap-start overflow-hidden border border-[var(--border)] bg-black/40 sm:min-w-0"
          >
            <div className="relative aspect-square">
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                sizes="(max-width: 640px) 85vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              {poster.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
        {fatLossProgramPosters.map((poster, index) => (
          <button
            key={poster.src}
            type="button"
            aria-label={`Go to poster ${index + 1}`}
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              const step = getStepWidth();
              track.scrollTo({
                left: step * index,
                behavior: "smooth",
              });
            }}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index
                ? "w-6 bg-[var(--accent)]"
                : "w-1.5 bg-[var(--text-muted)]/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
