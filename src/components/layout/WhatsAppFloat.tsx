"use client";

import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { siteConfig } from "@/data/site";
import { primaryChatUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  const whatsappHref = primaryChatUrl();
  const instagramHref = siteConfig.instagramDmUrl || siteConfig.instagramUrl;

  return (
    <div className="fixed bottom-24 right-3 z-40 flex flex-col gap-3 md:bottom-6 md:right-4">
      <a
        href={instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_10px_28px_rgba(221,42,123,0.45)] transition hover:scale-105 sm:size-14"
        aria-label={`Message ${siteConfig.name} on Instagram ${siteConfig.instagram}`}
        data-track="instagram-float"
        title={`Instagram ${siteConfig.instagram}`}
      >
        <InstagramIcon className="size-6 sm:size-7" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.4)] transition hover:scale-105 sm:size-14"
        aria-label={`Chat on WhatsApp ${siteConfig.phoneDisplay}`}
        data-track="whatsapp-float"
        title={`WhatsApp ${siteConfig.phoneDisplay}`}
      >
        <MessageCircle className="size-6 sm:size-7" />
      </a>
    </div>
  );
}
