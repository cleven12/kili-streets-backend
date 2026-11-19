import { Database } from 'bun:sqlite';
import { MissionRecord, MissionRunRecord } from '../types/domain';

export class MissionRepository {
  constructor(private db: Database) {}

  public findAll(): MissionRecord[] {
    return this.db
      .query('SELECT * FROM missions ORDER BY reward_tzs ASC')
      .all() as MissionRecord[];
  }

  public findById(id: string): MissionRecord | null {
    return (
      (this.db
        .query('SELECT * FROM missions WHERE id = $id')
        .get({ $id: id }) as MissionRecord | null) || null
    );
  }

  public createMissionRun(missionId: string, playerId: string): MissionRunRecord {
    const id = `mrun_${crypto.randomUUID()}`;
    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO mission_runs (id, mission_id, player_id, stage, started_at, completed_at, earned_tzs)
         VALUES ($id, $missionId, $playerId, 'pickup', $now, NULL, 0)`
      )
      .run({
        $id: id,
        $missionId: missionId,
        $playerId: playerId,
        $now: now,
      });

    return this.db
      .query('SELECT * FROM mission_runs WHERE id = $id')
      .get({ $id: id }) as MissionRunRecord;
  }

  public completeMissionRun(
    runId: string,
    earnedTzs: number
  ): MissionRunRecord | null {
    const now = new Date().toISOString();
    this.db
      .prepare(
        `UPDATE mission_runs
         SET stage = 'completed', completed_at = $now, earned_tzs = $earnedTzs
         WHERE id = $runId`
      )
      .run({
        $runId: runId,
        $now: now,
        $earnedTzs: earnedTzs,
      });

    return (
      (this.db
        .query('SELECT * FROM mission_runs WHERE id = $runId')
        .get({ $runId: runId }) as MissionRunRecord | null) || null
    );
  }
}
