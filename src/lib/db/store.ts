import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import type { LeadStatus } from "@/lib/validations/registration";

/** Vercel/serverless FS is read-only except /tmp — never mkdir under process.cwd() there. */
const isServerless =
  Boolean(process.env.VERCEL) || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

const DATA_DIR = isServerless
  ? path.join("/tmp", "avx-fitness", "store")
  : path.join(process.cwd(), "data", "store");

export type RegistrationRecord = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  age: number;
  gender: string;
  city: string;
  preferredLanguage: string;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  activityLevel: string;
  fitnessExperience: string;
  existingMembership: string;
  workoutLocation: string;
  availableTimePerDay: string;
  goals: string[];
  targetPeriod: string;
  biggestChallenge?: string;
  previousPrograms?: string;
  preferredProgram?: string;
  preferredTrainer?: string;
  additionalMessage?: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  preferredBranch: string;
  preferredTrainerBooking?: string;
  privacyAccepted: boolean;
  contactConsent: boolean;
  medicalDisclaimer: boolean;
  marketingConsent: boolean;
  leadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: LeadStatus;
  assignedStaff?: string;
  followUpDate?: string;
  internalNotes?: string;
  sheetsSynced: boolean;
  sheetsSyncError?: string;
  calendarEventId?: string;
  calendarSynced: boolean;
  calendarSyncError?: string;
};

export type BookingRecord = {
  id: string;
  createdAt: string;
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
  timezone?: string;
  status: "confirmed" | "cancelled" | "rescheduled";
  calendarEventId?: string;
  meetLink?: string;
  registrationId?: string;
};

export type IntegrationFailure = {
  id: string;
  createdAt: string;
  type: "sheets" | "calendar" | "email" | "postgres";
  entityId: string;
  error: string;
  resolved: boolean;
};

type StoreShape = {
  registrations: RegistrationRecord[];
  bookings: BookingRecord[];
  failures: IntegrationFailure[];
  announcement: string;
  content: Record<string, string>;
};

const emptyStore = (): StoreShape => ({
  registrations: [],
  bookings: [],
  failures: [],
  announcement:
    "Limited trial-session slots available this month — Book your free consultation.",
  content: {},
});

/** Ephemeral fallback when disk writes fail (same-request updates still work). */
let memoryStore: StoreShape | null = null;

async function ensureStore(): Promise<StoreShape> {
  if (memoryStore) return memoryStore;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const file = path.join(DATA_DIR, "db.json");
    try {
      const raw = await fs.readFile(file, "utf8");
      memoryStore = JSON.parse(raw) as StoreShape;
      return memoryStore;
    } catch {
      const initial = emptyStore();
      await fs.writeFile(file, JSON.stringify(initial, null, 2));
      memoryStore = initial;
      return initial;
    }
  } catch (err) {
    console.warn(
      "[store] Falling back to in-memory store:",
      err instanceof Error ? err.message : err
    );
    memoryStore = emptyStore();
    return memoryStore;
  }
}

async function writeStore(store: StoreShape) {
  memoryStore = store;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const file = path.join(DATA_DIR, "db.json");
    await fs.writeFile(file, JSON.stringify(store, null, 2));
  } catch (err) {
    // Same-request updates still work via memoryStore; durable save is Sheets/Postgres.
    console.warn(
      "[store] Disk write skipped:",
      err instanceof Error ? err.message : err
    );
  }
}

export async function createRegistration(
  data: Omit<
    RegistrationRecord,
    | "id"
    | "createdAt"
    | "status"
    | "sheetsSynced"
    | "calendarSynced"
  >
) {
  const store = await ensureStore();
  const record: RegistrationRecord = {
    ...data,
    id: `REG-${nanoid(10).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "New",
    sheetsSynced: false,
    calendarSynced: false,
  };
  store.registrations.unshift(record);
  await writeStore(store);
  return record;
}

export async function updateRegistration(
  id: string,
  patch: Partial<RegistrationRecord>
) {
  const store = await ensureStore();
  const idx = store.registrations.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store.registrations[idx] = { ...store.registrations[idx], ...patch };
  await writeStore(store);
  return store.registrations[idx];
}

export async function listRegistrations() {
  const store = await ensureStore();
  return store.registrations;
}

export async function getRegistration(id: string) {
  const store = await ensureStore();
  return store.registrations.find((r) => r.id === id) ?? null;
}

export async function createBooking(
  data: Omit<BookingRecord, "id" | "createdAt" | "status">
) {
  const store = await ensureStore();
  const conflict = store.bookings.find(
    (b) =>
      b.status === "confirmed" &&
      b.date === data.date &&
      b.time === data.time &&
      b.trainerSlug === data.trainerSlug
  );
  if (conflict) {
    throw new Error("This time slot is already booked for the selected trainer.");
  }
  const record: BookingRecord = {
    ...data,
    id: `BK-${nanoid(10).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };
  store.bookings.unshift(record);
  await writeStore(store);
  return record;
}

export async function listBookings() {
  const store = await ensureStore();
  return store.bookings;
}

export async function updateBooking(id: string, patch: Partial<BookingRecord>) {
  const store = await ensureStore();
  const idx = store.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  store.bookings[idx] = { ...store.bookings[idx], ...patch };
  await writeStore(store);
  return store.bookings[idx];
}

export async function logFailure(
  type: IntegrationFailure["type"],
  entityId: string,
  error: string
) {
  const store = await ensureStore();
  store.failures.unshift({
    id: nanoid(),
    createdAt: new Date().toISOString(),
    type,
    entityId,
    error,
    resolved: false,
  });
  await writeStore(store);
}

export async function listFailures() {
  const store = await ensureStore();
  return store.failures;
}

export async function getAnnouncement() {
  const store = await ensureStore();
  return store.announcement;
}

export async function setAnnouncement(text: string) {
  const store = await ensureStore();
  store.announcement = text;
  await writeStore(store);
  return store.announcement;
}

export async function exportRegistrationsCsv() {
  const rows = await listRegistrations();
  const headers = [
    "id",
    "createdAt",
    "fullName",
    "email",
    "countryCode",
    "whatsapp",
    "age",
    "gender",
    "city",
    "status",
    "preferredProgram",
    "preferredDate",
    "preferredTime",
    "consultationType",
    "sheetsSynced",
    "calendarSynced",
  ];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const val = String((r as unknown as Record<string, unknown>)[h] ?? "");
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];
  return lines.join("\n");
}
