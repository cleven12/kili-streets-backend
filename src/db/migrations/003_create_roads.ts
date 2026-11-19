import { Database } from 'bun:sqlite';

export function up003CreateRoads(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS roads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      surface TEXT NOT NULL CHECK(surface IN ('tarmac', 'murram')),
      orientation TEXT NOT NULL CHECK(orientation IN ('horizontal', 'vertical')),
      x REAL NOT NULL,
      y REAL NOT NULL,
      width REAL NOT NULL,
      height REAL NOT NULL,
      has_center_line INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS trees (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL CHECK(kind IN ('banana', 'acacia', 'coffee')),
      x REAL NOT NULL,
      y REAL NOT NULL,
      radius REAL NOT NULL
    );
  `);
}
