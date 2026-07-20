import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormField({
  label,
  required,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)} htmlFor={htmlFor}>
      <span className="label">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      <div className="mt-1.5" data-invalid={error ? "true" : undefined}>
        {children}
      </div>
      {error && (
        <span className="mt-1 block text-xs text-[var(--danger)]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export function fieldClassName(base: string, hasError?: boolean) {
  return cn(base, hasError && "border-[var(--danger)] ring-1 ring-[var(--danger)]/30");
}

/** @deprecated use fieldClassName */
export function inputClassName(hasError?: boolean, base = "input") {
  return fieldClassName(base, hasError);
}
