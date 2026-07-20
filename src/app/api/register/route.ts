import { NextRequest, NextResponse } from "next/server";
import {
  registrationSchema,
  waitlistFormSchema,
  waitlistToRegistrationPayload,
} from "@/lib/validations/registration";
import {
  createRegistration,
  logFailure,
  updateRegistration,
} from "@/lib/db/store";
import {
  insertRegistrationPostgres,
  isPostgresReady,
  setRegistrationEmailStatus,
  updateRegistrationPostgres,
} from "@/lib/db/postgres-registrations";
import { appendToGoogleSheet, registrationToSheetRow } from "@/lib/integrations/sheets";
import {
  buildIcs,
  createCalendarEvent,
  googleCalendarAddUrl,
} from "@/lib/integrations/calendar";
import {
  buildLeadAdminEmailHtml,
  buildLeadVisitorEmailHtml,
  notifyAdmin,
  sendConfirmationEmail,
} from "@/lib/integrations/email";
import { siteConfig } from "@/data/site";
import type { RegistrationRecord } from "@/lib/db/store";

const recentSubmissions = new Map<string, number>();

function slotOrTimeToHhMm(value: string) {
  if (/^\d{2}:\d{2}$/.test(value)) return value;
  const start = value.split(" to ")[0]?.trim() ?? value;
  const match = start.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "10:00";
  let hour = Number(match[1]);
  const min = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${min}`;
}

async function persistRegistration(
  data: Omit<
    RegistrationRecord,
    "id" | "createdAt" | "status" | "sheetsSynced" | "calendarSynced"
  >
) {
  if (isPostgresReady()) {
    return insertRegistrationPostgres(data);
  }
  // Fallback only if Postgres is not configured
  return createRegistration(data);
}

async function patchRegistration(id: string, patch: Partial<RegistrationRecord>) {
  if (isPostgresReady()) {
    return (await updateRegistrationPostgres(id, patch)) ?? undefined;
  }
  return (await updateRegistration(id, patch)) ?? undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const waitlistParsed = waitlistFormSchema.safeParse(body);
    const legacyParsed = registrationSchema.safeParse(body);

    let data;
    if (waitlistParsed.success) {
      data = waitlistToRegistrationPayload(waitlistParsed.data);
      data.preferredTime = slotOrTimeToHhMm(waitlistParsed.data.preferredTime);
    } else if (legacyParsed.success) {
      data = legacyParsed.data;
    } else {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: !legacyParsed.success
            ? legacyParsed.error.issues
            : waitlistParsed.error.issues,
        },
        { status: 400 }
      );
    }

    const dedupeKey = `${data.email}:${data.whatsapp}`.toLowerCase();
    const last = recentSubmissions.get(dedupeKey) ?? 0;
    if (Date.now() - last < 60_000) {
      return NextResponse.json(
        { error: "Duplicate submission detected. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    recentSubmissions.set(dedupeKey, Date.now());

    // 1) Local PostgreSQL (primary) — or JSON fallback
    let record = await persistRegistration({
      ...data,
      marketingConsent: data.marketingConsent ?? false,
    });

    const syncStatus = {
      postgres: isPostgresReady(),
      sheets: false,
      email: false,
      errors: [] as string[],
    };

    // 2) Google Sheets
    try {
      await appendToGoogleSheet(registrationToSheetRow(record), "Registrations");
      record =
        (await patchRegistration(record.id, {
          sheetsSynced: true,
          sheetsSyncError: undefined,
        })) ?? record;
      syncStatus.sheets = true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sheets sync failed";
      syncStatus.errors.push(`sheets: ${message}`);
      record =
        (await patchRegistration(record.id, {
          sheetsSynced: false,
          sheetsSyncError: message,
        })) ?? record;
      await logFailure("sheets", record.id, message);
    }

    // 3) Calendar (optional)
    let calendarUrl: string | undefined;
    let icsUrl: string | undefined;

    try {
      const event = await createCalendarEvent({
        summary: `Consultation — ${record.fullName}`,
        description: [
          `Registration ID: ${record.id}`,
          `Program: ${record.preferredProgram ?? "TBD"}`,
          `Mode: ${record.consultationType}`,
          `Branch: ${record.preferredBranch}`,
          `Goals: ${record.goals.join(", ")}`,
          record.additionalMessage ?? "",
        ].join("\n"),
        startDate: record.preferredDate,
        startTime: record.preferredTime,
        attendeeEmail: record.email,
        location: record.preferredBranch,
        createMeet: record.consultationType === "Google Meet",
      });
      record =
        (await patchRegistration(record.id, {
          calendarSynced: true,
          calendarEventId: event.id,
        })) ?? record;
      calendarUrl = googleCalendarAddUrl({
        title: `Consultation — ${siteConfig.name}`,
        details: `Registration ID: ${record.id}`,
        startDate: record.preferredDate,
        startTime: record.preferredTime,
        location: record.preferredBranch,
      });
      const ics = buildIcs({
        title: `Consultation — ${siteConfig.name}`,
        description: `Registration ID: ${record.id}`,
        startDate: record.preferredDate,
        startTime: record.preferredTime,
        location: record.preferredBranch,
      });
      icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Calendar sync failed";
      await patchRegistration(record.id, {
        calendarSynced: false,
        calendarSyncError: message,
      });
      await logFailure("calendar", record.id, message);
    }

    // 4) Resend — admin first, then visitor (Resend free tier may block non-owner visitor emails)
    try {
      await notifyAdmin({
        subject: `New AVX waitlist lead — ${record.fullName} (${record.id})`,
        html: buildLeadAdminEmailHtml({
          id: record.id,
          fullName: record.fullName,
          email: record.email,
          countryCode: record.countryCode,
          whatsapp: record.whatsapp,
          city: record.city,
          age: record.age,
          gender: record.gender,
          preferredProgram: record.preferredProgram,
          preferredDate: record.preferredDate,
          preferredTime: record.preferredTime,
          goals: record.goals,
          additionalMessage: record.additionalMessage,
        }),
      });
      syncStatus.email = true;
      if (isPostgresReady()) {
        await setRegistrationEmailStatus(record.id, true, null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Admin email failed";
      syncStatus.errors.push(`admin email: ${message}`);
      await logFailure("email", record.id, message);
      if (isPostgresReady()) {
        await setRegistrationEmailStatus(record.id, false, message);
      }
    }

    try {
      await sendConfirmationEmail({
        to: record.email,
        subject: `Waitlist confirmed — ${record.id}`,
        html: buildLeadVisitorEmailHtml({
          id: record.id,
          fullName: record.fullName,
          preferredDate: record.preferredDate,
          preferredTime: record.preferredTime,
        }),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Visitor email failed";
      syncStatus.errors.push(`visitor email: ${message}`);
      await logFailure("email", record.id, `visitor: ${message}`);
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      calendarUrl,
      icsUrl,
      sync: {
        postgres: syncStatus.postgres,
        sheets: syncStatus.sheets,
        email: syncStatus.email,
        errors: syncStatus.errors,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
