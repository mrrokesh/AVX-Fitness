"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { footerExtraLinks, navLinks, siteConfig } from "@/data/site";
import { cn, telUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="footer-minimal border-t border-[var(--border)] bg-[var(--bg-ink)] text-[var(--on-ink)]">
      <div className="container-site footer-minimal__inner px-4 pb-24 pt-12 sm:px-6 sm:pb-20 sm:pt-14 md:px-8 md:pb-16">
        <Link href="/" className="footer-minimal__brand">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={40}
            height={40}
            className="size-10 object-contain"
          />
          <span className="footer-minimal__brand-text">
            <span className="display block text-[1.35rem] leading-none text-[var(--on-ink)] sm:text-[1.5rem]">
              {siteConfig.shortName}
            </span>
            <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-hot)]">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="footer-minimal__nav" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer-minimal__nav-link">
              {link.label}
            </Link>
          ))}
          {footerExtraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("footer-minimal__nav-link", "max-md:hidden")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-minimal__contact">
          <a
            href={telUrl(siteConfig.phone)}
            className="footer-minimal__contact-item"
            data-track="phone-click"
          >
            <PhoneIcon className="footer-minimal__contact-icon" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-minimal__contact-item"
          >
            <LocationIcon className="footer-minimal__contact-icon" />
            <span>
              {siteConfig.city}, {siteConfig.state}
            </span>
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-minimal__contact-item"
            data-track="instagram-footer"
          >
            <InstagramIcon variant="brand" className="footer-minimal__contact-icon footer-minimal__contact-icon--ig" />
            <span>{siteConfig.instagram.replace(/^@/, "")}</span>
          </a>
        </div>

        <div className="footer-minimal__divider" aria-hidden />

        <p className="footer-minimal__copy">
          © {new Date().getFullYear()} {siteConfig.legalName}, {siteConfig.city}. All rights
          reserved.
        </p>

        <div className="footer-minimal__legal">
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden>·</span>
          <Link href="/terms">Terms</Link>
          <span aria-hidden>·</span>
          <Link href="/cancellation">Cancellation</Link>
        </div>
      </div>
    </footer>
  );
}
