"use client";

import Image from "next/image";
import { siteConfig } from "@/data/site";

/** Extra client / training frames from the official @avx_fit Instagram export. */
const moments = [
  {
    src: "/images/gallery/avx/avx_fit-20260716-0010.jpg",
    alt: "AVX client flexing after training",
    label: "Gym strength",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0014.jpg",
    alt: "Client starting physique in the studio",
    label: "Day one",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0015.jpg",
    alt: "Client lifestyle result photo on the beach",
    label: "Lifestyle win",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0016.jpg",
    alt: "Client training with barbell curls",
    label: "In the work",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0018.jpg",
    alt: "Client progress check mirror photo",
    label: "Progress check",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0019.jpg",
    alt: "Client posing in the gym",
    label: "Studio session",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0021.jpg",
    alt: "Client outdoor confidence photo",
    label: "Confidence",
  },
  {
    src: "/images/gallery/avx/avx_fit-20260716-0008.jpg",
    alt: "Client portrait after coaching journey",
    label: "After the grind",
  },
];

export function ResultMoments() {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent-hot)]">
            More moments
          </p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)] text-[var(--text)]">
            Training & lifestyle frames
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Extra shots from the AVX Fit feed — the work behind every transformation graphic above.
          </p>
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Open {siteConfig.instagram}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {moments.map((m) => (
          <figure key={m.src} className="group relative aspect-square overflow-hidden bg-[var(--bg-ink)]">
            <Image
              src={m.src}
              alt={m.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"
              aria-hidden
            />
            <figcaption className="absolute bottom-2.5 left-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
              {m.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
