import { describe, expect, test } from 'bun:test';
import { createSqliteConnection } from '../src/db/connection';
import { runAllMigrations } from '../src/db/migrations';
import { runAllSeeds } from '../src/db/seeds';
import { MissionService } from '../src/services/mission.service';
import { PlayerService } from '../src/services/player.service';
import { SyncService } from '../src/services/sync.service';
import { VehicleService } from '../src/services/vehicle.service';
import { WalletService } from '../src/services/wallet.service';

describe('Backend Domain Services (Player, Vehicle, Mission, Wallet, Sync)', () => {
  test('authenticates player, enters Bajaji, completes KCMC mission, and syncs client SQLite batch', () => {
    const db = createSqliteConnection(':memory:');
    runAllMigrations(db);
    runAllSeeds(db);

    const playerService = new PlayerService(db);
    const vehicleService = new VehicleService(db);
    const missionService = new MissionService(db);
    const walletService = new WalletService(db);
    const syncService = new SyncService(db);

    // 1. Auth player
    const { player, wallet } = playerService.authenticateOrCreate('ClevenKili');
    expect(player.username).toBe('ClevenKili');
    expect(wallet.balance_tzs).toBe(5000);

    // 2. Enter Bajaji
    const enterRes = vehicleService.enterVehicle(player.id, 'bajaji-ushirika-1');
    expect(enterRes).not.toBeNull();
    expect(enterRes!.player.in_vehicle_id).toBe('bajaji-ushirika-1');
    expect(enterRes!.vehicle.driver_player_id).toBe(player.id);

    // 3. Complete Safari ya KCMC Mission (+3,000 TZS)
    const completeRes = missionService.completeMission(
      'mission-kcmc-patient',
      player.id
    );
    expect(completeRes).not.toBeNull();
    expect(completeRes!.wallet.balance_tzs).toBe(8000);

    // 4. Buy Ndizi Nyama at Kwa Mama Ntilie (-1,500 TZS)
    const purchase = walletService.purchaseItem(
      player.id,
      1500,
      'food_mama_ntilie',
      'Ndizi Nyama & Supu'
    );
    expect(purchase.success).toBe(true);
    expect(purchase.wallet.balance_tzs).toBe(6500);

    // 5. Process Client SQLite delta batch
    const syncRes = syncService.processClientSqliteBatch({
      playerId: player.id,
      clientSqliteVersion: 1,
      events: [
        {
          eventId: 'ev_101',
          eventType: 'player_move',
          timestamp: new Date().toISOString(),
          payload: { x: 1200, y: 340, angle: 0, inVehicleId: 'bajaji-ushirika-1' },
        },
      ],
    });
    expect(syncRes).not.toBeNull();
    expect(syncRes!.syncedCount).toBe(1);
    expect(syncRes!.player.y).toBe(340);
  });
});
