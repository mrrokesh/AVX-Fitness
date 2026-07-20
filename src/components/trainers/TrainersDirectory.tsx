"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trainerFilters, trainers } from "@/data/trainers";
import { cn } from "@/lib/utils";

export function TrainersDirectory() {
  const [filter, setFilter] = useState<string>("all");
  const list = useMemo(
    () =>
      filter === "all"
        ? trainers
        : trainers.filter((t) => t.filters.includes(filter)),
    [filter]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Trainer filters">
        <button
          type="button"
          className={cn(
            "border-b-2 pb-1 text-xs font-semibold uppercase tracking-[0.16em] transition",
            filter === "all"
              ? "border-[var(--accent)] text-[var(--text)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
          )}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {trainerFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={cn(
              "border-b-2 pb-1 text-xs font-semibold uppercase tracking-[0.16em] transition",
              filter === f.id
                ? "border-[var(--accent)] text-[var(--text)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <Link key={t.slug} href={`/trainers/${t.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-ink)]">
              <Image
                src={t.photo}
                alt={`${t.name}, ${t.role}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="pt-5">
              <h2 className="display text-[2.2rem] text-[var(--text)] transition group-hover:text-[var(--accent)]">
                {t.name}
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {t.role}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-[var(--text-muted)]">{t.bio}</p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                {t.specializations.slice(0, 3).join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <p className="text-[var(--text-muted)]">No trainers match this filter yet.</p>
      )}
    </div>
  );
}
