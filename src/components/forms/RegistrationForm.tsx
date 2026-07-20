"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  waitlistStep1Schema,
  waitlistStep2Schema,
  waitlistStep3Schema,
  waitlistStep4Schema,
  waitlistFormSchema,
  PROFESSION_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  PREVIOUS_PROGRAM_OPTIONS,
  START_TIMING_OPTIONS,
  TIME_SLOT_OPTIONS,
  DAILY_TIME_OPTIONS,
  type WaitlistFormInput,
} from "@/lib/validations/registration";
import { cn, getUtmFromSearch, primaryChatUrl } from "@/lib/utils";
import { trackEvent } from "@/components/analytics/Analytics";
import { digitsOnly, parseOptionalNumber, scrollToFirstFormIssue } from "@/lib/validations/form-utils";
import { FormAlert, FormSuccess } from "@/components/forms/FormAlert";

const STEPS = [
  {
    key: "personal",
    label: "Personal",
    title: "Let's get started",
    sub: "Takes about 2 minutes. No payment at any step.",
  },
  {
    key: "about",
    label: "About you",
    title: "A little more about you",
    sub: "Be honest — this stays private and helps us coach you better.",
  },
  {
    key: "goals",
    label: "Goals",
    title: "Your goals",
    sub: "Tell us what you want to achieve.",
  },
  {
    key: "schedule",
    label: "Consult",
    title: "Book your free consultation",
    sub: "Pick when you want to start and a call slot.",
  },
  {
    key: "review",
    label: "Review",
    title: "Review your details",
    sub: "Looks good? Submit to lock in your free consultation.",
  },
] as const;

const schemas = [
  waitlistStep1Schema,
  waitlistStep2Schema,
  waitlistStep3Schema,
  waitlistStep4Schema,
];

const defaults: WaitlistFormInput = {
  fullName: "",
  countryCode: "+91",
  whatsapp: "",
  email: "",
  age: undefined as unknown as number,
  gender: "Male",
  city: "",
  profession: "",
  currentWeightKg: undefined as unknown as number,
  heightCm: undefined as unknown as number,
  availableTimePerDay: "30–45 min",
  commitmentLevel: 5,
  primaryGoal: "",
  fitnessExperience: "",
  previousProgramsTried: [],
  twelveWeekGoal: "",
  biggestChallenge: "",
  startTiming: "This Month",
  readyToInvest: "Yes",
  preferredDate: "",
  preferredTime: "",
};

type FieldErrors = Partial<Record<keyof WaitlistFormInput, string>>;

