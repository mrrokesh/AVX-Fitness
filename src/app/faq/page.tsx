import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHero, PageCta } from "@/components/layout/PageHero";
import { pageBanners } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about memberships, personal training, nutrition, trials and data use.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        image={pageBanners.faq}
        imageAlt="Gym workout equipment"
        eyebrow="FAQ"
        title="Answers before you start"
        description="Memberships, personal training, nutrition, trials, and how we use your data."
        actions={
          <>
            <PageCta href="/consultation">Still unsure? Book a consult</PageCta>
            <PageCta href="/contact" variant="secondary">
              Contact us
            </PageCta>
          </>
        }
      />
      <FAQSection hideHeading />
      <div className="container-site px-4 pb-16">
        <Link href="/#waitlist-form" className="text-sm font-semibold text-[var(--accent)]">
          Ready to enroll →
        </Link>
      </div>
    </>
  );
}
