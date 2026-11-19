import { Database } from 'bun:sqlite';
import { PlayerRepository } from '../repositories/player.repo';
import { WalletRepository } from '../repositories/wallet.repo';
import { PlayerRecord, WalletRecord } from '../types/domain';

export class PlayerService {
  private playerRepo: PlayerRepository;
  private walletRepo: WalletRepository;

  constructor(db: Database) {
    this.playerRepo = new PlayerRepository(db);
    this.walletRepo = new WalletRepository(db);
  }

  public authenticateOrCreate(username: string): {
    player: PlayerRecord;
    wallet: WalletRecord;
  } {
    const cleanName = username.trim() || 'MoshiRider';
    let player = this.playerRepo.findByUsername(cleanName);
    if (!player) {
      const id = `plr_${crypto.randomUUID().slice(0, 12)}`;
      player = this.playerRepo.createPlayer(id, cleanName);
    }
    const wallet = this.walletRepo.ensureWallet(player.id);
    return { player, wallet };
  }

  public getPlayerProfile(playerId: string): {
    player: PlayerRecord;
    wallet: WalletRecord;
  } | null {
    const player = this.playerRepo.findById(playerId);
    if (!player) return null;
    const wallet = this.walletRepo.ensureWallet(playerId);
    return { player, wallet };
  }

  public updateState(
    playerId: string,
    x: number,
    y: number,
    angle: number,
    inVehicleId: string | null
  ): PlayerRecord | null {
    return this.playerRepo.updatePositionAndVehicle(
      playerId,
      x,
      y,
      angle,
      inVehicleId
    );
  }
}
