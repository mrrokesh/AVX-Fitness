"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
function isActive(pathname: string, href: string) {
  const cleanHref = href.split("#")[0] || "/";
  if (cleanHref === "/") return pathname === "/";
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        open
          ? "fixed inset-x-0 top-0 lg:sticky lg:inset-x-auto"
          : "sticky top-0",
        scrolled || open
          ? "border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
          : "border-b border-transparent bg-[var(--bg)]/70 backdrop-blur-md"
      )}
    >
      <div className="container-site flex items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-8 lg:py-3.5">
        <Link
          href="/"
          className="relative z-10 flex min-w-0 max-w-[55%] shrink items-center gap-2 sm:max-w-none sm:gap-2.5"
          aria-label={siteConfig.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={44}
            height={44}
            className="size-9 shrink-0 object-contain sm:size-10 lg:size-11"
            priority
          />
          <span className="display truncate text-[1.25rem] tracking-tight text-[var(--text)] sm:text-[1.5rem] lg:text-[1.65rem]">
            {siteConfig.shortName}
          </span>
        </Link>

        {/* Desktop / large tablet nav — only from lg up */}
        <nav
          className="hidden items-center gap-3 lg:flex xl:gap-5"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap pb-1 text-[0.9rem] font-medium tracking-tight text-[var(--text-muted)] transition hover:text-[var(--text)] xl:text-[0.95rem]",
                  active && "font-semibold text-[var(--text)]"
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-[var(--accent)] transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Link
            href="/consultation"
            className="btn-book !px-3 !py-2 text-[0.68rem] sm:!px-4 sm:!py-2.5 sm:text-[0.78rem]"
            data-track="nav-book"
            aria-label="Book a free consultation"
          >
            <CalendarDays className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            <span className="hidden min-[400px]:inline sm:hidden">Book</span>
            <span className="hidden sm:inline">Book Free Consult</span>
          </Link>

          {/* Hamburger: phones & small tablets only — never on lg+ */}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-[var(--text)] transition hover:text-[var(--accent)] lg:!hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <ThemeToggle className="size-10 text-[var(--text-muted)] hover:text-[var(--accent)]" />
        </div>
      </div>

      {/* Mobile drawer — lg+ never shows (desktop uses link nav) */}
      <div
        id="mobile-menu"
        className={cn(
          "border-t border-[var(--border)] bg-[var(--bg)] lg:!hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav
          className="flex max-h-[min(calc(100svh-4.5rem),720px)] flex-col overflow-y-auto px-4 py-2 pb-6"
          aria-label="Mobile"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b border-[var(--border)] py-3.5 text-base font-medium tracking-tight text-[var(--text-muted)] active:text-[var(--accent)]",
                  active && "font-semibold text-[var(--text)]"
                )}
              >
                <span
                  className={cn(
                    "inline-block pb-0.5",
                    active && "border-b-2 border-[var(--accent)]"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/consultation"
            className="btn-book mt-5 w-full !py-3.5"
            data-track="nav-book-mobile"
          >
            <CalendarDays className="size-4" aria-hidden />
            Book Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
