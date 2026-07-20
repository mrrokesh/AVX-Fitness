"use client";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
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
        className="contact-float contact-float--instagram"
        aria-label={`Message ${siteConfig.name} on Instagram ${siteConfig.instagram}`}
        data-track="instagram-float"
        title={`Instagram ${siteConfig.instagram}`}
      >
        <InstagramIcon variant="brand" className="size-full" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-float contact-float--whatsapp"
        aria-label={`Chat on WhatsApp ${siteConfig.phoneDisplay}`}
        data-track="whatsapp-float"
        title={`WhatsApp ${siteConfig.phoneDisplay}`}
      >
        <WhatsAppIcon className="size-[1.45rem] sm:size-[1.6rem]" />
      </a>
    </div>
  );
}
