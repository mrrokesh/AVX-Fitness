"use client";

import CountUp from "@/components/bits/CountUp";
import { siteConfig } from "@/data/site";
import { GsapReveal } from "@/components/effects/GsapReveal";

const stats = [
  {
    id: "clients",
    label: "Clients coached",
    render: (
      <>
        <span className="inline-flex items-baseline">
          <CountUp
            from={100}
            to={siteConfig.membersTrained}
            duration={2.2}
            delay={0.3}
            className="tabular-nums"
          />
          <span aria-hidden>+</span>
        </span>
      </>
    ),
    accent: true,
  },
  {
    id: "ig",
    label: "Instagram followers",
    render: (
      <>
        <span className="inline-flex items-baseline">
          <CountUp
            from={100000}
            to={196000}
            duration={2.8}
            delay={0.4}
            className="tabular-nums"
          />
          <span aria-hidden>+</span>
        </span>
      </>
    ),
    accent: true,
  },
  {
    id: "support",
    label: "Coaching support",
    render: <span className="tabular-nums">24/7</span>,
    accent: false,
  },
  {
    id: "plans",
    label: "Day focus plans",
    render: (
      <>
        <CountUp to={90} duration={1.8} className="tabular-nums" />
        <span aria-hidden>+</span>
      </>
    ),
    accent: false,
  },
] as const;

export function StatsStrip() {
  return (
    <GsapReveal>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
        {stats.map((stat, i) => (
          <li
            key={stat.id}
            className="min-w-0 border-t border-[var(--border)] pt-5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p
              className={`display flex flex-wrap items-baseline gap-0.5 text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-tight ${
                stat.accent ? "text-[var(--accent)]" : "text-[var(--text)]"
              }`}
            >
              {stat.render}
            </p>
            <p className="mt-3 max-w-[12rem] text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.14em] text-[var(--text-muted)]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </GsapReveal>
  );
}
