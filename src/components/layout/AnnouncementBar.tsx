"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

function normalizePhrase(value: string): string {
  return value.replace(/\.$/, "").trim().toLowerCase();
}

function parseAnnouncementPhrases(message: string): string[] {
  return message
    .split(/\s*[·|—]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function mergePhrases(custom: string[], defaults: readonly string[]): string[] {
  const merged: string[] = [];

  for (const phrase of [...custom, ...defaults]) {
    const normalized = normalizePhrase(phrase);
    if (!normalized) continue;
    if (merged.some((entry) => normalizePhrase(entry) === normalized)) continue;
    merged.push(phrase.replace(/\.$/, "").trim());
  }

  return merged;
}

function MarqueeStrip({ items, stripId }: { items: string[]; stripId: string }) {
  const phrases = useMemo(
    () => [...items.map((item) => item.toUpperCase()), "BOOK NOW"],
    [items]
  );

  return (
    <span className="announcement-marquee-strip">
      {phrases.map((phrase, index) => (
        <span key={`${stripId}-${phrase}-${index}`} className="announcement-marquee-item">
          <span className="announcement-marquee-phrase">{phrase}</span>
          <span className="announcement-marquee-dot" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </span>
  );
}

export function AnnouncementBar() {
  const [items, setItems] = useState<string[]>([...siteConfig.announcementMarquee]);

  useEffect(() => {
    fetch("/api/announcement")
      .then((r) => r.json())
      .then((d) => {
        if (!d.announcement || typeof d.announcement !== "string") return;

        const custom = parseAnnouncementPhrases(d.announcement);
        if (!custom.length) return;

        setItems(mergePhrases(custom, siteConfig.announcementMarquee));
      })
      .catch(() => undefined);
  }, []);

  const readableLabel = useMemo(
    () => [...items.map((item) => item.toUpperCase()), "BOOK NOW"].join(" · "),
    [items]
  );

  return (
    <div className="announcement-marquee">
      <div className="announcement-marquee-viewport" aria-label={readableLabel}>
        <div className="announcement-marquee-track">
          <MarqueeStrip items={items} stripId="a" />
          <MarqueeStrip items={items} stripId="b" />
        </div>
      </div>
      <Link href="/consultation" className="announcement-marquee-skip">
        Book free consultation
      </Link>
    </div>
  );
}
