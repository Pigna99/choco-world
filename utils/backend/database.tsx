import { CreatureClass } from './CreatureClass';
import { sql } from './connect';
import { Creature, Gender } from '../interfaces';
import { savedChoco } from '../interfaces';
import { randomBytes } from 'crypto';

// sql.json() vuole un JSONValue con index signature; le nostre interfacce (Stat,
// ecc.) sono tipi nominali → JSON-serializzabili a runtime ma rifiutate dal tipo.
// jb() centralizza il cast in un punto solo, invece di sporcare ogni chiamata.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jb = (v: unknown) => sql.json(v as any);

// ── Storage Postgres ──────────────────────────────────────────────────────────
// Migrato da MongoDB/Mongoose (INFRA-99). La tabella `creatures` tiene le chiavi
// semplici come colonne piatte e i blocchi nestati (statistics/informations/
// combat/social) come jsonb: l'app legge/scrive la creatura come blob intero,
// quindi normalizzare ogni stat sarebbe sovra-ingegnerizzato per un gioco.
// L'id resta una stringa esadecimale a 24 char (compatibile con i vecchi
// ObjectId Mongo già salvati lato client in idb-keyval).
//
// NB: lo schema reale (CREATE TABLE) vive in database/migrations/001_init.sql;
// qui c'è solo l'accesso ai dati. Le firme delle 4 funzioni sono identiche alla
// versione Mongo, così route e CreatureClass non cambiano.

// id ObjectId-like: 24 hex. Sostituisce la generazione del _id di Mongo.
const newId = () => randomBytes(12).toString('hex');

// Riga DB (colonne piatte + jsonb) → oggetto Creature nella forma attesa dal gioco.
// NB: nel modello originale la chiave è `statictics` (refuso storico mantenuto per
// non rompere CreatureClass e i dati esistenti).
type Row = {
    id: string;
    name: string;
    color: string;
    gender: Gender;
    state: Creature['state'];
    last_update: Date;
    last_time_pet: Date;
    last_time_pet_real: Date;
    last_happiness_update: Date;
    last_time_feed: Date;
    statistics: Creature['statictics'];
    informations: Creature['informations'];
    combat: Creature['combat'];
    social: Creature['social'];
};

const rowToCreature = (r: Row): Creature => ({
    name: r.name,
    color: r.color,
    gender: r.gender,
    state: r.state,
    last_update: r.last_update,
    last_time_pet: r.last_time_pet,
    last_time_pet_real: r.last_time_pet_real,
    last_happiness_update: r.last_happiness_update,
    last_time_feed: r.last_time_feed,
    statictics: r.statistics,
    informations: r.informations,
    combat: r.combat,
    social: r.social,
});

const getRoutes = async (): Promise<string[]> => { // array di id (string)
    const rows = await sql<{ id: string }[]>`SELECT id FROM creatures`;
    return rows.map((r) => r.id);
};

const getCreature = async (creatureId: string): Promise<Creature | null> => {
    const rows = await sql<Row[]>`
        SELECT id, name, color, gender, state,
               last_update, last_time_pet, last_time_pet_real,
               last_happiness_update, last_time_feed,
               statistics, informations, combat, social
        FROM creatures WHERE id = ${creatureId}
    `;
    if (rows.length === 0) return null;
    return rowToCreature(rows[0]);
};

const newCreature = async (name: string, color: string, gender: Gender): Promise<savedChoco> => {
    const id = newId();
    const c = CreatureClass.newCreature(name, color, gender).getInfo();
    await sql`
        INSERT INTO creatures (
            id, name, color, gender, state,
            last_update, last_time_pet, last_time_pet_real,
            last_happiness_update, last_time_feed,
            statistics, informations, combat, social
        ) VALUES (
            ${id}, ${c.name}, ${c.color}, ${c.gender}, ${c.state},
            ${c.last_update}, ${c.last_time_pet}, ${c.last_time_pet_real},
            ${c.last_happiness_update}, ${c.last_time_feed},
            ${jb(c.statictics)}, ${jb(c.informations)},
            ${jb(c.combat)}, ${jb(c.social)}
        )
    `;
    const creature: savedChoco = {
        name,
        color,
        gender,
        id,
        state: 'walking',
    };
    return creature;
};

const updateCreature = async (creature: Creature, creatureId: string): Promise<void> => {
    await sql`
        UPDATE creatures SET
            name = ${creature.name},
            color = ${creature.color},
            gender = ${creature.gender},
            state = ${creature.state},
            last_update = ${creature.last_update},
            last_time_pet = ${creature.last_time_pet},
            last_time_pet_real = ${creature.last_time_pet_real},
            last_happiness_update = ${creature.last_happiness_update},
            last_time_feed = ${creature.last_time_feed},
            statistics = ${jb(creature.statictics)},
            informations = ${jb(creature.informations)},
            combat = ${jb(creature.combat)},
            social = ${jb(creature.social)}
        WHERE id = ${creatureId}
    `;
};

export { getRoutes, getCreature, updateCreature, newCreature };
