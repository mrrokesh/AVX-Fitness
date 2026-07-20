import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Cancellation and Refund Policy" };

export default function CancellationPage() {
  return (
    <article className="section-pad container-site max-w-3xl">
      <h1 className="display text-5xl text-[var(--text)]">Cancellation & Refund Policy</h1>
      <p className="mt-4 text-[var(--text-muted)]">
        Outline your freeze, cancellation and refund rules here for {siteConfig.name}. This is a
        placeholder — publish only accurate, business-approved policies.
      </p>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-[var(--text-muted)]">
        <li>Consultations can usually be rescheduled with reasonable notice, subject to availability.</li>
        <li>Membership freeze windows depend on the selected plan.</li>
        <li>Personal training session packs may require advance notice to reschedule.</li>
        <li>Refund eligibility should be stated clearly at point of purchase.</li>
      </ul>
    </article>
  );
}
