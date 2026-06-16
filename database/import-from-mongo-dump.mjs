// Import del dump MongoDB (ChocoWorld.creaturelists.json) in Postgres.
// One-shot, idempotente (ON CONFLICT DO NOTHING sulla PK). Usato per la migrazione
// dei dati esistenti (53 creature) da Atlas → Postgres VPS (INFRA-99).
//
// Uso:
//   DATABASE_URL="postgres://..." node database/import-from-mongo-dump.mjs <path-al-dump.json>
//
// Il file di dump NON è nel repo (sta in c:\tmp\choco-dump\ in locale): si passa il path.
// La connection string arriva da env, mai hardcoded.
import postgres from 'postgres';
import { readFileSync } from 'fs';

const url = process.env.DATABASE_URL;
const dumpPath = process.argv[2];
if (!url) { console.error('DATABASE_URL mancante'); process.exit(1); }
if (!dumpPath) { console.error('Uso: node import-from-mongo-dump.mjs <dump.json>'); process.exit(1); }

const docs = JSON.parse(readFileSync(dumpPath, 'utf8'));
const sql = postgres(url, { connect_timeout: 15 });

// Mongo doc → riga creatures. _id (hex) diventa la PK stringa; `statictics` (refuso
// storico del modello) → colonna `statistics`; `__v` scartato.
const toRow = (d) => ({
  id: String(d._id),
  name: d.name,
  color: d.color,
  gender: d.gender,
  state: d.state,
  last_update: d.last_update,
  last_time_pet: d.last_time_pet,
  last_time_pet_real: d.last_time_pet_real,
  last_happiness_update: d.last_happiness_update,
  last_time_feed: d.last_time_feed,
  statistics: d.statictics,
  informations: d.informations,
  combat: d.combat,
  social: d.social ?? { friends: [] },
});

let ok = 0, skipped = 0;
try {
  for (const d of docs) {
    const r = toRow(d);
    const res = await sql`
      INSERT INTO creatures (
        id, name, color, gender, state,
        last_update, last_time_pet, last_time_pet_real,
        last_happiness_update, last_time_feed,
        statistics, informations, combat, social
      ) VALUES (
        ${r.id}, ${r.name}, ${r.color}, ${r.gender}, ${r.state},
        ${r.last_update}, ${r.last_time_pet}, ${r.last_time_pet_real},
        ${r.last_happiness_update}, ${r.last_time_feed},
        ${sql.json(r.statistics)}, ${sql.json(r.informations)},
        ${sql.json(r.combat)}, ${sql.json(r.social)}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    if (res.count === 1) ok++; else skipped++;
  }
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM creatures`;
  console.log(`Import: ${ok} inserite, ${skipped} già presenti. Totale in tabella: ${count}.`);
} catch (e) {
  console.error('ERRORE import:', e.message);
  process.exitCode = 2;
} finally {
  await sql.end();
}
