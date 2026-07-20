import { google } from "googleapis";
import { siteConfig } from "@/data/site";
import { getGoogleJwt } from "@/lib/integrations/google-auth";

export type CalendarEventInput = {
  summary: string;
  description: string;
  startDate: string;
  startTime: string;
  durationMinutes?: number;
  attendeeEmail?: string;
  location?: string;
  createMeet?: boolean;
};

function getAuth() {
  return getGoogleJwt(["https://www.googleapis.com/auth/calendar"]);
}

export async function createCalendarEvent(input: CalendarEventInput) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const auth = getAuth();

  if (!auth || !calendarId) {
    console.info("[calendar] Credentials not configured — returning mock event (dev mode)");
    return {
      id: `mock-${Date.now()}`,
      hangoutLink: input.createMeet ? "https://meet.google.com/lookup/mock-link" : undefined,
      htmlLink: undefined as string | undefined,
    };
  }

  const calendar = google.calendar({ version: "v3", auth });
  const duration = input.durationMinutes ?? 45;
  const start = new Date(`${input.startDate}T${input.startTime}:00`);
  const end = new Date(start.getTime() + duration * 60_000);

  const event = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: input.createMeet ? 1 : 0,
    requestBody: {
      summary: input.summary,
      description: input.description,
      location: input.location,
      start: {
        dateTime: start.toISOString(),
        timeZone: siteConfig.timezone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: siteConfig.timezone,
      },
      attendees: input.attendeeEmail ? [{ email: input.attendeeEmail }] : undefined,
      conferenceData: input.createMeet
        ? {
            createRequest: {
              requestId: `meet-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          }
        : undefined,
    },
  });

  return {
    id: event.data.id ?? "",
    hangoutLink: event.data.hangoutLink ?? undefined,
    htmlLink: event.data.htmlLink ?? undefined,
  };
}

export function buildIcs(options: {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  durationMinutes?: number;
  location?: string;
}) {
  const duration = options.durationMinutes ?? 45;
  const start = new Date(`${options.startDate}T${options.startTime}:00`);
  const end = new Date(start.getTime() + duration * 60_000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gym Site//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${options.title}`,
    `DESCRIPTION:${options.description.replace(/\n/g, "\\n")}`,
    options.location ? `LOCATION:${options.location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function googleCalendarAddUrl(options: {
  title: string;
  details: string;
  startDate: string;
  startTime: string;
  durationMinutes?: number;
  location?: string;
}) {
  const duration = options.durationMinutes ?? 45;
  const start = new Date(`${options.startDate}T${options.startTime}:00`);
  const end = new Date(start.getTime() + duration * 60_000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: options.title,
    details: options.details,
    location: options.location ?? "",
    dates: `${fmt(start)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
