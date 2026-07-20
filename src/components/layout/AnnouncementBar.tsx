"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function AnnouncementBar() {
  const [message, setMessage] = useState(siteConfig.announcement);

  useEffect(() => {
    fetch("/api/announcement")
      .then((r) => r.json())
      .then((d) => {
        if (d.announcement) setMessage(d.announcement);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="relative z-[60] border-b border-[var(--border)] bg-[var(--bg-ink)] text-[var(--on-ink-soft)]">
      <div className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5">
        <p className="max-w-[min(100%,42rem)] truncate text-center text-[0.8rem] font-medium tracking-tight sm:text-[0.85rem]">
          {message}{" "}
          <Link
            href="/consultation"
            className="font-semibold text-[var(--accent-hot)] underline-offset-2 hover:underline"
          >
            Book now
          </Link>
        </p>
      </div>
    </div>
  );
}
