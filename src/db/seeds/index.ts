import { Database } from 'bun:sqlite';
import { seed001Zones } from './001_seed_zones';
import { seed002Buildings } from './002_seed_buildings';
import { seed003RoadsAndTrees } from './003_seed_roads_and_trees';
import { seed004Vehicles } from './004_seed_vehicles';
import { seed005Missions } from './005_seed_missions';
import { seed006Npcs } from './006_seed_npcs';
import { seed007RealUsers } from './007_seed_real_users';

export function runAllSeeds(db: Database): void {
  const tx = db.transaction(() => {
    seed001Zones(db);
    seed002Buildings(db);
    seed003RoadsAndTrees(db);
    seed004Vehicles(db);
    seed005Missions(db);
    seed006Npcs(db);
    seed007RealUsers(db);
  });
  tx();
}
