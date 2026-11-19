import { Database } from 'bun:sqlite';
import { up001CreateZones } from './001_create_zones';
import { up002CreateBuildings } from './002_create_buildings';
import { up003CreateRoads } from './003_create_roads';
import { up004CreateVehicles } from './004_create_vehicles';
import { up005CreatePlayers } from './005_create_players';
import { up006CreateWalletsAndTransactions } from './006_create_wallets_and_transactions';
import { up007CreateMissions } from './007_create_missions';
import { up008CreateMissionRuns } from './008_create_mission_runs';
import { up009CreateNpcs } from './009_create_npcs';
import { up010CreateTelemetryAndSync } from './010_create_telemetry_and_sync';
import { up011CreateUserCharacters } from './011_create_user_characters';

export function runAllMigrations(db: Database): void {
  const tx = db.transaction(() => {
    up001CreateZones(db);
    up002CreateBuildings(db);
    up003CreateRoads(db);
    up004CreateVehicles(db);
    up005CreatePlayers(db);
    up006CreateWalletsAndTransactions(db);
    up007CreateMissions(db);
    up008CreateMissionRuns(db);
    up009CreateNpcs(db);
    up010CreateTelemetryAndSync(db);
    up011CreateUserCharacters(db);
  });
  tx();
}
