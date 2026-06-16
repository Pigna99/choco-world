-- 001_init.sql — schema iniziale Choco World su Postgres (migrato da MongoDB, INFRA-99).
-- Una riga per creatura. Chiavi semplici come colonne piatte; i blocchi nestati
-- (statistics/informations/combat/social) come jsonb — l'app legge/scrive la
-- creatura come blob intero, quindi non si normalizza ogni stat.
-- L'id è una stringa esadecimale a 24 char (compatibile con i vecchi ObjectId Mongo,
-- già salvati lato client in idb-keyval).

CREATE TABLE IF NOT EXISTS creatures (
  id                     TEXT PRIMARY KEY,
  name                   TEXT        NOT NULL,
  color                  TEXT        NOT NULL,
  gender                 TEXT        NOT NULL,
  state                  TEXT        NOT NULL,
  last_update            TIMESTAMPTZ NOT NULL,
  last_time_pet          TIMESTAMPTZ NOT NULL,
  last_time_pet_real     TIMESTAMPTZ NOT NULL,
  last_happiness_update  TIMESTAMPTZ NOT NULL,
  last_time_feed         TIMESTAMPTZ NOT NULL,
  statistics             JSONB       NOT NULL,
  informations           JSONB       NOT NULL,
  combat                 JSONB       NOT NULL,
  social                 JSONB       NOT NULL
);
