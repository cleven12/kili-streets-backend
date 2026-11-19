import { Database } from 'bun:sqlite';

export function up010CreateTelemetryAndSync(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS client_sync_log (
      event_id TEXT PRIMARY KEY,
      player_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      client_timestamp TEXT NOT NULL,
      synced_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_client_sync_player ON client_sync_log(player_id, synced_at);
  `);
}
