"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BadgeCheck, CalendarCheck, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn, primaryChatUrl } from "@/lib/utils";

const stats = [
  {
    value: `${siteConfig.membersTrained}+`,
    label: "Clients coached",
    variant: "featured" as const,
  },
  { value: "20 min", label: "Daily focus", variant: "default" as const },
  { value: "4.9★", label: "Client rating", variant: "rating" as const },
  { value: "24 hrs", label: "Team response", variant: "speed" as const },
];

const trustItems = [
  { text: "Free consultation", icon: CalendarCheck },
  { text: "No payment now", icon: BadgeCheck },
  { text: "Reply within 24 hrs", icon: MessageCircle },
];

export function WaitlistSupportContent({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) return;

    const root = rootRef.current;
    if (!root) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "waitlist-support",
        visible && "waitlist-support--visible",
        animated && "waitlist-support--animated",
        className
      )}
    >
      <p className="waitlist-support-label">
        <Sparkles className="size-3.5" aria-hidden />
        At a glance
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "waitlist-stat px-3 py-2.5",
              stat.variant !== "default" && `waitlist-stat--${stat.variant}`,
              animated && "waitlist-stat--animate"
            )}
            style={animated ? { animationDelay: `${120 + index * 90}ms` } : undefined}
          >
            <p className="waitlist-stat-value">{stat.value}</p>
            <p className="waitlist-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={item.text}
              className={cn(
                "waitlist-trust-pill flex items-center gap-2 px-3 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em]",
                animated && "waitlist-trust-pill--animate"
              )}
              style={animated ? { animationDelay: `${520 + index * 100}ms` } : undefined}
            >
              <Icon className="size-3.5 shrink-0 text-[var(--waitlist-gold)]" aria-hidden />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>

      <div
        className={cn(
          "waitlist-actions mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start",
          animated && "waitlist-actions--animate"
        )}
        style={animated ? { animationDelay: "820ms" } : undefined}
      >
        <a
          href={primaryChatUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary waitlist-btn-whatsapp"
        >
          WhatsApp now
        </a>
        <Link href="/transformations" className="btn btn-on-dark-outline waitlist-btn-secondary">
          See results
        </Link>
        <Link href="/consultation" className="btn btn-on-dark-outline waitlist-btn-gold">
          Book free call
        </Link>
      </div>
    </div>
  );
}
