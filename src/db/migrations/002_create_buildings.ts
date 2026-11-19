import { Database } from 'bun:sqlite';

export function up002CreateBuildings(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS buildings (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      name TEXT NOT NULL,
      label TEXT,
      category TEXT NOT NULL,
      x REAL NOT NULL,
      y REAL NOT NULL,
      width REAL NOT NULL,
      height REAL NOT NULL,
      roof_color TEXT NOT NULL,
      wall_color TEXT NOT NULL,
      FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_buildings_zone ON buildings(zone_id);
  `);
}
