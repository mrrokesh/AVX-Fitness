"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FormAlertProps = {
  type: "success" | "error";
  message: string;
  title?: string;
  className?: string;
};

export function FormAlert({ type, message, title, className }: FormAlertProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isSuccess = type === "success";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [message, type]);

  const pulseColor = isSuccess ? "rgba(34, 197, 94, 0.35)" : "rgba(207, 10, 44, 0.35)";

  return (
    <motion.div
      ref={ref}
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: [`0 0 0 0 ${pulseColor}`, `0 0 0 12px rgba(0, 0, 0, 0)`],
      }}
      transition={{
        opacity: { duration: 0.35 },
        y: { type: "spring", stiffness: 400, damping: 28 },
        scale: { type: "spring", stiffness: 400, damping: 28 },
        boxShadow: { duration: 0.9, ease: "easeOut" },
      }}
      className={cn(
        "form-alert mb-5 flex gap-3 border-l-4 px-4 py-3.5 text-sm leading-relaxed",
        isSuccess
          ? "border-[var(--success)] bg-[rgba(34,197,94,0.1)] text-[var(--success)]"
          : "border-[var(--danger)] bg-[rgba(207,10,44,0.08)] text-[var(--danger)]",
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
      ) : (
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
      )}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {title && <p className="font-semibold">{title}</p>}
        <p className={title ? "mt-0.5" : undefined}>{message}</p>
      </motion.div>
    </motion.div>
  );
}

type FormSuccessProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function FormSuccess({ id, eyebrow, title, children, className }: FormSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      id={id}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn("scroll-mt-24", className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
        className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[rgba(34,197,94,0.15)] text-[var(--success)]"
      >
        <CheckCircle2 className="size-7" aria-hidden />
      </motion.div>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="display mt-2 text-[clamp(1.75rem,4vw,2.4rem)] text-[var(--text)]"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
