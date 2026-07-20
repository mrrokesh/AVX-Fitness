"use client";

import Image from "next/image";
import { transformations } from "@/data/content";
import { siteConfig } from "@/data/site";

export function TransformationGallery() {
  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent-hot)]">
            Client stories
          </p>
          <h2 className="display text-[clamp(2.2rem,4vw,3.5rem)] text-[var(--text)]">
            Real people. Real results.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Before-and-after journeys from {siteConfig.instagram} — fat loss, muscle gain, and
            online coaching wins with Kathir.
          </p>
        </div>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          See more on Instagram
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {transformations.map((t) => (
          <TransformationCard key={t.id} {...t} />
        ))}
      </div>
    </section>
  );
}

function TransformationCard(t: (typeof transformations)[number]) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-ink)]">
        <Image
          src={t.posterImage}
          alt={`${t.clientName} — ${t.result} with AVX Fitness`}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-hot)]">
            {t.duration}
          </p>
          <p className="mt-0.5 text-lg font-semibold text-white">{t.clientName}</p>
          <p className="text-sm text-white/85">{t.result}</p>
        </div>
      </div>
      <div className="pt-4">
        {t.beforeWeight && t.afterWeight ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            {t.beforeWeight} → {t.afterWeight}
          </p>
        ) : null}
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{t.testimonial}</p>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          {t.program} · Coach {t.trainer}
        </p>
      </div>
    </article>
  );
}
