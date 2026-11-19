import { Database } from 'bun:sqlite';
import { WORLD_BOUNDS } from '../config/constants';
import { GenerateCharacterRequest } from '../types/api';
import { UserCharacterRecord } from '../types/domain';

export class CharacterRepository {
  constructor(private db: Database) {}

  public findAll(): UserCharacterRecord[] {
    return this.db
      .query('SELECT * FROM user_characters ORDER BY reputation DESC, updated_at DESC')
      .all() as UserCharacterRecord[];
  }

  public findByPlayerId(playerId: string): UserCharacterRecord | null {
    return (
      (this.db
        .query('SELECT * FROM user_characters WHERE player_id = $playerId')
        .get({ $playerId: playerId }) as UserCharacterRecord | null) || null
    );
  }

  public findByUsername(username: string): UserCharacterRecord | null {
    return (
      (this.db
        .query('SELECT * FROM user_characters WHERE username = $username')
        .get({ $username: username }) as UserCharacterRecord | null) || null
    );
  }

  public upsertCharacter(
    playerId: string,
    req: GenerateCharacterRequest,
    x = WORLD_BOUNDS.DEFAULT_SPAWN_X,
    y = WORLD_BOUNDS.DEFAULT_SPAWN_Y
  ): UserCharacterRecord {
    const existing = this.findByPlayerId(playerId);
    const id = existing ? existing.id : `char_${crypto.randomUUID().slice(0, 12)}`;
    const now = new Date().toISOString();

    const defaultWaypoints = JSON.stringify([
      { x, y },
      { x: 1125, y: 1160 },
      { x: 1200, y: 380 },
    ]);

    this.db
      .prepare(
        `INSERT INTO user_characters (
          id, player_id, username, display_name, role, skin_tone, jacket_color,
          accent_color, headgear, bio, x, y, angle, speed, in_vehicle_id,
          is_online, reputation, waypoints_json, updated_at
        ) VALUES (
          $id, $playerId, $username, $displayName, $role, $skinTone, $jacketColor,
          $accentColor, $headgear, $bio, $x, $y, -1.57, 54, NULL,
          1, 20, $waypoints, $now
        )
        ON CONFLICT(player_id) DO UPDATE SET
          username = excluded.username,
          display_name = excluded.display_name,
          role = excluded.role,
          skin_tone = excluded.skin_tone,
          jacket_color = excluded.jacket_color,
          accent_color = excluded.accent_color,
          headgear = excluded.headgear,
          bio = excluded.bio,
          is_online = 1,
          updated_at = excluded.updated_at`
      )
      .run({
        $id: id,
        $playerId: playerId,
        $username: req.username,
        $displayName: req.displayName,
        $role: req.role,
        $skinTone: req.skinTone,
        $jacketColor: req.jacketColor,
        $accentColor: req.accentColor,
        $headgear: req.headgear,
        $bio:
          req.bio ||
          `${req.role} operating in Ushirika wa Neema & KCMC, Kilimanjaro.`,
        $x: existing ? existing.x : x,
        $y: existing ? existing.y : y,
        $waypoints: existing ? existing.waypoints_json : defaultWaypoints,
        $now: now,
      });

    return this.findByPlayerId(playerId)!;
  }

  public updateTransform(
    playerId: string,
    x: number,
    y: number,
    angle: number,
    inVehicleId: string | null
  ): void {
    const now = new Date().toISOString();
    this.db
      .prepare(
        `UPDATE user_characters
         SET x = $x, y = $y, angle = $angle, in_vehicle_id = $inVehicleId, is_online = 1, updated_at = $now
         WHERE player_id = $playerId`
      )
      .run({
        $playerId: playerId,
        $x: x,
        $y: y,
        $angle: angle,
        $inVehicleId: inVehicleId,
        $now: now,
      });
  }
}
