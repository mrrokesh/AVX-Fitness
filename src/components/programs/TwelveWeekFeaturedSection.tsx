import Link from "next/link";
import { TwelveWeekPostersGallery } from "@/components/programs/TwelveWeekPostersGallery";
import { siteConfig } from "@/data/site";

export function TwelveWeekFeaturedSection() {
  return (
    <section id="12-week-fat-loss" className="scroll-mt-24 border-b border-[var(--border)] pb-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="eyebrow">Flagship program</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-[var(--text)]">
            12-Week Fat Loss Transformation
          </h2>
          <p className="mt-3 text-base text-[var(--text-muted)] md:text-lg">
            Transform your body. Build better habits. Keep the results. Personalized coaching,
            nutrition, daily accountability, and weekly progress reviews — online anywhere, anytime.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/programs/weight-loss" className="btn btn-secondary">
            Full program details
          </Link>
          <Link href="/#waitlist-form" className="btn btn-primary">
            Join now
          </Link>
        </div>
      </div>

      <TwelveWeekPostersGallery />

      <p className="mt-6 text-sm text-[var(--text-muted)]">
        Questions? Message Kathir on{" "}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          className="font-semibold text-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {siteConfig.phoneDisplay}
        </a>{" "}
        to start your 12-week journey.
      </p>
    </section>
  );
}
