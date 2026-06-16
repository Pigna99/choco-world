# Choco World

Gioco web (tamagotchi): curi una creatura di cioccolato — la nutri, la coccoli,
combatte, sale di livello. Next.js 13 (App Router) + TypeScript + **Postgres** + PWA.

## Sviluppo

Crea `.env.local` con:

```
DATABASE_URL=postgres://user:pass@host:5432/choco_world
```

Poi:

```
npm install
npm run dev
```

Lo schema DB è in `database/migrations/` (applicare in ordine numerico su Postgres).

## Storage

I dati delle creature vivono nella tabella `creatures` (Postgres). Storicamente il
gioco usava MongoDB/Mongoose su Atlas; migrato a Postgres per uniformarsi allo stack
VPS Pigna Labs (INFRA-99). Il layer dati è in `utils/backend/` (`connect.tsx`,
`database.tsx`). Lo script `database/import-from-mongo-dump.mjs` importa un vecchio
dump Mongo (one-shot, idempotente).

## Deploy

Su VPS `pigna-bot` (`/opt/choco-world`, porta PM2 3012) dietro nginx +
`choco.pignalabs.it`, deploy automatico via GitHub Actions. Le env di produzione
stanno solo in `.env.local` sul VPS (mai committate).
