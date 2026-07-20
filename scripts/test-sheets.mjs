/**
 * Test Google Sheets Apps Script web app connection.
 * Usage: node scripts/test-sheets.mjs
 */
import { readFileSync, existsSync } from "fs";
import path from "path";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const endpoint = process.env.GOOGLE_SHEETS_WEBAPP_URL;
const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET;

if (!endpoint) {
  console.error("Missing GOOGLE_SHEETS_WEBAPP_URL in .env.local");
  console.error("Deploy scripts/google-apps-script/Code.gs in your Google Sheet first.");
  process.exit(1);
}
if (!secret) {
  console.error("Missing GOOGLE_SHEETS_WEBAPP_SECRET in .env.local");
  process.exit(1);
}

try {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      sheetName: "Registrations",
      row: {
        submissionId: "TEST",
        submissionTimestamp: new Date().toISOString(),
        fullName: "Connection test",
        email: "test@example.com",
      },
    }),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { ok: false, error: text };
  }

  if (!res.ok || !data.ok) {
    console.error("Sheets test failed:", data.error ?? text);
    if (String(data.error).includes("Unauthorized")) {
      console.error(
        "\nSet Script property WEBAPP_SECRET in Apps Script to match GOOGLE_SHEETS_WEBAPP_SECRET in .env.local"
      );
    }
    process.exit(1);
  }

  console.log("Sheets connection OK — test row appended to Registrations tab.");
} catch (err) {
  console.error("Sheets test failed:", err.message || err);
  process.exit(1);
}
