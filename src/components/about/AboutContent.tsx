"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactIconBadge } from "@/components/icons/ContactIconBadge";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  siteConfig,
  brandPillars,
  coachingFeatures,
  pageBanners,
  heroBenefits,
} from "@/data/site";
import { facilities } from "@/data/content";
import { primaryChatUrl, telUrl } from "@/lib/utils";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { StudioMap } from "@/components/sections/StudioMap";
import { GsapReveal } from "@/components/effects/GsapReveal";
import BlurText from "@/components/bits/BlurText";

const journey = [
  {
    step: "01",
    title: "Free consultation",
    detail: "Share your goal, schedule, and training style — online or in Salem.",
  },
  {
    step: "02",
    title: "Custom plan",
    detail: "Training + diet built around your life, not a generic template.",
  },
  {
    step: "03",
    title: "Weekly accountability",
    detail: "Check-ins, form cues, and adjustments so progress doesn’t stall.",
  },
  {
    step: "04",
    title: "Measurable results",
    detail: "90-day focus blocks with real before/after tracking — like the stories on @avx_fit.",
  },
] as const;

const whoWeCoach = [
  {
    title: "Busy professionals",
    detail: "Short, effective sessions and nutrition that fits real schedules.",
  },
  {
    title: "Beginners",
    detail: "Form-first coaching so you build confidence without intimidation.",
  },
  {
    title: "Online clients",
    detail: "Train anywhere with the same structure Kathir uses offline in Salem.",
  },
  {
    title: "Transformation seekers",
    detail: "Fat loss, muscle gain, or recomp with clear milestones — not guesswork.",
  },
] as const;

