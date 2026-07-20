import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/registration";
import {
  buildContactAdminEmailHtml,
  buildContactVisitorEmailHtml,
  notifyAdmin,
  sendConfirmationEmail,
} from "@/lib/integrations/email";
import { appendToGoogleSheet, contactToSheetRow } from "@/lib/integrations/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse({
    ...body,
    privacyAccepted: body.privacyAccepted === true || body.privacyAccepted === "on",
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const data = parsed.data;

  try {
    await appendToGoogleSheet(contactToSheetRow(data), "Contacts");
  } catch (err) {
    console.error(
      "[contact] Sheets sync failed:",
      err instanceof Error ? err.message : err
    );
  }

  try {
    await notifyAdmin({
      subject: `AVX Contact — ${data.name}`,
      html: buildContactAdminEmailHtml(data),
    });
  } catch (err) {
    console.error(
      "[contact] Admin email failed:",
      err instanceof Error ? err.message : err
    );
  }

  try {
    await sendConfirmationEmail({
      to: data.email,
      subject: `We received your message — AVX Fitness`,
      html: buildContactVisitorEmailHtml(data),
    });
  } catch (err) {
    console.error(
      "[contact] Visitor email failed:",
      err instanceof Error ? err.message : err
    );
  }

  return NextResponse.json({ ok: true });
}
