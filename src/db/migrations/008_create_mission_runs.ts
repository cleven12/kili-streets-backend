import { Database } from 'bun:sqlite';

export function up008CreateMissionRuns(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS mission_runs (
      id TEXT PRIMARY KEY,
      mission_id TEXT NOT NULL,
      player_id TEXT NOT NULL,
      stage TEXT NOT NULL CHECK(stage IN ('pickup', 'dropoff', 'completed', 'expired')),
      started_at TEXT NOT NULL,
      completed_at TEXT,
      earned_tzs INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
      FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_mission_runs_player ON mission_runs(player_id, stage);
  `);
}
