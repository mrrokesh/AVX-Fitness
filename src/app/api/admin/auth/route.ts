import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
  verifyAdminSession,
} from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!verifyAdminCredentials(body.username ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const ok = await verifyAdminSession();
  return NextResponse.json({ authenticated: ok });
}
