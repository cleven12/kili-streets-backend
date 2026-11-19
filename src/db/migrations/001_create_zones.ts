import { Database } from 'bun:sqlite';

export function up001CreateZones(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS zones (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      center_x REAL NOT NULL,
      center_y REAL NOT NULL,
      radius REAL NOT NULL,
      danger_level INTEGER NOT NULL DEFAULT 1,
      ambient_sound TEXT NOT NULL DEFAULT 'kili_breeze'
    );
    CREATE INDEX IF NOT EXISTS idx_zones_coords ON zones(center_x, center_y);
  `);
}
