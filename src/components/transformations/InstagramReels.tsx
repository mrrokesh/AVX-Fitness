"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { instagramReels } from "@/data/content";
import { siteConfig } from "@/data/site";

export function InstagramReels() {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent-hot)]">
            From Instagram
          </p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)] text-[var(--text)]">
            {siteConfig.instagram} reels
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Training energy and client moments from the official AVX Fit Instagram.
          </p>
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Follow on Instagram
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {instagramReels.map((reel) => (
          <ReelCard key={reel.id} {...reel} />
        ))}
      </div>
    </section>
  );
}

function ReelCard({
  src,
  label,
}: {
  src: string;
  label: string;
  id: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group overflow-hidden bg-[var(--bg-ink)]">
      <div className="relative aspect-[9/16] max-h-[480px] bg-black">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          playsInline
          muted
          loop
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center bg-black/20 text-sm font-medium text-white transition hover:bg-black/30"
          onClick={() => {
            const el = videoRef.current;
            if (!el) return;
            if (el.paused) void el.play();
            else el.pause();
          }}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        >
          {!playing ? (
            <span className="inline-flex items-center gap-2 bg-black/65 px-4 py-2.5 backdrop-blur-sm">
              <Play className="size-3.5 fill-current" aria-hidden />
              Play
            </span>
          ) : null}
        </button>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden
        />
        <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-sm font-medium text-white">
          {label}
        </p>
      </div>
    </article>
  );
}
