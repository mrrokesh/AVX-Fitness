import { readFileSync } from "fs";
import path from "path";
import { google } from "googleapis";

type ServiceAccountCredentials = {
  email: string;
  key: string;
};

function loadKeyFile(): ServiceAccountCredentials | null {
  const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
  if (!keyFile) return null;

  try {
    const resolved = path.isAbsolute(keyFile) ? keyFile : path.join(process.cwd(), keyFile);
    const json = JSON.parse(readFileSync(resolved, "utf8")) as {
      client_email?: string;
      private_key?: string;
    };
    if (!json.client_email || !json.private_key) return null;
    return { email: json.client_email, key: json.private_key };
  } catch (err) {
    console.error(
      "[google-auth] Failed to read GOOGLE_SERVICE_ACCOUNT_KEY_FILE:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export function getServiceAccountCredentials(): ServiceAccountCredentials | null {
  const fromFile = loadKeyFile();
  if (fromFile) return fromFile;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key || key.includes("...")) return null;
  return { email, key };
}

export function getGoogleJwt(scopes: string[]) {
  const creds = getServiceAccountCredentials();
  if (!creds) return null;
  return new google.auth.JWT({
    email: creds.email,
    key: creds.key,
    scopes,
  });
}

export function getServiceAccountEmail() {
  return getServiceAccountCredentials()?.email ?? null;
}
