import type { Metadata } from "next";
import Link from "next/link";
import { TrainersDirectory } from "@/components/trainers/TrainersDirectory";
import { PageHero, PageCta } from "@/components/layout/PageHero";
import { siteConfig, pageBanners } from "@/data/site";

export const metadata: Metadata = {
  title: "Coach",
  description: `Meet ${siteConfig.founder} — certified fitness trainer for online and offline coaching in Salem.`,
};

export default function TrainersPage() {
  return (
    <>
      <PageHero
        image={pageBanners.coach}
        imageAlt="Personal coaching session"
        eyebrow="Coach"
        title={`Train with ${siteConfig.founder}`}
        description={`${siteConfig.founderTitle}. Online anywhere, offline in ${siteConfig.city} — fat loss, muscle gain, and body recomposition with real accountability.`}
        actions={
          <>
            <PageCta href="/consultation">Book with {siteConfig.founder}</PageCta>
            <PageCta href="/transformations" variant="secondary">
              See client results
            </PageCta>
          </>
        }
      />

      <div className="section-pad container-site">
        <TrainersDirectory />
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/consultation" className="btn btn-secondary">
            Book consultation
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact the studio
          </Link>
        </div>
      </div>
    </>
  );
}
