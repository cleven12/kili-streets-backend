import { Database } from 'bun:sqlite';
import { ClientSyncEvent } from '../types/api';

export class SyncRepository {
  constructor(private db: Database) {}

  public logSyncEvents(playerId: string, events: ClientSyncEvent[]): number {
    const now = new Date().toISOString();
    const stmt = this.db.prepare(
      `INSERT OR IGNORE INTO client_sync_log (event_id, player_id, event_type, payload_json, client_timestamp, synced_at)
       VALUES ($eventId, $playerId, $eventType, $payloadJson, $clientTimestamp, $now)`
    );

    let count = 0;
    const tx = this.db.transaction(() => {
      for (const ev of events) {
        stmt.run({
          $eventId: ev.eventId,
          $playerId: playerId,
          $eventType: ev.eventType,
          $payloadJson: JSON.stringify(ev.payload),
          $clientTimestamp: ev.timestamp,
          $now: now,
        });
        count++;
      }
    });
    tx();
    return count;
  }
}
