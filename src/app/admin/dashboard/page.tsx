"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  ExternalLink,
  LogOut,
  Megaphone,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import type { LeadStatus } from "@/lib/validations/registration";

type Registration = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  whatsapp: string;
  status: LeadStatus;
  preferredProgram?: string;
  preferredDate: string;
  preferredTime: string;
  assignedStaff?: string;
  internalNotes?: string;
  sheetsSynced: boolean;
  sheetsSyncError?: string;
};

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function statusTone(status: string) {
  const s = status.toLowerCase();
  if (s.includes("new") || s.includes("pending")) return "text-[var(--accent)]";
  if (s.includes("won") || s.includes("enroll") || s.includes("complete"))
    return "text-[var(--success)]";
  if (s.includes("lost") || s.includes("cancel")) return "text-[var(--danger)]";
  return "text-[var(--text)]";
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [regs, setRegs] = useState<Registration[]>([]);
  const [failures, setFailures] = useState<unknown[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const auth = await fetch("/api/admin/auth");
    const a = await auth.json();
    if (!a.authenticated) {
      router.push("/admin/login");
      return;
    }
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    setRegs(data.registrations ?? []);
    setFailures(data.failures ?? []);
    setStatuses(data.leadStatuses ?? []);
    const ann = await fetch("/api/announcement").then((r) => r.json());
    setAnnouncement(ann.announcement ?? "");
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, [router]);

  const filtered = regs.filter((r) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      (r.preferredProgram ?? "").toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const stats = useMemo(() => {
    const total = regs.length;
    const today = regs.filter((r) => isToday(r.createdAt)).length;
    const sheetsPending = regs.filter((r) => !r.sheetsSynced).length;
    const unassigned = regs.filter((r) => !r.assignedStaff?.trim()).length;
    const byStatus = statuses.map((s) => ({
      status: s,
      count: regs.filter((r) => r.status === s).length,
    }));
    const upcoming = [...regs]
      .filter((r) => r.preferredDate)
      .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate))
      .slice(0, 5);
    const recent = [...regs]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);
    return { total, today, sheetsPending, unassigned, byStatus, upcoming, recent };
  }, [regs, statuses]);

  async function updateLead(id: string, patch: Partial<Registration>) {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (res.ok) {
      setMessage("Lead updated");
      await load();
    }
  }

  async function retrySheets(id: string) {
    const res = await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "retry-sheets", id }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Sheets sync retried" : data.error);
    await load();
  }

  async function saveAnnouncement() {
    const res = await fetch("/api/announcement", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ announcement }),
    });
    setMessage(res.ok ? "Announcement updated" : "Failed to update announcement");
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-ink)] text-white">
        <div className="container-site flex flex-wrap items-end justify-between gap-4 px-5 py-10 md:px-8">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-hot)]">
              Operations
            </p>
            <h1 className="display mt-2 text-[clamp(2.4rem,5vw,3.8rem)]">Admin dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-[var(--on-ink-soft)]">
              Pipeline, consultations, announcement bar, sync health, and exports — in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-on-dark-outline !py-2.5 !text-[0.7rem]"
              onClick={() => void load()}
            >
              <RefreshCw className="size-3.5" />
              Refresh
            </button>
            <a
              href="/api/admin/leads?export=csv"
              className="btn btn-on-dark !py-2.5 !text-[0.7rem]"
            >
              <Download className="size-3.5" />
              Export CSV
            </a>
            <button
              type="button"
              className="btn btn-ghost !border-[var(--border)] !py-2.5 !text-[0.7rem] !text-[var(--on-ink)]"
              onClick={() => void logout()}
            >
              <LogOut className="size-3.5" />
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="container-site px-5 py-10 md:px-8">
        {message && (
          <p
            className="mb-6 border-l-2 border-[var(--accent)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text)]"
            role="status"
          >
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-[var(--text-muted)]">Loading dashboard…</p>
        ) : (
          <>
            {/* KPI strip */}
            <section className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Kpi
                icon={<Users className="size-4" />}
                label="Total leads"
                value={String(stats.total)}
                hint="All registrations"
              />
              <Kpi
                icon={<ClipboardList className="size-4" />}
                label="New today"
                value={String(stats.today)}
                hint="Created since midnight"
              />
              <Kpi
                icon={<AlertTriangle className="size-4" />}
                label="Sheets pending"
                value={String(stats.sheetsPending)}
                hint="Need sync retry"
                warn={stats.sheetsPending > 0}
              />
              <Kpi
                icon={<CalendarDays className="size-4" />}
                label="Unassigned"
                value={String(stats.unassigned)}
                hint="No staff linked yet"
              />
            </section>

            {/* Quick actions + pipeline */}
            <section className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">Quick actions</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Jump to the workflows you use most.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <ActionLink href="/consultation" label="Open booking page" detail="Public consult form" />
                  <ActionLink href="/#waitlist-form" label="Open waitlist / enroll" detail="Registration funnel" />
                  <ActionLink href="/contact" label="Contact inbox path" detail="Public contact form" />
                  <ActionLink href="/programs" label="Programs page" detail="Public program list" />
                  <ActionLink href="/" label="View live site" detail="Marketing homepage" />
                  <ActionLink href="/portal" label="Client portal" detail="Member area (preview)" />
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">Pipeline</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">Leads by status</p>
                <ul className="mt-6 space-y-3">
                  {stats.byStatus.length === 0 && (
                    <li className="text-sm text-[var(--text-muted)]">No status data yet.</li>
                  )}
                  {stats.byStatus.map((row) => {
                    const pct = stats.total ? Math.round((row.count / stats.total) * 100) : 0;
                    return (
                      <li key={row.status}>
                        <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                          <span className={statusTone(row.status)}>{row.status}</span>
                          <span className="text-[var(--text-muted)]">
                            {row.count} · {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-[var(--border)]">
                          <div
                            className="h-full bg-[var(--accent)] transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            {/* Upcoming + recent */}
            <section className="mb-10 grid gap-8 lg:grid-cols-2">
              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">Upcoming consults</h2>
                <ul className="mt-5 divide-y divide-[var(--border)]">
                  {stats.upcoming.length === 0 && (
                    <li className="py-4 text-sm text-[var(--text-muted)]">No preferred dates yet.</li>
                  )}
                  {stats.upcoming.map((r) => (
                    <li key={r.id} className="flex items-start justify-between gap-3 py-4">
                      <div>
                        <p className="font-medium text-[var(--text)]">{r.fullName}</p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {r.preferredProgram || "Program TBD"} · {r.status}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm text-[var(--accent)]">
                        {r.preferredDate}
                        <br />
                        <span className="text-[var(--text-muted)]">{r.preferredTime}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">Recent activity</h2>
                <ul className="mt-5 divide-y divide-[var(--border)]">
                  {stats.recent.length === 0 && (
                    <li className="py-4 text-sm text-[var(--text-muted)]">No leads yet.</li>
                  )}
                  {stats.recent.map((r) => (
                    <li key={r.id} className="py-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-[var(--text)]">{r.fullName}</p>
                        <time className="text-xs text-[var(--text-muted)]">
                          {new Date(r.createdAt).toLocaleString()}
                        </time>
                      </div>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {r.email} ·{" "}
                        <span className={statusTone(r.status)}>{r.status}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Announcement */}
            <section className="mb-10 border-t border-[var(--border)] pt-6">
              <div className="mb-4 flex items-center gap-2">
                <Megaphone className="size-5 text-[var(--accent)]" />
                <h2 className="display text-3xl text-[var(--text)]">Announcement bar</h2>
              </div>
              <p className="mb-3 text-sm text-[var(--text-muted)]">
                Shown site-wide above the navigation. Keep it short and action-oriented.
              </p>
              <textarea
                className="textarea min-h-24"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="e.g. Book a free consultation — limited coaching slots this month."
              />
              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={() => void saveAnnouncement()}
              >
                Save announcement
              </button>
            </section>

            {/* Leads */}
            <section className="mb-10 border-t border-[var(--border)] pt-6">
              <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="display text-3xl text-[var(--text)]">All leads</h2>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Showing {filtered.length} of {regs.length}
                  </p>
                </div>
              </div>
              <div className="mb-5 flex flex-wrap gap-3">
                <label className="relative min-w-[220px] flex-1">
                  <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    className="input !pl-7"
                    placeholder="Search name, email, ID, program…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  className="select max-w-xs"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All statuses</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-0 border-t border-[var(--border)]">
                {filtered.map((r) => (
                  <article
                    key={r.id}
                    className="border-b border-[var(--border)] py-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-[var(--text)]">
                          {r.fullName}
                          <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                            {r.id}
                          </span>
                        </h3>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {r.email} · {r.whatsapp}
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {r.preferredProgram || "No program"} · {r.preferredDate}{" "}
                          {r.preferredTime}
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          {r.sheetsSynced ? (
                            <>
                              <CheckCircle2 className="size-3.5 text-[var(--success)]" />
                              Sheets synced
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="size-3.5 text-[var(--accent)]" />
                              Sheets pending
                              {r.sheetsSyncError ? ` — ${r.sheetsSyncError}` : ""}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select
                          className="select"
                          value={r.status}
                          onChange={(e) =>
                            void updateLead(r.id, { status: e.target.value as LeadStatus })
                          }
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {!r.sheetsSynced && (
                          <button
                            type="button"
                            className="btn btn-secondary !py-2"
                            onClick={() => void retrySheets(r.id)}
                          >
                            Retry Sheets
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Assigned staff</span>
                        <input
                          className="input"
                          placeholder="e.g. Kathir"
                          defaultValue={r.assignedStaff ?? ""}
                          onBlur={(e) =>
                            void updateLead(r.id, { assignedStaff: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        <span className="label">Internal notes</span>
                        <input
                          className="input"
                          placeholder="Follow-up notes…"
                          defaultValue={r.internalNotes ?? ""}
                          onBlur={(e) =>
                            void updateLead(r.id, { internalNotes: e.target.value })
                          }
                        />
                      </label>
                    </div>
                  </article>
                ))}
                {filtered.length === 0 && (
                  <p className="py-8 text-[var(--text-muted)]">No leads match this filter.</p>
                )}
              </div>
            </section>

            {/* Integrations + system */}
            <section className="grid gap-8 lg:grid-cols-2">
              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">Failed integrations</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Recent sync / email / calendar failures for debugging.
                </p>
                <pre className="mt-4 max-h-64 overflow-auto border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-xs text-[var(--text-muted)]">
                  {failures.length
                    ? JSON.stringify(failures, null, 2)
                    : "No failed integrations recorded."}
                </pre>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <h2 className="display text-3xl text-[var(--text)]">System notes</h2>
                <ul className="mt-5 space-y-3 text-sm text-[var(--text-muted)]">
                  <li>
                    Leads persist to local PostgreSQL when{" "}
                    <code className="text-[var(--text)]">DATABASE_URL</code> is set.
                  </li>
                  <li>Google Sheets sync can be retried per lead from the list above.</li>
                  <li>
                    Extend this dashboard for trainers, membership plans, branches, and live
                    class calendars as needed.
                  </li>
                  <li>
                    Client portal architecture is stubbed at{" "}
                    <Link href="/portal" className="text-[var(--accent)]">
                      /portal
                    </Link>
                    .
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/portal" className="btn btn-secondary">
                    Client portal
                    <ExternalLink className="size-3.5" />
                  </Link>
                  <Link href="/" className="btn btn-ghost">
                    Back to site
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  hint,
  warn,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="border-t border-[var(--border)] pt-4">
      <div className="mb-3 flex items-center gap-2 text-[var(--text-muted)]">
        {icon}
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p
        className={`display text-4xl ${warn ? "text-[var(--accent)]" : "text-[var(--text)]"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{hint}</p>
    </div>
  );
}

function ActionLink({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group border border-[var(--border)] px-4 py-4 transition hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)]"
    >
      <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{label}</p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{detail}</p>
    </Link>
  );
}
