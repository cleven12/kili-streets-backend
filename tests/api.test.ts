import { describe, expect, test } from 'bun:test';
import { createSqliteConnection } from '../src/db/connection';
import { runAllMigrations } from '../src/db/migrations';
import { runAllSeeds } from '../src/db/seeds';
import { createApiRouter } from '../src/routes/router';

describe('REST API Router Endpoints & Real User Character Generator', () => {
  test('serves /api/v1/world/bootstrap with real user characters and generates a new user character via POST /api/v1/characters/generate', async () => {
    const db = createSqliteConnection(':memory:');
    runAllMigrations(db);
    runAllSeeds(db);
    const router = createApiRouter(db);

    const bootRes = await router(
      new Request('http://localhost:4000/api/v1/world/bootstrap')
    );
    expect(bootRes.status).toBe(200);
    const bootJson = (await bootRes.json()) as {
      zones: unknown[];
      vehicles: unknown[];
      missions: unknown[];
      characters: unknown[];
    };
    expect(bootJson.zones.length).toBe(5);
    expect(bootJson.vehicles.length).toBe(6);
    expect(bootJson.missions.length).toBe(4);
    expect(bootJson.characters.length).toBe(6);

    const genRes = await router(
      new Request('http://localhost:4000/api/v1/characters/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'alex_kili',
          displayName: 'Alex Moshi',
          role: 'Software Engineer',
          skinTone: '#5C3A21',
          jacketColor: '#1D63B8',
          accentColor: '#2ECC71',
          headgear: 'helmet',
          bio: 'Full-stack engineer in Ushirika wa Neema',
        }),
      })
    );
    expect(genRes.status).toBe(201);
    const genJson = (await genRes.json()) as {
      character: { username: string; display_name: string; role: string };
      allCharacters: unknown[];
    };
    expect(genJson.character.username).toBe('alex_kili');
    expect(genJson.character.display_name).toBe('Alex Moshi');
    expect(genJson.allCharacters.length).toBe(7);
  });
});
