import { Database } from 'bun:sqlite';
import { WORLD_BOUNDS } from '../config/constants';
import { PlayerRecord } from '../types/domain';

export class PlayerRepository {
  constructor(private db: Database) {}

  public findById(id: string): PlayerRecord | null {
    return (
      (this.db
        .query('SELECT * FROM players WHERE id = $id')
        .get({ $id: id }) as PlayerRecord | null) || null
    );
  }

  public findByUsername(username: string): PlayerRecord | null {
    return (
      (this.db
        .query('SELECT * FROM players WHERE username = $username')
        .get({ $username: username }) as PlayerRecord | null) || null
    );
  }

  public createPlayer(id: string, username: string): PlayerRecord {
    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO players (id, username, home_zone, x, y, angle, health, stamina, reputation, in_vehicle_id, updated_at)
         VALUES ($id, $username, 'zone-ushirika-village', $x, $y, -1.57, 100, 100, 10, NULL, $now)`
      )
      .run({
        $id: id,
        $username: username,
        $x: WORLD_BOUNDS.DEFAULT_SPAWN_X,
        $y: WORLD_BOUNDS.DEFAULT_SPAWN_Y,
        $now: now,
      });
    return this.findById(id)!;
  }

  public updatePositionAndVehicle(
    id: string,
    x: number,
    y: number,
    angle: number,
    inVehicleId: string | null
  ): PlayerRecord | null {
    const now = new Date().toISOString();
    this.db
      .prepare(
        `UPDATE players
         SET x = $x, y = $y, angle = $angle, in_vehicle_id = $inVehicleId, updated_at = $now
         WHERE id = $id`
      )
      .run({
        $id: id,
        $x: x,
        $y: y,
        $angle: angle,
        $inVehicleId: inVehicleId,
        $now: now,
      });
    return this.findById(id);
  }

  public incrementReputation(id: string, delta: number): void {
    this.db
      .prepare('UPDATE players SET reputation = reputation + $delta WHERE id = $id')
      .run({ $id: id, $delta: delta });
  }
}
