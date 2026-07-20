"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { ContactIconBadge } from "@/components/icons/ContactIconBadge";
import { siteConfig } from "@/data/site";
import { primaryChatUrl, telUrl } from "@/lib/utils";

export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/registration")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg-elevated)]/95 p-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {siteConfig.phone ? (
          <a
            href={telUrl(siteConfig.phone)}
            className="btn btn-ghost !inline-flex !items-center !justify-center !gap-2 !rounded-[var(--radius)] !py-3 text-xs"
            data-track="phone-click"
          >
            <ContactIconBadge kind="phone" size="sm" />
            Call
          </a>
        ) : (
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost !inline-flex !items-center !justify-center !gap-2 !rounded-[var(--radius)] !py-3 text-xs"
            data-track="instagram-profile-mobile"
          >
            <ContactIconBadge kind="instagram" size="sm" />
            Instagram
          </a>
        )}
        <a
          href={primaryChatUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !inline-flex !items-center !justify-center !gap-2 !rounded-[var(--radius)] !py-3 text-xs"
          data-track="whatsapp-mobile-bar"
        >
          <ContactIconBadge kind="whatsapp" size="sm" />
          Chat
        </a>
        <Link
          href="/consultation"
          className="btn btn-primary !inline-flex !items-center !justify-center !gap-2 !rounded-[var(--radius)] !py-3 text-xs"
          data-track="book-mobile-bar"
        >
          <CalendarDays className="size-4" />
          Book
        </Link>
      </div>
    </div>
  );
}
