import { describe, expect, test } from 'bun:test';
import { createSqliteConnection } from '../src/db/connection';
import { runAllMigrations } from '../src/db/migrations';
import { runAllSeeds } from '../src/db/seeds';

describe('SQLite Database Migrations & Seeds', () => {
  test('applies all 10 SQLite tables and seeds Ushirika wa Neema & KCMC world data', () => {
    const db = createSqliteConnection(':memory:');
    runAllMigrations(db);
    runAllSeeds(db);

    const zones = db.query('SELECT COUNT(*) as c FROM zones').get() as { c: number };
    const buildings = db.query('SELECT COUNT(*) as c FROM buildings').get() as { c: number };
    const roads = db.query('SELECT COUNT(*) as c FROM roads').get() as { c: number };
    const vehicles = db.query('SELECT COUNT(*) as c FROM vehicles').get() as { c: number };
    const missions = db.query('SELECT COUNT(*) as c FROM missions').get() as { c: number };
    const npcs = db.query('SELECT COUNT(*) as c FROM npcs').get() as { c: number };

    expect(zones.c).toBe(5);
    expect(buildings.c).toBe(12);
    expect(roads.c).toBe(7);
    expect(vehicles.c).toBe(6);
    expect(missions.c).toBe(4);
    expect(npcs.c).toBe(5);
  });
});
