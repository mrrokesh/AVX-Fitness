"use client";

import { GraduationCap } from "lucide-react";
import CountUp from "@/components/bits/CountUp";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { siteConfig } from "@/data/site";

type CoachCertListProps = {
  certifications: string[];
};

export function CoachCertList({ certifications }: CoachCertListProps) {
  return (
    <ul className="flex w-full max-w-[380px] flex-col gap-2.5">
      {certifications.map((cert) => (
        <li
          key={cert}
          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text)]"
        >
          <GraduationCap
            className="size-4 shrink-0 text-[var(--accent)]"
            aria-hidden
          />
          {cert}
        </li>
      ))}
      <li className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text)]">
        <GraduationCap
          className="size-4 shrink-0 text-[var(--accent)]"
          aria-hidden
        />
        <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 tabular-nums">
          <span className="inline-flex items-baseline">
            <CountUp
              from={100}
              to={siteConfig.membersTrained}
              duration={2.8}
              delay={0.4}
            />
            <span>+</span>
          </span>
          <span>Clients Coached</span>
        </span>
      </li>
      <li className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text)]">
        <InstagramIcon
          variant="outline"
          className="size-4 shrink-0 text-[var(--accent)]"
        />
        <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 tabular-nums">
          <span className="inline-flex items-baseline">
            <CountUp from={100000} to={150000} duration={2.8} delay={0.4} />
            <span>+</span>
          </span>
          <span>followers</span>
        </span>
      </li>
    </ul>
  );
}
