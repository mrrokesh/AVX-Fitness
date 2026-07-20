import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { siteConfig, pageBanners } from "@/data/site";
import { PageHero, PageCta } from "@/components/layout/PageHero";
import { primaryChatUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} in ${siteConfig.city} by phone, WhatsApp, email or form.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={pageBanners.contact}
        imageAlt="Gym training space"
        eyebrow="Contact"
        title="Talk to the studio"
        description={`Membership questions, consultations, and directions for ${siteConfig.name} in ${siteConfig.city}.`}
        actions={
          <>
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-on-dark"
            >
              WhatsApp {siteConfig.phone}
            </a>
            <PageCta href="/consultation" variant="secondary">
              Book consultation
            </PageCta>
          </>
        }
      />

      <div className="section-pad container-site">
        <ContactSection />
      </div>
    </>
  );
}
