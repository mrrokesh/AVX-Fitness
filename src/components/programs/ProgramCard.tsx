"use client";

import Link from "next/link";
import type { Program } from "@/data/programs";

export function ProgramCard({
  program,
  index = 0,
}: {
  program: Program;
  index?: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group grid gap-3 border-t border-[var(--border)] py-8 transition md:grid-cols-[4.5rem_1fr_auto] md:items-end md:gap-8"
    >
      <span className="display text-3xl text-[var(--text-muted)] transition group-hover:text-[var(--accent)]">
        {num}
      </span>
      <div>
        <p className="eyebrow !text-[0.65rem]">{program.category}</p>
        <h3 className="display mt-2 text-[clamp(1.8rem,3vw,2.6rem)] text-[var(--text)] transition group-hover:text-[var(--accent)]">
          {program.name}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
          {program.shortDescription}
        </p>
      </div>
      <div className="md:text-right">
        <p className="text-sm font-medium text-[var(--text)]">{program.pricing}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          View program →
        </p>
      </div>
    </Link>
  );
}
