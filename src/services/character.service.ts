import { Database } from 'bun:sqlite';
import { CharacterRepository } from '../repositories/character.repo';
import { PlayerRepository } from '../repositories/player.repo';
import { WalletRepository } from '../repositories/wallet.repo';
import {
  GenerateCharacterRequest,
  GenerateCharacterResponse,
} from '../types/api';
import { UserCharacterRecord } from '../types/domain';

export class CharacterService {
  private characterRepo: CharacterRepository;
  private playerRepo: PlayerRepository;
  private walletRepo: WalletRepository;

  constructor(db: Database) {
    this.characterRepo = new CharacterRepository(db);
    this.playerRepo = new PlayerRepository(db);
    this.walletRepo = new WalletRepository(db);
  }

  public listAllCharacters(): UserCharacterRecord[] {
    return this.characterRepo.findAll();
  }

  public generateAndRegisterUserCharacter(
    req: GenerateCharacterRequest
  ): GenerateCharacterResponse {
    const cleanUsername =
      req.username
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_') || `user_${Date.now().toString(36)}`;
    const cleanDisplayName = req.displayName.trim() || cleanUsername;

    let player = this.playerRepo.findByUsername(cleanUsername);
    if (!player) {
      const playerId = `plr_${cleanUsername}`;
      player = this.playerRepo.createPlayer(playerId, cleanUsername);
    }

    const wallet = this.walletRepo.ensureWallet(player.id);
    const character = this.characterRepo.upsertCharacter(player.id, {
      ...req,
      username: cleanUsername,
      displayName: cleanDisplayName,
    });

    return {
      player,
      character,
      wallet,
      allCharacters: this.characterRepo.findAll(),
    };
  }
}
