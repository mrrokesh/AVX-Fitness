import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { WaitlistStickyBar } from "@/components/forms/WaitlistStickyBar";
import { WaitlistSupportContent } from "@/components/sections/WaitlistSupportContent";
import { siteConfig } from "@/data/site";

export function RegistrationSection() {
  return (
    <section
      id="registration"
      className="waitlist-page relative scroll-mt-24 pb-16 sm:pb-20"
      aria-labelledby="registration-heading"
    >
      <div className="container-site relative px-4 pt-4 pb-5 sm:px-6 sm:pt-6 sm:pb-6 lg:pt-10 lg:pb-8">
        <p className="waitlist-hero-eyebrow mb-3 text-center sm:mb-4 lg:mb-5">
          Join the waitlist · Free Consultation
        </p>

        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-14">
          <div className="waitlist-hero-copy text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
            <h2
              id="registration-heading"
              className="waitlist-hero-title text-[1.45rem] leading-[1.25] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.35rem] lg:leading-[1.15] xl:text-[2.6rem]"
            >
              <span className="block">
                {siteConfig.membersTrained}+ clients coached. Online &amp; offline.
              </span>
              <span className="waitlist-hero-accent mt-1 block sm:mt-1.5">
                Real results. Real coaching.
              </span>
            </h2>
            <p className="waitlist-hero-body mx-auto mt-3 max-w-xl text-[0.82rem] leading-relaxed sm:text-sm lg:mx-0 lg:mt-4 lg:text-[0.95rem]">
              Most plans fail because they&apos;re built for someone else&apos;s life. This one
              is built around yours — your schedule, your food, your starting point.{" "}
              <strong className="font-bold text-white">
                {siteConfig.membersTrained}+ clients coached with personal training, diet plans,
                and accountability from {siteConfig.founder}.
              </strong>{" "}
              No crash diets. No giving up the food you love.
            </p>

            <WaitlistSupportContent className="mt-6 hidden lg:block" animated />
          </div>

          <div className="min-w-0">
            <RegistrationForm />
            <p className="mt-4 text-center text-xs leading-relaxed text-white/65 lg:text-left">
              *One waitlist spot per person · Consistency over excuses
            </p>
            <WaitlistSupportContent className="mt-4 lg:hidden" />
          </div>
        </div>
      </div>

      <WaitlistStickyBar />
    </section>
  );
}
