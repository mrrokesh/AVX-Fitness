import { Resend } from "resend";
import { siteConfig } from "@/data/site";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function fromAddress() {
  return process.env.EMAIL_FROM ?? "AVX Fitness <onboarding@resend.dev>";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailShell(options: {
  preheader: string;
  badge: string;
  title: string;
  intro: string;
  rows: Array<[string, string]>;
  footerNote?: string;
}) {
  const rowsHtml = options.rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e8ecf2;width:34%;vertical-align:top;color:#6b7385;font-size:13px;letter-spacing:0.02em">${escapeHtml(label)}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8ecf2;vertical-align:top;color:#0a1a33;font-size:14px;font-weight:600;line-height:1.45">${value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f5f8;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f8;padding:32px 16px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(10,26,51,0.08)">
          <tr>
            <td style="background:linear-gradient(135deg,#0a1a33 0%,#1a237e 100%);padding:28px 32px">
              <p style="margin:0 0 8px;color:#9db0d4;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700">${escapeHtml(siteConfig.name)}</p>
              <p style="margin:0;display:inline-block;background:rgba(255,255,255,0.14);color:#ffffff;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;padding:6px 10px;border-radius:999px">${escapeHtml(options.badge)}</p>
              <h1 style="margin:16px 0 0;color:#ffffff;font-size:24px;line-height:1.3;font-weight:700">${escapeHtml(options.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px">
              <p style="margin:0 0 20px;color:#5b6475;font-size:15px;line-height:1.6">${options.intro}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                ${rowsHtml}
              </table>
              ${
                options.footerNote
                  ? `<p style="margin:24px 0 0;color:#5b6475;font-size:14px;line-height:1.6">${options.footerNote}</p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #eef1f5">
              <p style="margin:0;color:#8a93a8;font-size:12px;line-height:1.5">
                ${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.city)}
                ${siteConfig.founder ? ` · ${escapeHtml(siteConfig.founder)}` : ""}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendConfirmationEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.info("[email] RESEND_API_KEY not set — logging email (dev mode)");
    console.info({ to: options.to, subject: options.subject });
    return { ok: true, mocked: true };
  }

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }

  return { ok: true, mocked: false };
}

export async function notifyAdmin(options: {
  subject: string;
  html: string;
}) {
  const admin = process.env.ADMIN_NOTIFY_EMAIL;
  if (!admin) {
    console.info("[email] ADMIN_NOTIFY_EMAIL not set — skipping admin notify");
    return { ok: false, skipped: true };
  }
  await sendConfirmationEmail({ to: admin, ...options });
  return { ok: true, skipped: false };
}

export function buildLeadAdminEmailHtml(lead: {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  city: string;
  age: number;
  gender: string;
  preferredProgram?: string;
  preferredDate: string;
  preferredTime: string;
  goals: string[];
  additionalMessage?: string;
}) {
  return emailShell({
    preheader: `New waitlist lead from ${lead.fullName}`,
    badge: "New waitlist lead",
    title: "Someone joined the waitlist",
    intro: `Reply on WhatsApp within 24 hours. Lead ID <strong>${escapeHtml(lead.id)}</strong>.`,
    rows: [
      ["Name", escapeHtml(lead.fullName)],
      ["Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#1a237e;text-decoration:none">${escapeHtml(lead.email)}</a>`],
      ["WhatsApp", escapeHtml(`${lead.countryCode} ${lead.whatsapp}`)],
      ["City", escapeHtml(lead.city)],
      ["Age / Gender", escapeHtml(`${lead.age} / ${lead.gender}`)],
      ["Goal / Program", escapeHtml(lead.preferredProgram || lead.goals.join(", ") || "—")],
      ["Preferred call", escapeHtml(`${lead.preferredDate} · ${lead.preferredTime}`)],
      ["Notes", escapeHtml(lead.additionalMessage || "—").replace(/\n/g, "<br/>")],
    ],
  });
}

