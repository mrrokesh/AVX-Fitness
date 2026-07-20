"use client";

import Image from "next/image";
import Link from "next/link";
import { footerExtraLinks, navLinks, siteConfig } from "@/data/site";
import { telUrl, primaryChatUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-ink)] text-[var(--on-ink)]">
      <div className="container-site grid gap-10 px-4 py-12 pb-24 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 md:px-8 md:pb-16 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
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
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-[var(--on-ink-soft)]">
            {siteConfig.bio}
          </p>
        </div>

        <div>
          <h2 className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--on-ink-faint)]">
            Pages
          </h2>
          <ul className="space-y-3 text-sm text-[var(--on-ink-soft)]">
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
          <ul className="space-y-3 text-sm text-[var(--on-ink-soft)]">
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
          <ul className="space-y-3 text-sm text-[var(--on-ink-soft)]">
            <li>{siteConfig.address}</li>
            <li>
              <a href={telUrl(siteConfig.phone)} className="hover:text-[var(--on-ink)]">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={primaryChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--on-ink)]"
              >
                WhatsApp {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--on-ink)]"
              >
                Instagram {siteConfig.instagram}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
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
        <div className="container-site flex flex-col gap-3 text-xs text-[var(--on-ink-faint)] sm:flex-row sm:items-center sm:justify-between">
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
