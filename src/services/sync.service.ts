import { Database } from 'bun:sqlite';
import { PlayerRepository } from '../repositories/player.repo';
import { SyncRepository } from '../repositories/sync.repo';
import { VehicleRepository } from '../repositories/vehicle.repo';
import { WalletRepository } from '../repositories/wallet.repo';
import {
  ClientSyncBatchRequest,
  ClientSyncBatchResponse,
} from '../types/api';
import { MissionService } from './mission.service';

export class SyncService {
  private syncRepo: SyncRepository;
  private playerRepo: PlayerRepository;
  private vehicleRepo: VehicleRepository;
  private walletRepo: WalletRepository;
  private missionService: MissionService;

  constructor(db: Database) {
    this.syncRepo = new SyncRepository(db);
    this.playerRepo = new PlayerRepository(db);
    this.vehicleRepo = new VehicleRepository(db);
    this.walletRepo = new WalletRepository(db);
    this.missionService = new MissionService(db);
  }

  public processClientSqliteBatch(
    batch: ClientSyncBatchRequest
  ): ClientSyncBatchResponse | null {
    const player = this.playerRepo.findById(batch.playerId);
    if (!player) return null;

    const syncedCount = this.syncRepo.logSyncEvents(
      batch.playerId,
      batch.events
    );

    for (const ev of batch.events) {
      if (ev.eventType === 'player_move') {
        const x = Number(ev.payload.x ?? player.x);
        const y = Number(ev.payload.y ?? player.y);
        const angle = Number(ev.payload.angle ?? player.angle);
        const inVehicleId =
          typeof ev.payload.inVehicleId === 'string'
            ? ev.payload.inVehicleId
            : null;
        this.playerRepo.updatePositionAndVehicle(
          batch.playerId,
          x,
          y,
          angle,
          inVehicleId
        );
      } else if (ev.eventType === 'vehicle_move') {
        const vehicleId = String(ev.payload.vehicleId || '');
        if (vehicleId) {
          this.vehicleRepo.updateTransform(
            vehicleId,
            Number(ev.payload.x || 0),
            Number(ev.payload.y || 0),
            Number(ev.payload.angle || 0),
            Number(ev.payload.speed || 0)
          );
        }
      } else if (ev.eventType === 'mission_complete') {
        const missionId = String(ev.payload.missionId || '');
        if (missionId) {
          this.missionService.completeMission(missionId, batch.playerId);
        }
      }
    }

    const updatedPlayer = this.playerRepo.findById(batch.playerId)!;
    const wallet = this.walletRepo.ensureWallet(batch.playerId);

    return {
      syncedCount,
      player: updatedPlayer,
      wallet,
      vehicles: this.vehicleRepo.findAll(),
      serverTime: new Date().toISOString(),
    };
  }
}
