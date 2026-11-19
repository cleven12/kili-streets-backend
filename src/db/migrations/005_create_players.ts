import { Database } from 'bun:sqlite';

export function up005CreatePlayers(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      home_zone TEXT NOT NULL DEFAULT 'zone-ushirika-village',
      x REAL NOT NULL DEFAULT 1125,
      y REAL NOT NULL DEFAULT 1580,
      angle REAL NOT NULL DEFAULT -1.57,
      health INTEGER NOT NULL DEFAULT 100,
      stamina INTEGER NOT NULL DEFAULT 100,
      reputation INTEGER NOT NULL DEFAULT 10,
      in_vehicle_id TEXT,
      updated_at TEXT NOT NULL
    );
  `);
}
