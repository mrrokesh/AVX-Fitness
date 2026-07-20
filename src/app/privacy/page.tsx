import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="section-pad container-site prose-invert max-w-3xl">
      <h1 className="display text-5xl text-[var(--text)]">Privacy Policy</h1>
      <p className="mt-4 text-[var(--text-muted)]">
        This policy explains how {siteConfig.name} collects and uses information submitted
        through this website. Replace this placeholder with counsel-reviewed legal text before launch.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[var(--text)]">What we collect</h2>
      <p className="mt-2 text-[var(--text-muted)]">
        Contact details, fitness preferences, consultation booking information and optional marketing
        preferences you provide through forms.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[var(--text)]">How we use data</h2>
      <p className="mt-2 text-[var(--text-muted)]">
        To respond to enquiries, schedule consultations, manage memberships and improve services.
        Marketing messages are sent only with separate optional consent.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[var(--text)]">Storage & processors</h2>
      <p className="mt-2 text-[var(--text-muted)]">
        Data may be stored in our primary database and synchronised to Google Sheets / Calendar via
        secure server-side integrations. Credentials are never exposed in frontend code.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-[var(--text)]">Your rights</h2>
      <p className="mt-2 text-[var(--text-muted)]">
        Contact {siteConfig.email} to request access, correction or deletion where applicable under local law.
      </p>
    </article>
  );
}
