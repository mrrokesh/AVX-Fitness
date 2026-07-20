import { NextResponse } from "next/server";
import { getConsultationSlots } from "@/data/schedule";
import { listBookings } from "@/lib/db/store";
import { siteConfig } from "@/data/site";

export async function GET() {
  const slots = getConsultationSlots();
  const bookings = await listBookings();
  const confirmed = bookings.filter((b) => b.status === "confirmed");

  const available = slots.map((day) => ({
    date: day.date,
    times: day.times.filter(
      (time) =>
        !confirmed.some((b) => b.date === day.date && b.time === time)
    ),
  })).filter((d) => d.times.length > 0);

  return NextResponse.json({
    timezone: siteConfig.timezone,
    timezoneLabel: siteConfig.timezoneLabel,
    slots: available,
  });
}
