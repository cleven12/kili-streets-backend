import { Database } from 'bun:sqlite';
import {
  BuildingRecord,
  RoadRecord,
  TreeRecord,
  ZoneRecord,
} from '../types/domain';

export class ZoneRepository {
  constructor(private db: Database) {}

  public findAllZones(): ZoneRecord[] {
    return this.db
      .query('SELECT * FROM zones ORDER BY id ASC')
      .all() as ZoneRecord[];
  }

  public findZoneById(id: string): ZoneRecord | null {
    return (
      (this.db
        .query('SELECT * FROM zones WHERE id = $id')
        .get({ $id: id }) as ZoneRecord | null) || null
    );
  }

  public findAllBuildings(): BuildingRecord[] {
    return this.db
      .query('SELECT * FROM buildings ORDER BY id ASC')
      .all() as BuildingRecord[];
  }

  public findAllRoads(): RoadRecord[] {
    return this.db
      .query('SELECT * FROM roads ORDER BY id ASC')
      .all() as RoadRecord[];
  }

  public findAllTrees(): TreeRecord[] {
    return this.db
      .query('SELECT * FROM trees ORDER BY id ASC')
      .all() as TreeRecord[];
  }
}
