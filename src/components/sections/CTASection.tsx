"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { primaryChatUrl } from "@/lib/utils";
import Magnet from "@/components/bits/Magnet";
import { GsapReveal } from "@/components/effects/GsapReveal";

export function CTASection() {
  return (
    <section
      aria-labelledby="start-heading"
      className="section-band-blush relative overflow-hidden border-b border-[var(--border)]"
    >
      <div className="container-site relative flex min-h-[auto] flex-col justify-center px-4 py-14 sm:min-h-[50vh] sm:px-6 sm:py-16 md:min-h-[58vh] md:px-8 md:py-24">
        <GsapReveal>
          <p className="eyebrow">Start here</p>
          <h2
            id="start-heading"
            className="display mt-4 max-w-3xl text-[clamp(2.2rem,8vw,5.5rem)] text-[var(--text)]"
          >
            Book a consult.
            <span className="block text-[var(--text-muted)]">Enroll your plan.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-base">
            Start with a free consultation with {siteConfig.founder}, then join the right
            online or offline program for fat loss, muscle gain, or body recomposition.
          </p>
          <div className="mt-8 flex w-full flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-3">
            <Magnet padding={40} magnetStrength={2.5} wrapperClassName="w-full sm:w-auto">
              <Link
                href="/consultation"
                className="btn btn-primary w-full sm:w-auto"
                data-track="cta-book"
              >
                Book Free Consultation
              </Link>
            </Magnet>
            <Magnet padding={40} magnetStrength={2.5} wrapperClassName="w-full sm:w-auto">
              <Link
                href="/#waitlist-form"
                className="btn btn-secondary w-full sm:w-auto"
                data-track="cta-join"
              >
                Enroll / Join Now
              </Link>
            </Magnet>
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <WhatsAppIcon className="size-4 text-[#25d366]" />
              WhatsApp {siteConfig.phone}
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
