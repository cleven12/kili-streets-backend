import { Database } from 'bun:sqlite';
import { VehicleRecord } from '../types/domain';

export class VehicleRepository {
  constructor(private db: Database) {}

  public findAll(): VehicleRecord[] {
    return this.db
      .query('SELECT * FROM vehicles ORDER BY id ASC')
      .all() as VehicleRecord[];
  }

  public findById(id: string): VehicleRecord | null {
    return (
      (this.db
        .query('SELECT * FROM vehicles WHERE id = $id')
        .get({ $id: id }) as VehicleRecord | null) || null
    );
  }

  public assignDriver(vehicleId: string, playerId: string | null): VehicleRecord | null {
    this.db
      .prepare(
        `UPDATE vehicles
         SET driver_player_id = $playerId,
             is_ai = CASE WHEN $playerId IS NULL THEN is_ai ELSE 0 END
         WHERE id = $vehicleId`
      )
      .run({
        $vehicleId: vehicleId,
        $playerId: playerId,
      });
    return this.findById(vehicleId);
  }

  public updateTransform(
    vehicleId: string,
    x: number,
    y: number,
    angle: number,
    speed: number
  ): void {
    this.db
      .prepare(
        `UPDATE vehicles
         SET x = $x, y = $y, angle = $angle, speed = $speed
         WHERE id = $vehicleId`
      )
      .run({
        $vehicleId: vehicleId,
        $x: x,
        $y: y,
        $angle: angle,
        $speed: speed,
      });
  }
}
