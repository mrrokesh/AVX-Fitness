"use client";

import { useState } from "react";
import { faqs } from "@/data/content";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection({
  limit,
  hideHeading = false,
}: {
  limit?: number;
  hideHeading?: boolean;
}) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad container-site">
      {!hideHeading ? (
        <>
          <p className="eyebrow">FAQ</p>
          <h2 className="display mt-3 mb-12 text-[clamp(2.4rem,5vw,4rem)] text-[var(--text)]">
            Common questions
          </h2>
        </>
      ) : null}
      <div className="mx-auto max-w-3xl border-t border-[var(--border)]">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.question} className="border-b border-[var(--border)]">
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-base font-medium text-[var(--text)] md:text-lg">
                    {f.question}
                  </span>
                  {isOpen ? (
                    <Minus className="size-5 shrink-0 text-[var(--accent)]" />
                  ) : (
                    <Plus className="size-5 shrink-0 text-[var(--text-muted)]" />
                  )}
                </button>
              </h3>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                    {f.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
