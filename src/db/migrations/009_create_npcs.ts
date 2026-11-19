import { Database } from 'bun:sqlite';

export function up009CreateNpcs(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS npcs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      shirt_color TEXT NOT NULL,
      x REAL NOT NULL,
      y REAL NOT NULL,
      speed REAL NOT NULL,
      waypoints_json TEXT NOT NULL,
      dialogue_sw TEXT NOT NULL
    );
  `);
}
