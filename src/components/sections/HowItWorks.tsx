"use client";

import { motion } from "framer-motion";
import { howItWorks } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks/performance";

export function HowItWorks() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="section-pad container-site">
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[var(--accent-hot)]">
        How it works
      </p>
      <h2 className="display mb-10 text-4xl text-white sm:text-5xl">
        Four steps to a clearer plan
      </h2>
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, i) => (
          <motion.li
            key={step.step}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08 }}
            className="glass relative rounded-2xl p-5"
          >
            <span className="display text-5xl text-[var(--accent)]/40">{step.step}</span>
            <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