export function buildLeadVisitorEmailHtml(lead: {
  id: string;
  fullName: string;
  preferredDate: string;
  preferredTime: string;
}) {
  return emailShell({
    preheader: `You're on the ${siteConfig.name} waitlist`,
    badge: "Waitlist confirmed",
    title: `You're on the list, ${lead.fullName.split(" ")[0] || lead.fullName}`,
    intro: `Thanks for joining the <strong>${escapeHtml(siteConfig.name)}</strong> waitlist. No payment is required at this step.`,
    rows: [
      ["Registration ID", escapeHtml(lead.id)],
      ["Preferred consultation", escapeHtml(`${lead.preferredDate} · ${lead.preferredTime}`)],
      ["Timezone", escapeHtml(siteConfig.timezoneLabel)],
    ],
    footerNote: "Our team will reach out on WhatsApp within 24 hours.",
  });
}

export function buildContactAdminEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return emailShell({
    preheader: `Contact message from ${data.name}`,
    badge: "Contact form",
    title: "New website inquiry",
    intro: "A visitor sent a message from the contact form.",
    rows: [
      ["Name", escapeHtml(data.name)],
      ["Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#1a237e;text-decoration:none">${escapeHtml(data.email)}</a>`],
      ["Phone", escapeHtml(data.phone)],
      ["Message", escapeHtml(data.message).replace(/\n/g, "<br/>")],
    ],
  });
}

export function buildContactVisitorEmailHtml(data: { name: string }) {
  return emailShell({
    preheader: `We received your message`,
    badge: "Message received",
    title: `Thanks, ${data.name.split(" ")[0] || data.name}`,
    intro: `We got your message and will reply soon.`,
    rows: [
      ["What happens next", "Our team reviews inquiries daily and will get back to you by email or phone."],
    ],
    footerNote: `— ${escapeHtml(siteConfig.founder || siteConfig.name)}`,
  });
}

export function buildBookingAdminEmailHtml(data: {
  id: string;
  name: string;
  email: string;
  phone: string;
  trainerSlug: string;
  consultationType: string;
  date: string;
  time: string;
  program?: string;
  branch: string;
  notes?: string;
  meetLink?: string;
}) {
  const rows: Array<[string, string]> = [
    ["Booking ID", escapeHtml(data.id)],
    ["Name", escapeHtml(data.name)],
    ["Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#1a237e;text-decoration:none">${escapeHtml(data.email)}</a>`],
    ["Phone", escapeHtml(data.phone)],
    ["Trainer", escapeHtml(data.trainerSlug)],
    ["Mode", escapeHtml(data.consultationType)],
    ["Date & time", escapeHtml(`${data.date} · ${data.time}`)],
    ["Branch", escapeHtml(data.branch)],
    ["Program", escapeHtml(data.program || "—")],
    ["Notes", escapeHtml(data.notes || "—").replace(/\n/g, "<br/>")],
  ];
  if (data.meetLink) {
    rows.push([
      "Meet link",
      `<a href="${escapeHtml(data.meetLink)}" style="color:#1a237e;text-decoration:none">${escapeHtml(data.meetLink)}</a>`,
    ]);
  }
  return emailShell({
    preheader: `New consultation booking — ${data.name}`,
    badge: "New booking",
    title: "Consultation booked",
    intro: "A new consultation was booked on the website.",
    rows,
  });
}

export function buildBookingVisitorEmailHtml(data: {
  id: string;
  name: string;
  date: string;
  time: string;
  branch: string;
  consultationType: string;
  meetLink?: string;
}) {
  const rows: Array<[string, string]> = [
    ["Booking ID", escapeHtml(data.id)],
    ["Date & time", escapeHtml(`${data.date} · ${data.time} (${siteConfig.timezoneLabel})`)],
    ["Mode", escapeHtml(data.consultationType)],
    ["Location", escapeHtml(data.branch)],
  ];
  if (data.meetLink) {
    rows.push([
      "Meet link",
      `<a href="${escapeHtml(data.meetLink)}" style="color:#1a237e;text-decoration:none">${escapeHtml(data.meetLink)}</a>`,
    ]);
  }
  return emailShell({
    preheader: `Your consultation is confirmed`,
    badge: "Booking confirmed",
    title: `You're booked, ${data.name.split(" ")[0] || data.name}`,
    intro: `Your consultation with <strong>${escapeHtml(siteConfig.name)}</strong> is confirmed.`,
    rows,
    footerNote: "If you need to reschedule, reply to this email or message us on WhatsApp.",
  });
}
