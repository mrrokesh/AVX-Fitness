import type { Metadata } from "next";
import { TransformationGallery } from "@/components/transformations/TransformationGallery";
import { InstagramReels } from "@/components/transformations/InstagramReels";
import { ResultMoments } from "@/components/transformations/ResultMoments";
import { siteConfig, pageBanners } from "@/data/site";
import { primaryChatUrl } from "@/lib/utils";
import { PageHero, PageCta } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Real AVX Fitness client transformations from Instagram — fat loss, muscle gain and online coaching results with Kathir in Salem.",
};

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        image={pageBanners.results}
        imageAlt="Athlete training results"
        eyebrow="Results"
        title="Real people. Real results."
        description={`Stories featured on ${siteConfig.instagram} — from major fat loss to online muscle gain and 90-day home-workout journeys.`}
        actions={
          <>
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark"
            >
              Start on WhatsApp
            </a>
            <PageCta href="/consultation" variant="secondary">
              Book a consult
            </PageCta>
          </>
        }
      />

      <div className="section-pad container-site">
        <TransformationGallery />
        <ResultMoments />
        <InstagramReels />
      </div>
    </>
  );
}
