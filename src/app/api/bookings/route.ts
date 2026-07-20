import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/registration";
import { createBooking, logFailure } from "@/lib/db/store";
import {
  buildIcs,
  createCalendarEvent,
  googleCalendarAddUrl,
} from "@/lib/integrations/calendar";
import { sendConfirmationEmail, notifyAdmin, buildBookingAdminEmailHtml, buildBookingVisitorEmailHtml } from "@/lib/integrations/email";
import { appendToGoogleSheet, bookingToSheetRow } from "@/lib/integrations/sheets";
import { siteConfig } from "@/data/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const booking = await createBooking(data);

    let meetLink: string | undefined;
    try {
      const event = await createCalendarEvent({
        summary: `Consultation — ${data.name}`,
        description: [
          `Booking ID: ${booking.id}`,
          `Trainer: ${data.trainerSlug}`,
          `Mode: ${data.consultationType}`,
          `Program: ${data.program ?? "TBD"}`,
          data.notes ? `Notes: ${data.notes}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        startDate: data.date,
        startTime: data.time,
        attendeeEmail: data.email,
        location: data.branch,
        createMeet: data.consultationType === "Google Meet",
      });
      meetLink = event.hangoutLink;
      booking.calendarEventId = event.id;
      booking.meetLink = meetLink;
    } catch (err) {
      await logFailure(
        "calendar",
        booking.id,
        err instanceof Error ? err.message : "Calendar error"
      );
    }

    try {
      await appendToGoogleSheet(bookingToSheetRow(booking), "Bookings");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sheets sync failed";
      console.error("[bookings] Sheets sync failed:", message);
      await logFailure("sheets", booking.id, message);
    }

    const calendarUrl = googleCalendarAddUrl({
      title: `Consultation — ${siteConfig.name}`,
      details: `Booking ID: ${booking.id}`,
      startDate: data.date,
      startTime: data.time,
      location: data.branch,
    });
    const ics = buildIcs({
      title: `Consultation — ${siteConfig.name}`,
      description: `Booking ID: ${booking.id}`,
      startDate: data.date,
      startTime: data.time,
      location: data.branch,
    });

    try {
      await notifyAdmin({
        subject: `AVX Booking — ${data.name} (${booking.id})`,
        html: buildBookingAdminEmailHtml({
          id: booking.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          trainerSlug: data.trainerSlug,
          consultationType: data.consultationType,
          date: data.date,
          time: data.time,
          program: data.program,
          branch: data.branch,
          notes: data.notes,
          meetLink,
        }),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Admin email failed";
      console.error("[bookings] Admin email failed:", message);
      await logFailure("email", booking.id, message);
    }

    try {
      await sendConfirmationEmail({
        to: data.email,
        subject: `Consultation confirmed — ${booking.id}`,
        html: buildBookingVisitorEmailHtml({
          id: booking.id,
          name: data.name,
          date: data.date,
          time: data.time,
          branch: data.branch,
          consultationType: data.consultationType,
          meetLink,
        }),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Visitor email failed";
      console.error("[bookings] Visitor email failed:", message);
      await logFailure("email", booking.id, `visitor: ${message}`);
    }

    return NextResponse.json({
      ok: true,
      id: booking.id,
      meetLink,
      calendarUrl,
      icsUrl: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Booking failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
