"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trainers } from "@/data/trainers";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/components/analytics/Analytics";
import { bookingSchema } from "@/lib/validations/registration";
import { digitsOnly, zodFieldErrors, scrollToFirstFormIssue } from "@/lib/validations/form-utils";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { FormAlert, FormSuccess } from "@/components/forms/FormAlert";

type SlotDay = { date: string; times: string[] };

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  trainerSlug: string;
  consultationType: string;
  date: string;
  time: string;
  program: string;
  branch: string;
  notes: string;
};

type BookingErrors = Partial<Record<keyof BookingForm, string>>;

export function ConsultationBooking() {
  const params = useSearchParams();
  const [slots, setSlots] = useState<SlotDay[]>([]);
  const [timezoneLabel, setTimezoneLabel] = useState(siteConfig.timezoneLabel);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    trainerSlug: params.get("trainer") ?? trainers[0]?.slug ?? "",
    consultationType: "In person",
    date: "",
    time: "",
    program: "",
    branch: "Salem Studio",
    notes: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    calendarUrl?: string;
    icsUrl?: string;
    meetLink?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots ?? []);
        if (d.timezoneLabel) setTimezoneLabel(d.timezoneLabel);
      })
      .catch(() => undefined);
  }, []);

  const times = slots.find((s) => s.date === form.date)?.times ?? [];

  function setField<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const parsed = bookingSchema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    setErrors(zodFieldErrors(parsed.error));
    scrollToFirstFormIssue();
    return false;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.issues?.length) {
          const msg = data.issues.map((i: { message: string }) => i.message).join(". ");
          throw new Error(msg);
        }
        throw new Error(data.error ?? "Booking failed");
      }
      trackEvent("consultation_booked", { id: data.id });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <FormSuccess
        eyebrow="Confirmed"
        title="Consultation booked"
        className="border-t border-[var(--border)] pt-8"
      >
        <p className="mt-2 text-[var(--text-muted)]">
          Booking ID: <strong className="text-[var(--text)]">{result.id}</strong>
        </p>
        {result.meetLink && (
          <p className="mt-2 text-sm">
            Meet link:{" "}
            <a href={result.meetLink} className="text-[var(--accent)]">
              {result.meetLink}
            </a>
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {result.calendarUrl && (
            <a href={result.calendarUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Add to Google Calendar
            </a>
          )}
          {result.icsUrl && (
            <a href={result.icsUrl} className="btn btn-secondary">
              Download .ics
            </a>
          )}
        </div>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 border-t border-[var(--border)] pt-8" noValidate>
      {error && <FormAlert type="error" title="Booking failed" message={error} />}
      <FormField label="Full name" required error={errors.name} htmlFor="booking-name">
        <input
          id="booking-name"
          className={fieldClassName("input", !!errors.name)}
          autoComplete="name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </FormField>
      <FormField label="Email" required error={errors.email} htmlFor="booking-email">
        <input
          id="booking-email"
          className={fieldClassName("input", !!errors.email)}
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </FormField>
      <FormField label="Phone" required error={errors.phone} htmlFor="booking-phone">
        <input
          id="booking-phone"
          className={fieldClassName("input", !!errors.phone)}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="9876543210"
          value={form.phone}
          onChange={(e) => setField("phone", digitsOnly(e.target.value))}
        />
      </FormField>
      <FormField label="Trainer" required error={errors.trainerSlug} htmlFor="booking-trainer">
        <select
          id="booking-trainer"
          className={fieldClassName("select", !!errors.trainerSlug)}
          value={form.trainerSlug}
          onChange={(e) => setField("trainerSlug", e.target.value)}
        >
          {trainers.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name} — {t.role}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Consultation type" required error={errors.consultationType} htmlFor="booking-type">
        <select
          id="booking-type"
          className={fieldClassName("select", !!errors.consultationType)}
          value={form.consultationType}
          onChange={(e) => setField("consultationType", e.target.value)}
        >
          <option>In person</option>
          <option>Phone call</option>
          <option>Google Meet</option>
          <option>WhatsApp call</option>
        </select>
      </FormField>
      <FormField label="Program interest" htmlFor="booking-program">
        <select
          id="booking-program"
          className="select"
          value={form.program}
          onChange={(e) => setField("program", e.target.value)}
        >
          <option value="">Select…</option>
          {programs.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Date" required error={errors.date} htmlFor="booking-date">
          <select
            id="booking-date"
            className={fieldClassName("select", !!errors.date)}
            value={form.date}
            onChange={(e) => {
              setField("date", e.target.value);
              setField("time", "");
            }}
          >
            <option value="">Select…</option>
            {slots.map((s) => (
              <option key={s.date} value={s.date}>
                {s.date}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label={`Time (${timezoneLabel})`} required error={errors.time} htmlFor="booking-time">
          <select
            id="booking-time"
            className={fieldClassName("select", !!errors.time)}
            value={form.time}
            onChange={(e) => setField("time", e.target.value)}
            disabled={!form.date}
          >
            <option value="">Select…</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Branch" required error={errors.branch} htmlFor="booking-branch">
        <select
          id="booking-branch"
          className={fieldClassName("select", !!errors.branch)}
          value={form.branch}
          onChange={(e) => setField("branch", e.target.value)}
        >
          <option>Salem Studio</option>
          <option>Online</option>
        </select>
      </FormField>
      <FormField label="Notes" error={errors.notes} htmlFor="booking-notes">
        <textarea
          id="booking-notes"
          className={fieldClassName("textarea min-h-24", !!errors.notes)}
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
        />
      </FormField>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Booking…" : "Confirm appointment"}
      </button>
    </form>
  );
}
