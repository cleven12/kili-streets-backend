import { Database } from 'bun:sqlite';
import { PlayerRepository } from '../repositories/player.repo';
import { VehicleRepository } from '../repositories/vehicle.repo';
import { PlayerRecord, VehicleRecord } from '../types/domain';

export class VehicleService {
  private vehicleRepo: VehicleRepository;
  private playerRepo: PlayerRepository;

  constructor(db: Database) {
    this.vehicleRepo = new VehicleRepository(db);
    this.playerRepo = new PlayerRepository(db);
  }

  public listVehicles(): VehicleRecord[] {
    return this.vehicleRepo.findAll();
  }

  public enterVehicle(
    playerId: string,
    vehicleId: string
  ): { player: PlayerRecord; vehicle: VehicleRecord } | null {
    const player = this.playerRepo.findById(playerId);
    const vehicle = this.vehicleRepo.findById(vehicleId);
    if (!player || !vehicle) return null;

    if (player.in_vehicle_id && player.in_vehicle_id !== vehicleId) {
      this.vehicleRepo.assignDriver(player.in_vehicle_id, null);
    }

    const updatedVehicle = this.vehicleRepo.assignDriver(vehicleId, playerId)!;
    const updatedPlayer = this.playerRepo.updatePositionAndVehicle(
      playerId,
      updatedVehicle.x,
      updatedVehicle.y,
      updatedVehicle.angle,
      vehicleId
    )!;

    return { player: updatedPlayer, vehicle: updatedVehicle };
  }

  public exitVehicle(
    playerId: string,
    vehicleId: string,
    exitX?: number,
    exitY?: number
  ): { player: PlayerRecord; vehicle: VehicleRecord } | null {
    const player = this.playerRepo.findById(playerId);
    const vehicle = this.vehicleRepo.findById(vehicleId);
    if (!player || !vehicle) return null;

    if (typeof exitX === 'number' && typeof exitY === 'number') {
      this.vehicleRepo.updateTransform(vehicleId, exitX, exitY, vehicle.angle, 0);
    }

    const updatedVehicle = this.vehicleRepo.assignDriver(vehicleId, null)!;
    const stepOutX = updatedVehicle.x - Math.sin(updatedVehicle.angle) * 28;
    const stepOutY = updatedVehicle.y + Math.cos(updatedVehicle.angle) * 28;

    const updatedPlayer = this.playerRepo.updatePositionAndVehicle(
      playerId,
      stepOutX,
      stepOutY,
      updatedVehicle.angle,
      null
    )!;

    return { player: updatedPlayer, vehicle: updatedVehicle };
  }
}
