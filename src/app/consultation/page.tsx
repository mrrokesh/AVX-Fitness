import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationBooking } from "@/components/booking/ConsultationBooking";
import { siteConfig, pageBanners } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: `Schedule a fitness consultation at ${siteConfig.name}.`,
};

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        image={pageBanners.consultation}
        imageAlt="Fitness consultation training"
        eyebrow="Book"
        title="Book a free consultation"
        description={`Choose a coach, mode, and available slot. Gym timezone: ${siteConfig.timezoneLabel}.`}
      />
      <div className="section-pad container-site">
        <div className="mx-auto max-w-2xl">
          <Suspense
            fallback={
              <div className="surface rounded-[var(--radius)] p-6 text-[var(--text-muted)]">
                Loading booking form…
              </div>
            }
          >
            <ConsultationBooking />
          </Suspense>
        </div>
      </div>
    </>
  );
}
