import Image from "next/image";
import Link from "next/link";
import { transformations } from "@/data/content";
import { siteConfig } from "@/data/site";

export function TransformationsPreview() {
  const featured = transformations.slice(0, 4);

  return (
    <section className="section-pad container-site" id="results">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent-hot)]">
            Transformations
          </p>
          <h2 className="display text-4xl text-white sm:text-5xl">
            Real people. Real results.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Client stories from {siteConfig.instagram} — fat loss, muscle gain and
            home-workout transformations coached by Kathir.
          </p>
        </div>
        <Link href="/consultation" className="btn btn-primary">
          Start your journey
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((t) => (
          <article key={t.id} className="glass overflow-hidden rounded-2xl">
            <div className="relative aspect-square bg-[#15171c]">
              <Image
                src={t.posterImage}
                alt={`${t.clientName} transformation — ${t.result}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h3 className="display text-3xl text-white">{t.clientName}</h3>
              <p className="text-sm text-[var(--accent-hot)]">
                {t.duration} · {t.result}
                {t.beforeWeight && t.afterWeight
                  ? ` · ${t.beforeWeight} → ${t.afterWeight}`
                  : null}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{t.testimonial}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
