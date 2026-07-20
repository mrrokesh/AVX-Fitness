import { google } from "googleapis";
import type { BookingRecord, RegistrationRecord } from "@/lib/db/store";
import { getGoogleJwt } from "@/lib/integrations/google-auth";

export type SheetPayload = Record<string, string | number | boolean | undefined>;

const REGISTRATION_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "fullName",
  "email",
  "countryCode",
  "whatsappNumber",
  "age",
  "gender",
  "city",
  "preferredLanguage",
  "height",
  "currentWeight",
  "targetWeight",
  "fitnessLevel",
  "fitnessGoal",
  "workoutPreference",
  "programSelected",
  "trainerSelected",
  "preferredBranch",
  "availableWorkoutTime",
  "consultationType",
  "preferredDate",
  "preferredTime",
  "additionalMessage",
  "consentStatus",
  "marketingConsent",
  "leadSource",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "currentLeadStatus",
  "assignedStaffMember",
  "followUpDate",
  "internalNotes",
] as const;

const CONTACT_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "formType",
  "fullName",
  "email",
  "phone",
  "message",
  "privacyAccepted",
] as const;

const BOOKING_HEADERS = [
  "submissionId",
  "submissionTimestamp",
  "formType",
  "fullName",
  "email",
  "phone",
  "trainerSlug",
  "consultationType",
  "preferredDate",
  "preferredTime",
  "programSelected",
  "preferredBranch",
  "notes",
  "timezone",
  "status",
  "meetLink",
  "calendarEventId",
] as const;

function headersForSheet(sheetName: string): readonly string[] {
  if (sheetName === "Contacts") return CONTACT_HEADERS;
  if (sheetName === "Bookings") return BOOKING_HEADERS;
  return REGISTRATION_HEADERS;
}

function getSheetsAuth() {
  return getGoogleJwt(["https://www.googleapis.com/auth/spreadsheets"]);
}

export function registrationToSheetRow(r: RegistrationRecord): SheetPayload {
  return {
    submissionId: r.id,
    submissionTimestamp: r.createdAt,
    fullName: r.fullName,
    email: r.email,
    countryCode: r.countryCode,
    whatsappNumber: r.whatsapp,
    age: r.age,
    gender: r.gender,
    city: r.city,
    preferredLanguage: r.preferredLanguage,
    height: r.heightCm,
    currentWeight: r.currentWeightKg,
    targetWeight: r.targetWeightKg,
    fitnessLevel: r.fitnessExperience,
    fitnessGoal: r.goals.join("; "),
    workoutPreference: r.workoutLocation,
    programSelected: r.preferredProgram ?? "",
    trainerSelected: r.preferredTrainer ?? r.preferredTrainerBooking ?? "",
    preferredBranch: r.preferredBranch,
    availableWorkoutTime: r.availableTimePerDay,
    consultationType: r.consultationType,
    preferredDate: r.preferredDate,
    preferredTime: r.preferredTime,
    additionalMessage: r.additionalMessage ?? "",
    consentStatus: r.privacyAccepted && r.contactConsent && r.medicalDisclaimer,
    marketingConsent: r.marketingConsent,
    leadSource: r.leadSource ?? "",
    utmSource: r.utmSource ?? "",
    utmMedium: r.utmMedium ?? "",
    utmCampaign: r.utmCampaign ?? "",
    currentLeadStatus: r.status,
    assignedStaffMember: r.assignedStaff ?? "",
    followUpDate: r.followUpDate ?? "",
    internalNotes: r.internalNotes ?? "",
  };
}

export function contactToSheetRow(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
}): SheetPayload {
  return {
    submissionId: `CT-${Date.now()}`,
    submissionTimestamp: new Date().toISOString(),
    formType: "contact",
    fullName: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    privacyAccepted: data.privacyAccepted,
  };
}

export function bookingToSheetRow(b: BookingRecord): SheetPayload {
  return {
    submissionId: b.id,
    submissionTimestamp: b.createdAt,
    formType: "booking",
    fullName: b.name,
    email: b.email,
    phone: b.phone,
    trainerSlug: b.trainerSlug,
    consultationType: b.consultationType,
    preferredDate: b.date,
    preferredTime: b.time,
    programSelected: b.program ?? "",
    preferredBranch: b.branch,
    notes: b.notes ?? "",
    timezone: b.timezone ?? "",
    status: b.status,
    meetLink: b.meetLink ?? "",
    calendarEventId: b.calendarEventId ?? "",
  };
}

function cellValue(value: string | number | boolean | undefined): string | number | boolean {
  if (value == null) return "";
  return value;
}

async function ensureSheetTab(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string,
  headers: readonly string[]
) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  const exists = meta.data.sheets?.some((s) => s.properties?.title === sheetName);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
  }

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!1:1`,
  });
  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName}'!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers as unknown as string[]] },
    });
  }
}

async function appendViaAppsScript(row: SheetPayload, sheetName: string) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET;
  if (!endpoint || !secret) return false;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, row, sheetName }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Sheets sync failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!data.ok) {
    throw new Error(data.error ?? "Google Sheets sync failed");
  }
  return true;
}

async function appendViaServiceAccount(row: SheetPayload, sheetName: string) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const auth = getSheetsAuth();
  if (!spreadsheetId || !auth) return false;

  const sheets = google.sheets({ version: "v4", auth });
  const headers = headersForSheet(sheetName);

  await ensureSheetTab(sheets, spreadsheetId, sheetName, headers);

  const values = [headers.map((key) => cellValue(row[key]))];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName}'!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
  return true;
}

/**
 * Append a row to Google Sheets.
 * Uses Apps Script web app (easiest) or service account direct API.
 */
export async function appendToGoogleSheet(
  row: SheetPayload,
  sheetName = "Registrations"
): Promise<void> {
  if (process.env.GOOGLE_SHEETS_WEBAPP_URL) {
    await appendViaAppsScript(row, sheetName);
    return;
  }

  if (await appendViaServiceAccount(row, sheetName)) {
    return;
  }

  console.info(
    "[sheets] Not configured — set GOOGLE_SHEETS_WEBAPP_URL or service account credentials in .env.local"
  );
}
