import { Database } from 'bun:sqlite';
import { NpcRecord } from '../types/domain';

export class NpcRepository {
  constructor(private db: Database) {}

  public findAll(): NpcRecord[] {
    return this.db
      .query('SELECT * FROM npcs ORDER BY id ASC')
      .all() as NpcRecord[];
  }
}
