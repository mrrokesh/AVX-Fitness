import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Member portal architecture preview — coming soon.",
};

export default function PortalPage() {
  return (
    <div className="section-pad container-site max-w-3xl text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
        Client portal
      </p>
      <h1 className="display text-5xl text-[var(--text)] sm:text-6xl">Coming soon</h1>
      <p className="mt-4 text-[var(--text-muted)]">
        Architecture is prepared for secure member sign-in, membership details, upcoming
        sessions, workout and nutrition plans, measurement tracking, progress photos, trainer
        feedback, rescheduling, invoices and renewals.
      </p>
      <ul className="mx-auto mt-8 max-w-lg list-disc space-y-2 pl-5 text-left text-sm text-[var(--text-muted)]">
        <li>Auth: NextAuth / secure session cookies</li>
        <li>Data: local PostgreSQL (memberships, sessions, plans, measurements)</li>
        <li>Storage: private progress photo storage</li>
        <li>Billing: invoice PDF generation + renewal reminders</li>
      </ul>
      <Link href="/#waitlist-form" className="btn btn-primary mt-8">
        Register interest
      </Link>
    </div>
  );
}
