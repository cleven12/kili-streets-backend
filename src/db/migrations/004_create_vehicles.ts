import { Database } from 'bun:sqlite';

export function up004CreateVehicles(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL CHECK(kind IN ('bodaboda', 'bajaji', 'daladala')),
      display_name TEXT NOT NULL,
      plate_number TEXT NOT NULL UNIQUE,
      x REAL NOT NULL,
      y REAL NOT NULL,
      angle REAL NOT NULL DEFAULT 0,
      speed REAL NOT NULL DEFAULT 0,
      max_speed REAL NOT NULL,
      reverse_speed REAL NOT NULL,
      acceleration REAL NOT NULL,
      braking REAL NOT NULL,
      turn_speed REAL NOT NULL,
      drift_grip REAL NOT NULL,
      width REAL NOT NULL,
      length REAL NOT NULL,
      primary_color TEXT NOT NULL,
      secondary_color TEXT NOT NULL,
      is_ai INTEGER NOT NULL DEFAULT 0,
      driver_player_id TEXT,
      fuel_level REAL NOT NULL DEFAULT 100,
      condition_percent REAL NOT NULL DEFAULT 100
    );
    CREATE INDEX IF NOT EXISTS idx_vehicles_kind ON vehicles(kind);
  `);
}
