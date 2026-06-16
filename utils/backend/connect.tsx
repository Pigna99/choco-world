// Connessione Postgres (postgres.js) — convenzione ecosistema Pigna Labs (cfr. ing-tracker lib/db.ts).
// Sostituisce la vecchia connessione Mongoose. La connection string sta in DATABASE_URL
// (env sul VPS via .env.local / PM2; MAI committata).
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var _sql: ReturnType<typeof postgres> | undefined;
}

const sql =
  globalThis._sql ??
  postgres(process.env.DATABASE_URL!, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._sql = sql;
}

export { sql };
