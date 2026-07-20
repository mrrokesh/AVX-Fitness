import { NextResponse } from "next/server";
import { getAnnouncement, setAnnouncement } from "@/lib/db/store";
import { verifyAdminSession } from "@/lib/auth/admin";

export async function GET() {
  const announcement = await getAnnouncement();
  return NextResponse.json({ announcement });
}

export async function PUT(req: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { announcement } = await req.json();
  if (typeof announcement !== "string" || !announcement.trim()) {
    return NextResponse.json({ error: "Invalid announcement" }, { status: 400 });
  }
  const saved = await setAnnouncement(announcement.trim());
  return NextResponse.json({ announcement: saved });
}
