import { Database } from 'bun:sqlite';
import { WORLD_BOUNDS } from '../config/constants';
import { MissionRepository } from '../repositories/mission.repo';
import { NpcRepository } from '../repositories/npc.repo';
import { VehicleRepository } from '../repositories/vehicle.repo';
import { ZoneRepository } from '../repositories/zone.repo';
import { WorldBootstrapPayload } from '../types/api';
import { ZoneRecord } from '../types/domain';

export class WorldService {
  private zoneRepo: ZoneRepository;
  private vehicleRepo: VehicleRepository;
  private missionRepo: MissionRepository;
  private npcRepo: NpcRepository;

  constructor(db: Database) {
    this.zoneRepo = new ZoneRepository(db);
    this.vehicleRepo = new VehicleRepository(db);
    this.missionRepo = new MissionRepository(db);
    this.npcRepo = new NpcRepository(db);
  }

  public getBootstrapSnapshot(): WorldBootstrapPayload {
    return {
      version: 1,
      region: WORLD_BOUNDS.REGION_NAME,
      serverTime: new Date().toISOString(),
      zones: this.zoneRepo.findAllZones(),
      roads: this.zoneRepo.findAllRoads(),
      buildings: this.zoneRepo.findAllBuildings(),
      trees: this.zoneRepo.findAllTrees(),
      vehicles: this.vehicleRepo.findAll(),
      missions: this.missionRepo.findAll(),
      npcs: this.npcRepo.findAll(),
    };
  }

  public findClosestZone(x: number, y: number): ZoneRecord | null {
    const zones = this.zoneRepo.findAllZones();
    let best: ZoneRecord | null = null;
    let bestDist = Infinity;
    for (const z of zones) {
      const dist = Math.hypot(x - z.center_x, y - z.center_y);
      if (dist < bestDist) {
        bestDist = dist;
        best = z;
      }
    }
    return best;
  }
}
