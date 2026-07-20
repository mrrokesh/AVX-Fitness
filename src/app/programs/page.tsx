import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/data/programs";
import { membershipPlans } from "@/data/memberships";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { TwelveWeekFeaturedSection } from "@/components/programs/TwelveWeekFeaturedSection";
import { PageHero, PageCta } from "@/components/layout/PageHero";
import { pageBanners } from "@/data/site";

export const metadata: Metadata = {
  title: "Programs & Membership",
  description:
    "Explore training programs and membership plans in one place — weight loss, strength, personal training, online coaching and more.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        image={pageBanners.programs}
        imageAlt="Strength training at AVX Fitness"
        eyebrow="Programs"
        title="Training tracks built around your goal"
        description="Fat loss, muscle gain, recomposition, strength, HIIT, women’s fitness, nutrition and online coaching — each with a clear approach and next step."
        actions={
          <>
            <PageCta href="/programs#12-week-fat-loss">See 12-week program</PageCta>
            <PageCta href="/programs#membership-plans" variant="secondary">
              See membership plans
            </PageCta>
          </>
        }
      />

      <div className="section-pad container-site">
        <TwelveWeekFeaturedSection />

        <div className="mt-16 border-b border-[var(--border)]">
          {programs.map((p, i) => (
            <ProgramCard key={p.slug} program={p} index={i} />
          ))}
        </div>
        <p className="mt-12 text-sm text-[var(--text-muted)]">
          Not sure where to start?{" "}
          <Link href="/consultation" className="font-semibold text-[var(--accent)]">
            Book a free consultation
          </Link>{" "}
          and we’ll match you to a track.
        </p>

        <section id="membership-plans" className="scroll-mt-24 pt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Membership</p>
              <h2 className="display mt-3 text-[clamp(2rem,4vw,3rem)] text-[var(--text)]">
                Plans for how you train
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
                Monthly through annual, personal training, couple, student and online coaching.
                Confirm current rates via consult or WhatsApp.
              </p>
            </div>
            <Link href="/#waitlist-form" className="btn btn-primary">
              Join / Enroll
            </Link>
          </div>

          <div className="border-b border-[var(--border)]">
            {membershipPlans.map((plan) => (
              <article
                key={plan.id}
                className="grid gap-6 border-t border-[var(--border)] py-10 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-start"
              >
                <div>
                  {plan.recommended ? <p className="eyebrow mb-3">Recommended</p> : null}
                  <h3 className="display text-[clamp(2rem,3.5vw,3rem)] text-[var(--text)]">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--accent)]">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.duration}</p>
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-muted)] md:text-base">
                  {plan.facilities.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
                      {f}
                    </li>
                  ))}
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
                    Sessions: {plan.sessions}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
                    Trainer support: {plan.trainerSupport}
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
                    Nutrition: {plan.nutritionSupport}
                  </li>
                </ul>
                <Link
                  href="/#waitlist-form"
                  className="btn btn-primary h-fit w-full lg:w-auto"
                  data-track={`membership-click-${plan.id}`}
                >
                  Join
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
