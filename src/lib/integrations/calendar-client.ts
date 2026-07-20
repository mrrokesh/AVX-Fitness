/** Client-safe calendar helpers (no secrets). */

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
