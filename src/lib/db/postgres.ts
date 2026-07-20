import { Pool, type PoolClient, type QueryResultRow } from "pg";

let pool: Pool | null = null;

export function isPostgresConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Local Postgres often needs SSL off; managed hosts may need SSL
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    });
  }
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
) {
  const db = getPool();
  if (!db) throw new Error("DATABASE_URL is not configured");
  return db.query<T>(text, params);
}

export async function withClient<T>(fn: (client: PoolClient) => Promise<T>) {
  const db = getPool();
  if (!db) throw new Error("DATABASE_URL is not configured");
  const client = await db.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}
