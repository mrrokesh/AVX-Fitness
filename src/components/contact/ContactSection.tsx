"use client";

import { useState, type ReactNode } from "react";
import { Clock3, Send, UserRound } from "lucide-react";
import {
  ContactIconBadge,
  type ContactIconKind,
} from "@/components/icons/ContactIconBadge";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { siteConfig } from "@/data/site";
import { primaryChatUrl, telUrl } from "@/lib/utils";
import { StudioMap } from "@/components/sections/StudioMap";
import { contactSchema } from "@/lib/validations/registration";
import { zodFieldErrors, scrollToFirstFormIssue } from "@/lib/validations/form-utils";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { FormAlert } from "@/components/forms/FormAlert";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

export function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const parsed = contactSchema.safeParse(form);
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
    setStatus(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setStatus({ type: "ok", text: "Message sent. We'll reply soon." });
      setForm({ name: "", email: "", phone: "", message: "", privacyAccepted: false });
      setErrors({});
    } catch (err) {
      setStatus({
        type: "err",
        text: err instanceof Error ? err.message : "Something went wrong. Try WhatsApp instead.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <div>
        <p className="eyebrow">Reach us</p>
        <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] text-[var(--text)]">
          Visit, call, or message
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--text-muted)]">
          Prefer a quick reply? WhatsApp and Instagram DM are usually fastest. Use the form for
          longer questions — we read every message.
        </p>

        <ul className="mt-8 space-y-0 border-t border-[var(--border)]">
          <InfoRow kind="location" label="Studio">
            <p className="font-medium text-[var(--text)]">{siteConfig.legalName}</p>
            <p>{siteConfig.address}</p>
            <p className="mt-1 text-sm">{siteConfig.parkingInfo}</p>
          </InfoRow>
          <InfoRow kind="phone" label="Phone / WhatsApp">
            <a href={telUrl(siteConfig.phone)} data-track="phone-click" className="font-medium text-[var(--accent)]">
              {siteConfig.phoneDisplay}
            </a>
            <span className="mx-2 text-[var(--text-muted)]">·</span>
            <a
              href={primaryChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)]"
            >
              <WhatsAppIcon className="size-3.5" />
              Chat on WhatsApp
            </a>
          </InfoRow>
          <InfoRow kind="instagram" label="Instagram">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)]"
              data-track="instagram-contact"
            >
              {siteConfig.instagram}
            </a>
          </InfoRow>
          <InfoRow icon={<UserRound className="size-4" />} label="Founder">
            <a
              href={siteConfig.founderInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)]"
            >
              {siteConfig.founder} ({siteConfig.founderInstagram})
            </a>
          </InfoRow>
          <InfoRow icon={<Clock3 className="size-4" />} label="Hours">
            <p>{siteConfig.businessHours}</p>
          </InfoRow>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={primaryChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
            data-track="whatsapp-contact"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp now
          </a>
          <a
            href={siteConfig.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center gap-2"
            data-track="instagram-dm-contact"
          >
            <InstagramIcon variant="brand" className="size-4" />
            DM on Instagram
          </a>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost inline-flex items-center gap-2"
          >
            <LocationIcon className="size-4 text-[var(--accent-hot)]" />
            Directions
          </a>
        </div>

        <StudioMap className="mt-8" minHeightClassName="min-h-[280px] sm:min-h-[320px]" />
      </div>

      <form
        onSubmit={submit}
        className="border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8"
        noValidate
      >
        <p className="eyebrow">Message</p>
        <h2 className="display mt-3 text-[clamp(2rem,3.5vw,2.8rem)] text-[var(--text)]">
          Send a note
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          Tell us your goal, preferred schedule, or any membership questions.
        </p>

        {status && (
          <FormAlert
            type={status.type === "ok" ? "success" : "error"}
            title={status.type === "ok" ? "Message sent" : "Could not send"}
            message={status.text}
            className="mt-5"
          />
        )}

        <div className="mt-6 space-y-5">
          <FormField label="Name" required error={errors.name} htmlFor="contact-name">
            <input
              id="contact-name"
              className={fieldClassName("input", !!errors.name)}
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </FormField>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Email" required error={errors.email} htmlFor="contact-email">
              <input
                id="contact-email"
                className={fieldClassName("input", !!errors.email)}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </FormField>
            <FormField label="Phone" required error={errors.phone} htmlFor="contact-phone">
              <input
                id="contact-phone"
                className={fieldClassName("input", !!errors.phone)}
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Message" required error={errors.message} htmlFor="contact-message">
            <textarea
              id="contact-message"
              className={fieldClassName("textarea min-h-36", !!errors.message)}
              name="message"
              placeholder="I'm interested in fat loss coaching / offline sessions / membership…"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
            />
          </FormField>
          <div>
            <label className="flex items-start gap-3 text-sm leading-snug text-[var(--text-muted)]">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[var(--accent)]"
                checked={form.privacyAccepted}
                onChange={(e) => setField("privacyAccepted", e.target.checked)}
              />
              <span>
                I agree to the privacy policy and consent to being contacted about my enquiry.{" "}
                <span className="text-[var(--accent)]">*</span>
              </span>
            </label>
            {errors.privacyAccepted && (
              <p className="mt-1 text-xs text-[var(--danger)]" role="alert">
                {errors.privacyAccepted}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full !py-4" disabled={loading}>
            <Send className="size-4" />
            {loading ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InfoRow({
  kind,
  icon,
  label,
  children,
}: {
  kind?: ContactIconKind;
  icon?: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 border-b border-[var(--border)] py-5">
      {kind ? (
        <ContactIconBadge kind={kind} />
      ) : (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--accent)]">
          {icon}
        </span>
      )}
      <div className="min-w-0 text-sm leading-relaxed text-[var(--text-muted)]">
        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {label}
        </p>
        {children}
      </div>
    </li>
  );
}
