import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin";
import {
  exportRegistrationsCsv,
  listBookings,
  listFailures,
  listRegistrations,
  updateRegistration,
} from "@/lib/db/store";
import { leadStatuses } from "@/lib/validations/registration";
import { appendToGoogleSheet, registrationToSheetRow } from "@/lib/integrations/sheets";

export async function GET(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  if (searchParams.get("export") === "csv") {
    const csv = await exportRegistrationsCsv();
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="registrations.csv"',
      },
    });
  }
  const [registrations, bookings, failures] = await Promise.all([
    listRegistrations(),
    listBookings(),
    listFailures(),
  ]);
  return NextResponse.json({ registrations, bookings, failures, leadStatuses });
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const updated = await updateRegistration(body.id, {
    status: body.status,
    assignedStaff: body.assignedStaff,
    internalNotes: body.internalNotes,
    followUpDate: body.followUpDate,
  });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ registration: updated });
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (body.action === "retry-sheets" && body.id) {
    const rows = await listRegistrations();
    const record = rows.find((r) => r.id === body.id);
    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    try {
      await appendToGoogleSheet(registrationToSheetRow(record), "Registrations");
      const updated = await updateRegistration(record.id, {
        sheetsSynced: true,
        sheetsSyncError: undefined,
      });
      return NextResponse.json({ ok: true, registration: updated });
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Sync failed" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
