"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";

export function WaitlistStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg-ink)] px-4 py-3">
      <div className="container-site flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm text-[var(--on-ink-soft)] sm:text-left">
          Only{" "}
          <span className="font-bold text-[var(--accent-hot)]">
            {siteConfig.waitlistSpotsLeft}
          </span>{" "}
          waitlist spots left this month.{" "}
          <span className="font-semibold text-[var(--on-ink)]">Free. No payment.</span>
        </p>
        <Link
          href="#waitlist-form"
          className="btn btn-primary !py-2.5 !text-[0.75rem]"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Join waitlist
        </Link>
      </div>
    </div>
  );
}
