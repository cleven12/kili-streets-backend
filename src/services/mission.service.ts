import { Database } from 'bun:sqlite';
import { MissionRepository } from '../repositories/mission.repo';
import { PlayerRepository } from '../repositories/player.repo';
import { WalletRepository } from '../repositories/wallet.repo';
import {
  MissionRecord,
  MissionRunRecord,
  WalletRecord,
} from '../types/domain';

export class MissionService {
  private missionRepo: MissionRepository;
  private walletRepo: WalletRepository;
  private playerRepo: PlayerRepository;

  constructor(db: Database) {
    this.missionRepo = new MissionRepository(db);
    this.walletRepo = new WalletRepository(db);
    this.playerRepo = new PlayerRepository(db);
  }

  public listMissions(): MissionRecord[] {
    return this.missionRepo.findAll();
  }

  public startMission(missionId: string, playerId: string): MissionRunRecord | null {
    const mission = this.missionRepo.findById(missionId);
    const player = this.playerRepo.findById(playerId);
    if (!mission || !player) return null;

    return this.missionRepo.createMissionRun(missionId, playerId);
  }

  public completeMission(
    missionId: string,
    playerId: string,
    runId?: string
  ): {
    mission: MissionRecord;
    wallet: WalletRecord;
    run: MissionRunRecord;
  } | null {
    const mission = this.missionRepo.findById(missionId);
    const player = this.playerRepo.findById(playerId);
    if (!mission || !player) return null;

    let run = runId
      ? this.missionRepo.completeMissionRun(runId, mission.reward_tzs)
      : null;

    if (!run) {
      const created = this.missionRepo.createMissionRun(missionId, playerId);
      run = this.missionRepo.completeMissionRun(created.id, mission.reward_tzs)!;
    }

    const wallet = this.walletRepo.recordTransaction(
      playerId,
      mission.reward_tzs,
      'mission_reward',
      `Malipo ya Misheni: ${mission.title}`,
      mission.id
    );

    this.playerRepo.incrementReputation(playerId, 5);

    return { mission, wallet, run };
  }
}
