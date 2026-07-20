import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <article className="section-pad container-site max-w-3xl">
      <h1 className="display text-5xl text-[var(--text)]">Terms & Conditions</h1>
      <p className="mt-4 text-[var(--text-muted)]">
        By using the {siteConfig.name} website you agree to these terms. Replace with
        counsel-reviewed terms before production launch.
      </p>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-[var(--text-muted)]">
        <li>Website content is informational and does not constitute medical advice.</li>
        <li>Memberships, packages and sessions are subject to facility rules and coach availability.</li>
        <li>Booking confirmations may be rescheduled or cancelled according to published policies.</li>
        <li>Do not submit false information through registration or contact forms.</li>
      </ul>
    </article>
  );
}
