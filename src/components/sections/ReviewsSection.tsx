"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { GsapReveal } from "@/components/effects/GsapReveal";

export function ReviewsSection() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="section-band-elevated border-b border-[var(--border)]"
    >
      <div className="container-site section-pad !pb-6">
        <GsapReveal>
          <div className="mb-2 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Client reviews</p>
              <h2
                id="reviews-heading"
                className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] text-[var(--text)]"
              >
                Words from the floor
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                Stories inspired by public transformation posts and coaching journeys on{" "}
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--accent)]"
                >
                  {siteConfig.instagram}
                </a>{" "}
                — fat loss, muscle, and online results with {siteConfig.founder}.
              </p>
            </div>
            <Link
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              data-track="reviews-instagram"
            >
              View on Instagram
            </Link>
          </div>
        </GsapReveal>
      </div>
      <StaggerTestimonials />
    </section>
  );
}