export function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WaitlistFormInput>(defaults);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [utm, setUtm] = useState({ utmSource: "", utmMedium: "", utmCampaign: "" });

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  useEffect(() => {
    setUtm(getUtmFromSearch(window.location.search));
    trackEvent("form_start", { form: "waitlist" });
  }, []);

  useEffect(() => {
    trackEvent("form_step", { form: "waitlist", step: STEPS[step].key });
  }, [step]);

  function setField<K extends keyof WaitlistFormInput>(key: K, value: WaitlistFormInput[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function togglePrevious(option: string) {
    const current = data.previousProgramsTried ?? [];
    if (option === "None") {
      setField("previousProgramsTried", ["None"]);
      return;
    }
    const withoutNone = current.filter((x) => x !== "None");
    const next = withoutNone.includes(option)
      ? withoutNone.filter((x) => x !== option)
      : [...withoutNone, option];
    setField("previousProgramsTried", next);
  }

  function validateStep() {
    if (step >= 4) return true;
    const parsed = schemas[step].safeParse(data);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next: FieldErrors = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof WaitlistFormInput;
      next[key] = issue.message;
    });
    setErrors(next);
    scrollToFirstFormIssue();
    return false;
  }

  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 4));
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    setSubmitting(true);
    setFormError(null);
    const parsed = waitlistFormSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof WaitlistFormInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      const firstStep = schemas.findIndex((schema) => !schema.safeParse(data).success);
      setStep(firstStep >= 0 ? firstStep : 0);
      setFormError("Please fix the highlighted fields before submitting.");
      scrollToFirstFormIssue();
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...parsed.data,
        ...utm,
        leadSource: "waitlist-form" as const,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      trackEvent("form_submit", { form: "waitlist", id: json.id });
      setSuccessId(json.id);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (successId) {
    return (
      <FormSuccess
        id="waitlist-form"
        eyebrow="You're on the list"
        title="Waitlist spot reserved"
        className="waitlist-card p-5 sm:p-7 md:p-8"
      >
        <p className="mt-3 text-sm leading-relaxed text-[#7a2436]">
          Your ID is <strong className="text-[#14060a]">{successId}</strong>. Our team will
          reach out on WhatsApp within 24 hours. No payment required.
        </p>
        <a
          href={primaryChatUrl(
            `Hi AVX Fitness, I joined the waitlist. My ID is ${successId}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-6 w-full"
        >
          Message us on WhatsApp
        </a>
      </FormSuccess>
    );
  }

  const current = STEPS[step];

  return (
    <div id="waitlist-form" className="waitlist-card overflow-hidden scroll-mt-24">
      <div className="border-b border-[rgba(207,10,44,0.16)] px-4 pt-5 sm:px-6 sm:pt-6 md:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#7a2436]">
            {current.label}
          </p>
        </div>
        <div className="mt-3 flex gap-1" aria-hidden>
          {STEPS.map((_, i) => (
            <div
              key={STEPS[i].key}
              className={cn(
                "h-1.5 flex-1",
                i < step && "bg-[var(--accent)]",
                i === step && "bg-[var(--accent-hot)]",
                i > step && "bg-[rgba(207,10,44,0.12)]"
              )}
            />
          ))}
        </div>
        <h2 className="mt-5 text-xl font-bold text-[#14060a] sm:text-2xl md:text-[1.75rem]">
          {current.title}
        </h2>
        <p className="mt-1 pb-5 text-sm leading-relaxed text-[#7a2436]">{current.sub}</p>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-7">
        {formError && (
          <FormAlert type="error" title="Could not submit" message={formError} />
        )}

        {step === 0 && (
          <div className="space-y-4">
            <Field label="Full Name" required error={errors.fullName}>
              <input
                className={cn("waitlist-input", errors.fullName && "border-[var(--danger)]")}
                value={data.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                autoComplete="name"
                placeholder="Your full name"
              />
            </Field>
            <Field label="WhatsApp Number" required error={errors.whatsapp}>
              <div className="flex flex-col gap-2 min-[420px]:flex-row">
                <select
                  className="waitlist-input min-[420px]:max-w-[150px]"
                  value={data.countryCode}
                  onChange={(e) => setField("countryCode", e.target.value)}
                >
                  <option value="+91">+91 (India)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <input
                  className={cn("waitlist-input", errors.whatsapp && "border-[var(--danger)]")}
                  inputMode="numeric"
                  placeholder="WhatsApp number (digits only)"
                  value={data.whatsapp}
                  onChange={(e) => setField("whatsapp", digitsOnly(e.target.value))}
                />
              </div>
            </Field>
            <Field label="Email" required error={errors.email}>
              <input
                className={cn("waitlist-input", errors.email && "border-[var(--danger)]")}
                type="email"
                value={data.email}
                onChange={(e) => setField("email", e.target.value)}
                autoComplete="email"
                placeholder="you@email.com"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Age" required error={errors.age}>
                <input
                  className={cn("waitlist-input", errors.age && "border-[var(--danger)]")}
                  type="number"
                  min={13}
                  max={100}
                  placeholder="e.g. 25"
                  value={data.age ?? ""}
                  onChange={(e) =>
                    setField("age", parseOptionalNumber(e.target.value) as WaitlistFormInput["age"])
                  }
                />
              </Field>
              <Field label="Gender" required error={errors.gender}>
                <select
                  className="waitlist-input"
                  value={data.gender}
                  onChange={(e) =>
                    setField("gender", e.target.value as WaitlistFormInput["gender"])
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Field label="City / Location" required error={errors.city}>
              <input
                className={cn("waitlist-input", errors.city && "border-[var(--danger)]")}
                placeholder="e.g. Salem, Hyderabad, Dubai"
                value={data.city}
                onChange={(e) => setField("city", e.target.value)}
              />
            </Field>
            <Field label="Profession" required error={errors.profession}>
              <select
                className={cn("waitlist-input", errors.profession && "border-[var(--danger)]")}
                value={data.profession}
                onChange={(e) => setField("profession", e.target.value)}
              >
                <option value="">Select Profession</option>
                {PROFESSION_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current Weight (kg)" required error={errors.currentWeightKg}>
                <input
                  className={cn("waitlist-input", errors.currentWeightKg && "border-[var(--danger)]")}
                  type="number"
                  min={30}
                  max={300}
                  placeholder="e.g. 85"
                  value={data.currentWeightKg ?? ""}
                  onChange={(e) =>
                    setField(
                      "currentWeightKg",
                      parseOptionalNumber(e.target.value) as WaitlistFormInput["currentWeightKg"]
                    )
                  }
                />
              </Field>
              <Field label="Height (cm)" required error={errors.heightCm}>
                <input
                  className={cn("waitlist-input", errors.heightCm && "border-[var(--danger)]")}
                  type="number"
                  min={100}
                  max={250}
                  placeholder="e.g. 170"
                  value={data.heightCm ?? ""}
                  onChange={(e) =>
                    setField(
                      "heightCm",
                      parseOptionalNumber(e.target.value) as WaitlistFormInput["heightCm"]
                    )
                  }
                />
              </Field>
            </div>
            <Field
              label="Daily time available for fitness"
              required
              error={errors.availableTimePerDay}
            >
              <select
                className="waitlist-input"
                value={data.availableTimePerDay}
                onChange={(e) =>
                  setField(
                    "availableTimePerDay",
                    e.target.value as WaitlistFormInput["availableTimePerDay"]
                  )
                }
              >
                {DAILY_TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <div>
              <p className="waitlist-label">
                How serious are you about changing your body?{" "}
                <span className="text-[var(--accent)]">*</span>
              </p>
              <div className="mt-2 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={cn(
                      "flex h-10 items-center justify-center text-sm font-semibold transition",
                      data.commitmentLevel === n
                        ? "bg-[var(--accent)] text-white"
                        : "border border-[rgba(207,10,44,0.22)] bg-white text-[#2a0e16] hover:border-[var(--accent)]"
                    )}
                    onClick={() => setField("commitmentLevel", n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-[#7a2436]">
                <span>Not serious</span>
                <span>100% committed</span>
              </div>
              {errors.commitmentLevel && (
                <p className="mt-1 text-xs text-[var(--danger)]">{errors.commitmentLevel}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <ChipGroup
              label="Primary Goal"
              required
              error={errors.primaryGoal}
              options={[...PRIMARY_GOAL_OPTIONS]}
              value={data.primaryGoal}
              onChange={(v) => setField("primaryGoal", v)}
            />
            <ChipGroup
              label="Experience with fitness programs"
              required
              error={errors.fitnessExperience}
              options={[...EXPERIENCE_OPTIONS]}
              value={data.fitnessExperience}
              onChange={(v) => setField("fitnessExperience", v)}
            />
            <div>
              <p className="waitlist-label">
                Previous programs tried{" "}
                <span className="font-normal normal-case tracking-normal text-[#7a2436]">
                  (select all)
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PREVIOUS_PROGRAM_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    active={(data.previousProgramsTried ?? []).includes(opt)}
                    onClick={() => togglePrevious(opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>
            <Field label="Your 12-week goal" required error={errors.twelveWeekGoal}>
              <input
                className={cn("waitlist-input", errors.twelveWeekGoal && "border-[var(--danger)]")}
                placeholder="e.g. Lose 10 kg before my cousin's wedding"
                value={data.twelveWeekGoal}
                onChange={(e) => setField("twelveWeekGoal", e.target.value)}
              />
            </Field>
            <Field label="Biggest challenge so far" required error={errors.biggestChallenge}>
              <textarea
                className={cn("waitlist-input min-h-24", errors.biggestChallenge && "border-[var(--danger)]")}
                placeholder="e.g. No time after work, love rice and can't give it up..."
                value={data.biggestChallenge}
                onChange={(e) => setField("biggestChallenge", e.target.value)}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <ChipGroup
              label="When do you want to start?"
              required
              error={errors.startTiming}
              options={[...START_TIMING_OPTIONS]}
              value={data.startTiming}
              onChange={(v) =>
                setField("startTiming", v as WaitlistFormInput["startTiming"])
              }
            />
            <ChipGroup
              label="Ready to invest in coaching for at least 3 months?"
              required
              error={errors.readyToInvest}
              options={["Yes", "No"]}
              value={data.readyToInvest}
              onChange={(v) =>
                setField("readyToInvest", v as WaitlistFormInput["readyToInvest"])
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred Call Date" required error={errors.preferredDate}>
                <input
                  className={cn("waitlist-input", errors.preferredDate && "border-[var(--danger)]")}
                  type="date"
                  min={minDate}
                  value={data.preferredDate}
                  onChange={(e) => setField("preferredDate", e.target.value)}
                />
              </Field>
              <Field label="Preferred Time" required error={errors.preferredTime}>
                <select
                  className={cn("waitlist-input", errors.preferredTime && "border-[var(--danger)]")}
                  value={data.preferredTime}
                  onChange={(e) => setField("preferredTime", e.target.value)}
                >
                  <option value="">Select</option>
                  {TIME_SLOT_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-0 overflow-hidden border border-[rgba(207,10,44,0.16)]">
            {(
              [
                ["Name", data.fullName],
                ["Country Code", data.countryCode],
                ["Mobile", data.whatsapp],
                ["Email", data.email],
                ["City", data.city],
                ["Age", String(data.age)],
                ["Gender", data.gender],
                ["Profession", data.profession],
                ["Weight (kg)", String(data.currentWeightKg)],
                ["Height (cm)", String(data.heightCm)],
                ["Daily Time", data.availableTimePerDay],
                ["Commitment (1-10)", String(data.commitmentLevel)],
                ["Goal", data.primaryGoal],
                ["Experience", data.fitnessExperience],
                ["Previous Programs", (data.previousProgramsTried ?? []).join(", ") || "—"],
                ["12-Week Goal", data.twelveWeekGoal],
                ["Main Challenge", data.biggestChallenge],
                ["Start Date", data.startTiming],
                ["Ready to Invest", data.readyToInvest],
                ["Preferred Date", data.preferredDate],
                ["Preferred Time", data.preferredTime],
              ] as [string, string][]
            ).map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col gap-0.5 px-3 py-3 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-4",
                  i % 2 === 0 ? "bg-[rgba(207,10,44,0.04)]" : "bg-white"
                )}
              >
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#7a2436]">
                  {label}
                </span>
                <span className="break-words font-semibold text-[#14060a] sm:max-w-[60%] sm:text-right">
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
          {step > 0 && (
            <button
              type="button"
              className="btn btn-secondary w-full sm:w-auto"
              onClick={back}
              disabled={submitting}
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="btn btn-primary w-full sm:ml-auto sm:min-w-[10rem] sm:w-auto"
              onClick={next}
            >
              {step === 3 ? "Review" : "Next"}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-full sm:ml-auto sm:w-auto"
              onClick={() => void submit()}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Join the waitlist (free)"}
            </button>
          )}
        </div>
        {step === 4 && (
          <p className="mt-3 text-center text-xs text-[#7a2436]">
            No payment. Our team reaches out on WhatsApp within 24 hours.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="waitlist-label">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      <div className="mt-1.5" data-invalid={error ? "true" : undefined}>
        {children}
      </div>
      {error && <span className="mt-1 block text-xs text-[var(--danger)]">{error}</span>}
    </label>
  );
}

function ChipGroup({
  label,
  required,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div data-invalid={error ? "true" : undefined}>
      <p className="waitlist-label">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip key={opt} active={value === opt} onClick={() => onChange(opt)}>
            {opt}
          </Chip>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-2 text-left text-sm font-medium transition sm:px-3.5",
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
          : "border-[rgba(207,10,44,0.22)] bg-white text-[#2a0e16] hover:border-[var(--accent)]"
      )}
    >
      {children}
    </button>
  );
}
