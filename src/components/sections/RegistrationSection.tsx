import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { WaitlistStickyBar } from "@/components/forms/WaitlistStickyBar";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { primaryChatUrl } from "@/lib/utils";

export function RegistrationSection() {
  return (
    <section
      id="registration"
      className="waitlist-page relative scroll-mt-24 pb-28 sm:pb-24"
      aria-labelledby="registration-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -left-20 top-10 size-64 rounded-full bg-[var(--accent)] blur-[100px]" />
        <div className="absolute -right-16 bottom-20 size-72 rounded-full bg-[var(--accent-hot)] blur-[120px]" />
      </div>

      <div className="container-site relative px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mb-5 border border-[color-mix(in_srgb,var(--on-ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--bg-ink)_86%,transparent)] px-4 py-3 text-center text-xs font-semibold tracking-wide text-[var(--on-ink)]">
          Only <span className="text-[var(--accent-hot)]">{siteConfig.waitlistSpotsLeft}</span>{" "}
          waitlist spots open this month. Free. No payment.
        </div>
        <p className="eyebrow mb-4 text-center !text-[var(--accent-hot)] sm:mb-6">
          Join the waitlist · Free
        </p>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 xl:gap-16">
          <div className="text-[var(--on-ink)] lg:sticky lg:top-28 lg:self-start">
            <h2
              id="registration-heading"
              className="display text-[clamp(2.2rem,7vw,3.75rem)] leading-[0.95]"
            >
              <span className="block">{siteConfig.membersTrained}+ clients coached.</span>
              <span className="mt-2 block text-[var(--on-ink-soft)]">Online &amp; offline.</span>
              <span className="mt-2 block text-[var(--accent-hot)]">
                Real results. Real coaching.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--on-ink-soft)] sm:text-base">
              Most plans fail because they&apos;re built for someone else&apos;s life. This one
              is built around yours — your schedule, your food, your starting point.{" "}
              <strong className="text-[var(--on-ink)]">
                Personal training, diet plans, and accountability with {siteConfig.founder}.
              </strong>
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="border border-[color-mix(in_srgb,var(--on-ink)_20%,transparent)] px-3 py-2">
                <p className="display text-xl text-[var(--on-ink)]">{siteConfig.membersTrained}+</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--on-ink-soft)]">
                  Clients coached
                </p>
              </div>
              <div className="border border-[color-mix(in_srgb,var(--on-ink)_20%,transparent)] px-3 py-2">
                <p className="display text-xl text-[var(--on-ink)]">20 min</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--on-ink-soft)]">
                  Daily focus
                </p>
              </div>
              <div className="border border-[color-mix(in_srgb,var(--on-ink)_20%,transparent)] px-3 py-2">
                <p className="display text-xl text-[var(--on-ink)]">4.9★</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--on-ink-soft)]">
                  Client rating
                </p>
              </div>
              <div className="border border-[color-mix(in_srgb,var(--on-ink)_20%,transparent)] px-3 py-2">
                <p className="display text-xl text-[var(--on-ink)]">24 hrs</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--on-ink-soft)]">
                  Team response
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {["Free consultation", "No payment now", "Reply within 24 hrs"].map((item) => (
                <li
                  key={item}
                  className="border border-[color-mix(in_srgb,var(--on-ink)_20%,transparent)] px-3 py-2.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--on-ink)]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={primaryChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                WhatsApp now
              </a>
              <Link href="/transformations" className="btn btn-ghost">
                See results
              </Link>
              <Link href="/consultation" className="btn btn-ghost">
                Book free call
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <RegistrationForm />
            <p className="mt-4 text-center text-xs leading-relaxed text-[var(--on-ink-faint)]">
              *One waitlist spot per person · Consistency over excuses
            </p>
          </div>
        </div>
      </div>

      <WaitlistStickyBar />
    </section>
  );
}
