"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactIconBadge, ContactLink } from "@/components/icons/ContactIconBadge";
import { footerExtraLinks, navLinks, siteConfig } from "@/data/site";
import { telUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-ink)] text-[var(--on-ink)]">
      <div className="container-site grid gap-10 px-4 py-12 pb-24 text-center sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 md:px-8 md:pb-16 md:text-left lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center justify-center gap-3 md:justify-start">
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={44}
              height={44}
              className="size-11 object-contain"
            />
            <div>
              <p className="display text-2xl text-[var(--on-ink)]">{siteConfig.shortName}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent-hot)]">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>
          <p className="mx-auto mt-5 max-w-sm text-sm font-light leading-relaxed text-[var(--on-ink-soft)] md:mx-0">
            {siteConfig.bio}
          </p>
        </div>

        <div>
          <h2 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--on-ink-faint)]">
            Pages
          </h2>
          <ul className="mx-auto inline-flex w-fit flex-col space-y-3 text-sm text-[var(--on-ink-soft)] md:mx-0 md:block md:w-full">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-[var(--on-ink)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--on-ink-faint)]">
            More
          </h2>
          <ul className="mx-auto inline-flex w-fit flex-col space-y-3 text-sm text-[var(--on-ink-soft)] md:mx-0 md:block md:w-full">
            {footerExtraLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-[var(--on-ink)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--on-ink-faint)]">
            Contact
          </h2>
          <ul className="mx-auto inline-flex w-fit flex-col space-y-3.5 text-sm text-[var(--on-ink-soft)] md:mx-0 md:block md:w-full">
            <li className="contact-link contact-link--static justify-center md:justify-start">
              <ContactIconBadge kind="location" size="sm" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <ContactLink
                kind="phone"
                href={telUrl(siteConfig.phone)}
                data-track="phone-click"
                className="justify-center md:justify-start"
              >
                {siteConfig.phoneDisplay}
              </ContactLink>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="/consultation" className="btn btn-primary !px-4 !py-2.5 text-[0.7rem]">
              Book Consult
            </Link>
            <Link href="/#waitlist-form" className="btn btn-on-dark-outline !px-4 !py-2.5 text-[0.7rem]">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-5 py-5 md:px-8">
        <div className="container-site flex flex-col items-center gap-3 text-center text-xs text-[var(--on-ink-faint)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-[var(--on-ink)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--on-ink)]">
              Terms
            </Link>
            <Link href="/cancellation" className="hover:text-[var(--on-ink)]">
              Cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
