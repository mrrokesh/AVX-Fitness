import type { ZodError } from "zod";

/** Map first Zod issue per field to a flat error record */
export function zodFieldErrors<T extends string>(error: ZodError): Partial<Record<T, string>> {
  const out: Partial<Record<T, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as T;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Parse numeric input — returns undefined when empty or invalid */
export function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : undefined;
}

/** Strip non-digits from phone inputs */
export function digitsOnly(value: string, maxLength = 15): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

/** Scroll to the first invalid field or alert after validation */
export function scrollToFirstFormIssue() {
  requestAnimationFrame(() => {
    const target =
      document.querySelector('[data-invalid="true"]') ??
      document.querySelector('[role="alert"]') ??
      document.querySelector('[role="status"]');
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
