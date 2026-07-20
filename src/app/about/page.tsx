import type { Metadata } from "next";
import { siteConfig, pageBanners } from "@/data/site";
import { primaryChatUrl } from "@/lib/utils";
import { PageHero, PageCta } from "@/components/layout/PageHero";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description: siteConfig.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={pageBanners.about}
        imageAlt="AVX Fitness gym floor"
        eyebrow="About"
        title="Transform your body. Transform your life."
        description={`${siteConfig.legalName} in ${siteConfig.city} — online coaching anywhere, offline training with ${siteConfig.founder}.`}
        actions={
          <>
            <PageCta href="/consultation">Book free consultation</PageCta>
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark-outline"
            >
              WhatsApp {siteConfig.phone}
            </a>
          </>
        }
      />

      <AboutContent />
    </>
  );
}
