import { describe, expect, test } from 'bun:test';
import { createSqliteConnection } from '../src/db/connection';
import { runAllMigrations } from '../src/db/migrations';
import { runAllSeeds } from '../src/db/seeds';
import { createApiRouter } from '../src/routes/router';

describe('REST API Router Endpoints', () => {
  test('serves /api/v1/health and /api/v1/world/bootstrap for Client SQLite hydration', async () => {
    const db = createSqliteConnection(':memory:');
    runAllMigrations(db);
    runAllSeeds(db);
    const router = createApiRouter(db);

    const healthRes = await router(new Request('http://localhost:4000/api/v1/health'));
    expect(healthRes.status).toBe(200);
    const healthJson = (await healthRes.json()) as { status: string };
    expect(healthJson.status).toBe('ok');

    const bootRes = await router(
      new Request('http://localhost:4000/api/v1/world/bootstrap')
    );
    expect(bootRes.status).toBe(200);
    const bootJson = (await bootRes.json()) as {
      zones: unknown[];
      vehicles: unknown[];
      missions: unknown[];
    };
    expect(bootJson.zones.length).toBe(5);
    expect(bootJson.vehicles.length).toBe(6);
    expect(bootJson.missions.length).toBe(4);
  });
});