export function AboutContent() {
  return (
    <>
      {/* Intro story */}
      <div className="section-pad container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <GsapReveal>
              <p className="eyebrow">Our story</p>
              <BlurText
                text="Real coaching for real people."
                delay={40}
                animateBy="words"
                direction="bottom"
                className="display mt-3 !justify-start text-[clamp(2.2rem,4.5vw,3.6rem)] !leading-[1.05] text-[var(--text)]"
              />
            </GsapReveal>

            <GsapReveal delay={0.08} y={32} className="mt-6 space-y-5 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                <strong className="text-[var(--text)]">{siteConfig.legalName}</strong> — known as{" "}
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--accent)]"
                >
                  {siteConfig.instagram}
                </a>
                — coaches fat loss, muscle gain, and body recomposition with the tagline{" "}
                <strong className="text-[var(--text)]">{siteConfig.tagline}</strong>.
              </p>
              <p>
                Founded by <strong className="text-[var(--text)]">{siteConfig.founder}</strong>,{" "}
                {siteConfig.founderTitle} (
                <a
                  href={siteConfig.founderInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--accent)]"
                >
                  {siteConfig.founderInstagram}
                </a>
                ). The focus is simple: personal training, practical diet plans, accountability,
                and 90-day blocks that create visible change.
              </p>
              <p>
                Whether you train on the Salem floor or follow online programming from home, you
                get the same standards — discipline, consistency, and results before excuses.
              </p>
              <p>
                <strong className="text-[var(--text)]">Contact:</strong>{" "}
                <a href={telUrl(siteConfig.phone)} className="font-semibold text-[var(--accent)]">
                  {siteConfig.phoneDisplay}
                </a>{" "}
                · WhatsApp · Instagram DM · {siteConfig.address}.
              </p>
            </GsapReveal>

            <GsapReveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
              <Link href="/consultation" className="btn btn-primary">
                Book free consultation
              </Link>
              <a
                href={primaryChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp now
              </a>
            </GsapReveal>
          </div>

          <GsapReveal delay={0.1} y={40}>
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)]">
              <Image
                src={pageBanners.studio}
                alt={`${siteConfig.name} training studio`}
                fill
                className="object-cover saturate-[1.1]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="mt-5 border-t border-[var(--border)] pt-5">
              <p className="display text-3xl text-[var(--text)]">{siteConfig.shortName}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Salem · Online & Offline · Fat Loss · Muscle · Recomp
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {heroBenefits.slice(0, 4).map((b) => (
                  <li
                    key={b}
                    className="border border-[var(--border)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </GsapReveal>
        </div>
      </div>

      {/* Full-width stats — fixes cramped colliding numbers */}
      <section
        aria-labelledby="about-stats"
        className="border-y border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_4%,var(--bg))]"
      >
        <div className="container-site section-pad !py-14 md:!py-16">
          <GsapReveal>
            <p className="eyebrow">By the numbers</p>
            <h2
              id="about-stats"
              className="display mt-3 max-w-xl text-[clamp(2rem,4vw,3.2rem)] text-[var(--text)]"
            >
              Proof of the work
            </h2>
          </GsapReveal>
          <div className="mt-10">
            <StatsStrip />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad container-site" aria-labelledby="how-it-works">
        <GsapReveal>
          <p className="eyebrow">Process</p>
          <h2
            id="how-it-works"
            className="display mt-3 text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--text)]"
          >
            How coaching works
          </h2>
          <p className="mt-3 max-w-xl text-[var(--text-muted)]">
            A clear path from first message to measurable change — no confusing membership maze.
          </p>
        </GsapReveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, i) => (
            <GsapReveal key={item.step} delay={i * 0.06} y={36}>
              <li className="border-t border-[var(--border)] pt-5">
                <span className="display text-4xl text-[var(--accent)]">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
              </li>
            </GsapReveal>
          ))}
        </ol>
      </section>

      {/* Who we coach */}
      <section
        className="border-t border-[var(--border)] bg-[var(--bg-elevated)]"
        aria-labelledby="who-we-coach"
      >
        <div className="section-pad container-site">
          <GsapReveal>
            <p className="eyebrow">Community</p>
            <h2
              id="who-we-coach"
              className="display mt-3 text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--text)]"
            >
              Who we coach
            </h2>
          </GsapReveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {whoWeCoach.map((item, i) => (
              <GsapReveal key={item.title} delay={i * 0.05} y={28}>
                <li className="border border-[var(--border)] p-6 transition hover:border-[var(--accent)]">
                  <h3 className="text-lg font-semibold text-[var(--text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </li>
              </GsapReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* AVX way + features */}
      <div className="section-pad container-site space-y-20">
        <section aria-labelledby="avx-way">
          <GsapReveal>
            <h2 id="avx-way" className="display text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--text)]">
              The AVX way
            </h2>
            <div className="page-rule mt-4" />
          </GsapReveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((p, i) => (
              <GsapReveal key={p.title} delay={i * 0.05} y={30}>
                <li className="group border-t-2 border-[var(--accent)] pt-5">
                  <h3 className="font-semibold text-[var(--text)] transition group-hover:text-[var(--accent)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{p.detail}</p>
                </li>
              </GsapReveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="what-you-get">
          <GsapReveal>
            <h2
              id="what-you-get"
              className="display text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--text)]"
            >
              What you get
            </h2>
            <p className="mt-3 max-w-xl text-[var(--text-muted)]">
              Coaching is more than workouts — it&apos;s structure, nutrition, and someone in your corner.
            </p>
          </GsapReveal>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {coachingFeatures.map((f, i) => (
              <GsapReveal key={f} delay={i * 0.03} y={20}>
                <li className="flex items-start gap-3 border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)]">
                  <span className="mt-1.5 size-1.5 shrink-0 bg-[var(--accent)]" />
                  {f}
                </li>
              </GsapReveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="focus-areas">
          <GsapReveal>
            <h2
              id="focus-areas"
              className="display text-[clamp(2.2rem,4vw,3.6rem)] text-[var(--text)]"
            >
              Training focus
            </h2>
            <div className="page-rule mt-4" />
          </GsapReveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((f, i) => (
              <GsapReveal key={f.id} delay={i * 0.05} y={28}>
                <li className="border-t border-[var(--border)] pt-4">
                  <h3 className="font-semibold text-[var(--text)]">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {f.description}
                  </p>
                </li>
              </GsapReveal>
            ))}
          </ul>
        </section>

        {/* Location map */}
        <GsapReveal>
          <section
            aria-labelledby="visit-heading"
            className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-12"
          >
            <div className="flex flex-col justify-between py-1">
              <div>
                <p className="eyebrow">Find us</p>
                <h2
                  id="visit-heading"
                  className="display mt-3 text-[clamp(2rem,4vw,3rem)] text-[var(--text)]"
                >
                  Salem studio
                  <span className="mt-1 block text-[var(--text-muted)]">
                    · online worldwide
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Prefer online? Same coaching standards via WhatsApp and structured plans —
                  start with a free consult.
                </p>

                <ul className="mt-8 space-y-6">
                  <li className="flex gap-3.5">
                    <ContactIconBadge kind="location" className="mt-0.5" />
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Address
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
                        {siteConfig.address}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {siteConfig.parkingInfo}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <ContactIconBadge kind="phone" className="mt-0.5" />
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Call / WhatsApp
                      </p>
                      <a
                        href={telUrl(siteConfig.phone)}
                        className="mt-1 block text-sm font-medium text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <ContactIconBadge kind="instagram" className="mt-0.5" />
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Instagram
                      </p>
                      <a
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm font-medium text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        {siteConfig.instagram}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <LocationIcon className="size-4" aria-hidden />
                  Get directions
                </a>
                <a
                  href={primaryChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary inline-flex items-center gap-2"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp us
                </a>
                <Link href="/consultation" className="btn btn-ghost">
                  Book consult
                </Link>
              </div>
            </div>

            <StudioMap />
          </section>
        </GsapReveal>
      </div>
    </>
  );
}
