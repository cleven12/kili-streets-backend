import { Database } from 'bun:sqlite';

export function up007CreateMissions(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS missions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      pickup_label TEXT NOT NULL,
      pickup_x REAL NOT NULL,
      pickup_y REAL NOT NULL,
      dropoff_label TEXT NOT NULL,
      dropoff_x REAL NOT NULL,
      dropoff_y REAL NOT NULL,
      reward_tzs INTEGER NOT NULL,
      time_limit_seconds INTEGER NOT NULL,
      recommended_vehicle TEXT
    );
  `);
}
