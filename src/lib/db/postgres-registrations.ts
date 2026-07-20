import { nanoid } from "nanoid";
import type { LeadStatus } from "@/lib/validations/registration";
import type { RegistrationRecord } from "@/lib/db/store";
import { isPostgresConfigured, query } from "@/lib/db/postgres";

export function isPostgresReady() {
  return isPostgresConfigured();
}

export async function ensureRegistrationsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id text PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      full_name text NOT NULL,
      email text NOT NULL,
      country_code text NOT NULL,
      whatsapp text NOT NULL,
      age int NOT NULL,
      gender text NOT NULL,
      city text NOT NULL,
      preferred_language text NOT NULL DEFAULT 'English',
      height_cm numeric NOT NULL,
      current_weight_kg numeric NOT NULL,
      target_weight_kg numeric NOT NULL,
      activity_level text NOT NULL DEFAULT 'Moderately active',
      fitness_experience text NOT NULL,
      existing_membership text NOT NULL DEFAULT 'No',
      workout_location text NOT NULL DEFAULT 'Both',
      available_time_per_day text NOT NULL,
      goals text[] NOT NULL DEFAULT '{}',
      target_period text,
      biggest_challenge text,
      previous_programs text,
      preferred_program text,
      preferred_trainer text,
      additional_message text,
      preferred_date date,
      preferred_time text,
      consultation_type text,
      preferred_branch text,
      preferred_trainer_booking text,
      privacy_accepted boolean NOT NULL DEFAULT true,
      contact_consent boolean NOT NULL DEFAULT true,
      medical_disclaimer boolean NOT NULL DEFAULT true,
      marketing_consent boolean NOT NULL DEFAULT false,
      lead_source text,
      utm_source text,
      utm_medium text,
      utm_campaign text,
      status text NOT NULL DEFAULT 'New',
      assigned_staff text,
      follow_up_date date,
      internal_notes text,
      sheets_synced boolean NOT NULL DEFAULT false,
      sheets_sync_error text,
      calendar_event_id text,
      calendar_synced boolean NOT NULL DEFAULT false,
      calendar_sync_error text,
      email_synced boolean NOT NULL DEFAULT false,
      email_sync_error text
    );
  `);
  await query(`
    CREATE INDEX IF NOT EXISTS registrations_created_at_idx
    ON registrations (created_at DESC);
  `);
}

function rowToRecord(row: Record<string, unknown>): RegistrationRecord {
  return {
    id: String(row.id),
    createdAt: new Date(String(row.created_at)).toISOString(),
    fullName: String(row.full_name),
    email: String(row.email),
    countryCode: String(row.country_code),
    whatsapp: String(row.whatsapp),
    age: Number(row.age),
    gender: String(row.gender),
    city: String(row.city),
    preferredLanguage: String(row.preferred_language),
    heightCm: Number(row.height_cm),
    currentWeightKg: Number(row.current_weight_kg),
    targetWeightKg: Number(row.target_weight_kg),
    activityLevel: String(row.activity_level),
    fitnessExperience: String(row.fitness_experience),
    existingMembership: String(row.existing_membership),
    workoutLocation: String(row.workout_location),
    availableTimePerDay: String(row.available_time_per_day),
    goals: Array.isArray(row.goals) ? (row.goals as string[]) : [],
    targetPeriod: String(row.target_period ?? ""),
    biggestChallenge: row.biggest_challenge ? String(row.biggest_challenge) : undefined,
    previousPrograms: row.previous_programs ? String(row.previous_programs) : undefined,
    preferredProgram: row.preferred_program ? String(row.preferred_program) : undefined,
    preferredTrainer: row.preferred_trainer ? String(row.preferred_trainer) : undefined,
    additionalMessage: row.additional_message ? String(row.additional_message) : undefined,
    preferredDate: String(row.preferred_date ?? ""),
    preferredTime: String(row.preferred_time ?? ""),
    consultationType: String(row.consultation_type ?? ""),
    preferredBranch: String(row.preferred_branch ?? ""),
    preferredTrainerBooking: row.preferred_trainer_booking
      ? String(row.preferred_trainer_booking)
      : undefined,
    privacyAccepted: Boolean(row.privacy_accepted),
    contactConsent: Boolean(row.contact_consent),
    medicalDisclaimer: Boolean(row.medical_disclaimer),
    marketingConsent: Boolean(row.marketing_consent),
    leadSource: row.lead_source ? String(row.lead_source) : undefined,
    utmSource: row.utm_source ? String(row.utm_source) : undefined,
    utmMedium: row.utm_medium ? String(row.utm_medium) : undefined,
    utmCampaign: row.utm_campaign ? String(row.utm_campaign) : undefined,
    status: (row.status as LeadStatus) ?? "New",
    assignedStaff: row.assigned_staff ? String(row.assigned_staff) : undefined,
    followUpDate: row.follow_up_date ? String(row.follow_up_date) : undefined,
    internalNotes: row.internal_notes ? String(row.internal_notes) : undefined,
    sheetsSynced: Boolean(row.sheets_synced),
    sheetsSyncError: row.sheets_sync_error ? String(row.sheets_sync_error) : undefined,
    calendarEventId: row.calendar_event_id ? String(row.calendar_event_id) : undefined,
    calendarSynced: Boolean(row.calendar_synced),
    calendarSyncError: row.calendar_sync_error ? String(row.calendar_sync_error) : undefined,
  };
}

export async function insertRegistrationPostgres(
  data: Omit<
    RegistrationRecord,
    "id" | "createdAt" | "status" | "sheetsSynced" | "calendarSynced"
  >
) {
  await ensureRegistrationsTable();
  const id = `REG-${nanoid(10).toUpperCase()}`;
  const createdAt = new Date().toISOString();

  await query(
    `INSERT INTO registrations (
      id, created_at, full_name, email, country_code, whatsapp, age, gender, city,
      preferred_language, height_cm, current_weight_kg, target_weight_kg, activity_level,
      fitness_experience, existing_membership, workout_location, available_time_per_day,
      goals, target_period, biggest_challenge, previous_programs, preferred_program,
      preferred_trainer, additional_message, preferred_date, preferred_time,
      consultation_type, preferred_branch, preferred_trainer_booking,
      privacy_accepted, contact_consent, medical_disclaimer, marketing_consent,
      lead_source, utm_source, utm_medium, utm_campaign, status
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,
      $10,$11,$12,$13,$14,
      $15,$16,$17,$18,
      $19,$20,$21,$22,$23,
      $24,$25,$26,$27,
      $28,$29,$30,
      $31,$32,$33,$34,
      $35,$36,$37,$38,'New'
    )`,
    [
      id,
      createdAt,
      data.fullName,
      data.email,
      data.countryCode,
      data.whatsapp,
      data.age,
      data.gender,
      data.city,
      data.preferredLanguage,
      data.heightCm,
      data.currentWeightKg,
      data.targetWeightKg,
      data.activityLevel,
      data.fitnessExperience,
      data.existingMembership,
      data.workoutLocation,
      data.availableTimePerDay,
      data.goals,
      data.targetPeriod ?? null,
      data.biggestChallenge ?? null,
      data.previousPrograms ?? null,
      data.preferredProgram ?? null,
      data.preferredTrainer ?? null,
      data.additionalMessage ?? null,
      data.preferredDate || null,
      data.preferredTime || null,
      data.consultationType || null,
      data.preferredBranch || null,
      data.preferredTrainerBooking ?? null,
      data.privacyAccepted,
      data.contactConsent,
      data.medicalDisclaimer,
      data.marketingConsent,
      data.leadSource ?? null,
      data.utmSource ?? null,
      data.utmMedium ?? null,
      data.utmCampaign ?? null,
    ]
  );

  return {
    ...data,
    id,
    createdAt,
    status: "New" as LeadStatus,
    sheetsSynced: false,
    calendarSynced: false,
  } satisfies RegistrationRecord;
}

export async function updateRegistrationPostgres(
  id: string,
  patch: Partial<RegistrationRecord>
) {
  const map: Record<string, unknown> = {};
  if (patch.status !== undefined) map.status = patch.status;
  if (patch.assignedStaff !== undefined) map.assigned_staff = patch.assignedStaff;
  if (patch.internalNotes !== undefined) map.internal_notes = patch.internalNotes;
  if (patch.followUpDate !== undefined) map.follow_up_date = patch.followUpDate;
  if (patch.sheetsSynced !== undefined) map.sheets_synced = patch.sheetsSynced;
  if (patch.sheetsSyncError !== undefined) map.sheets_sync_error = patch.sheetsSyncError;
  if (patch.calendarSynced !== undefined) map.calendar_synced = patch.calendarSynced;
  if (patch.calendarSyncError !== undefined) map.calendar_sync_error = patch.calendarSyncError;
  if (patch.calendarEventId !== undefined) map.calendar_event_id = patch.calendarEventId;

  const keys = Object.keys(map);
  if (!keys.length) return getRegistrationPostgres(id);

  const sets = keys.map((k, i) => `${k} = $${i + 2}`);
  await query(
    `UPDATE registrations SET ${sets.join(", ")} WHERE id = $1`,
    [id, ...keys.map((k) => map[k])]
  );
  return getRegistrationPostgres(id);
}

export async function getRegistrationPostgres(id: string) {
  const result = await query(`SELECT * FROM registrations WHERE id = $1`, [id]);
  if (!result.rows[0]) return null;
  return rowToRecord(result.rows[0] as Record<string, unknown>);
}

export async function listRegistrationsPostgres() {
  await ensureRegistrationsTable();
  const result = await query(`SELECT * FROM registrations ORDER BY created_at DESC`);
  return result.rows.map((row) => rowToRecord(row as Record<string, unknown>));
}

export async function setRegistrationEmailStatus(
  id: string,
  synced: boolean,
  error?: string | null
) {
  await query(
    `UPDATE registrations SET email_synced = $2, email_sync_error = $3 WHERE id = $1`,
    [id, synced, error ?? null]
  );
}
