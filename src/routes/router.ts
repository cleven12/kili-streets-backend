import { Database } from 'bun:sqlite';
import { CharacterService } from '../services/character.service';
import { MissionService } from '../services/mission.service';
import { PlayerService } from '../services/player.service';
import { SyncService } from '../services/sync.service';
import { VehicleService } from '../services/vehicle.service';
import { WalletService } from '../services/wallet.service';
import { WorldService } from '../services/world.service';
import {
  ClientSyncBatchRequest,
  GenerateCharacterRequest,
} from '../types/api';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Sqlite-Version',
  'Content-Type': 'application/json',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS_HEADERS,
  });
}

export function createApiRouter(db: Database) {
  const worldService = new WorldService(db);
  const playerService = new PlayerService(db);
  const characterService = new CharacterService(db);
  const vehicleService = new VehicleService(db);
  const missionService = new MissionService(db);
  const walletService = new WalletService(db);
  const syncService = new SyncService(db);

  return async function handleRequest(req: Request): Promise<Response> {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(req.url);
    const path = url.pathname;

    try {
      // 1. Health & SQLite WAL status check
      if (req.method === 'GET' && path === '/api/v1/health') {
        const walRow = db.query('PRAGMA journal_mode;').get() as {
          journal_mode: string;
        };
        return jsonResponse({
          status: 'ok',
          service: 'kili-streets-backend',
          region: 'Ushirika wa Neema & KCMC (Moshi, Kilimanjaro)',
          sqliteJournalMode: walRow.journal_mode,
          timestamp: new Date().toISOString(),
        });
      }

      // 2. World Bootstrap Snapshot (hydrates Client-Side SQLite database)
      if (req.method === 'GET' && path === '/api/v1/world/bootstrap') {
        return jsonResponse(worldService.getBootstrapSnapshot());
      }

      // 3. Real User Characters List & Character Generator Endpoint
      if (req.method === 'GET' && path === '/api/v1/characters') {
        return jsonResponse({
          characters: characterService.listAllCharacters(),
        });
      }

      if (req.method === 'POST' && path === '/api/v1/characters/generate') {
        const body = (await req.json()) as GenerateCharacterRequest;
        const created =
          characterService.generateAndRegisterUserCharacter(body);
        return jsonResponse(created, 201);
      }

      // 4. Player Auth / Profile Initialization
      if (req.method === 'POST' && path === '/api/v1/players/auth') {
        const body = (await req.json()) as { username?: string };
        const result = playerService.authenticateOrCreate(
          body.username || 'cleven12'
        );
        return jsonResponse(result, 200);
      }

      // 5. Get Player Profile & Wallet
      const playerMatch = path.match(/^\/api\/v1\/players\/([^/]+)$/);
      if (req.method === 'GET' && playerMatch) {
        const profile = playerService.getPlayerProfile(playerMatch[1]);
        if (!profile) {
          return jsonResponse({ error: 'Player not found' }, 404);
        }
        return jsonResponse(profile);
      }

      // 6. Update Player Position
      const playerStateMatch = path.match(/^\/api\/v1\/players\/([^/]+)\/state$/);
      if (req.method === 'PATCH' && playerStateMatch) {
        const body = (await req.json()) as {
          x: number;
          y: number;
          angle: number;
          inVehicleId?: string | null;
        };
        const updated = playerService.updateState(
          playerStateMatch[1],
          body.x,
          body.y,
          body.angle,
          body.inVehicleId ?? null
        );
        if (!updated) return jsonResponse({ error: 'Player not found' }, 404);
        return jsonResponse({ player: updated });
      }

      // 7. Vehicles List, Enter, Exit
      if (req.method === 'GET' && path === '/api/v1/vehicles') {
        return jsonResponse({ vehicles: vehicleService.listVehicles() });
      }

      const vehicleEnterMatch = path.match(/^\/api\/v1\/vehicles\/([^/]+)\/enter$/);
      if (req.method === 'POST' && vehicleEnterMatch) {
        const body = (await req.json()) as { playerId: string };
        const res = vehicleService.enterVehicle(body.playerId, vehicleEnterMatch[1]);
        if (!res) return jsonResponse({ error: 'Vehicle or player not found' }, 404);
        return jsonResponse(res);
      }

      const vehicleExitMatch = path.match(/^\/api\/v1\/vehicles\/([^/]+)\/exit$/);
      if (req.method === 'POST' && vehicleExitMatch) {
        const body = (await req.json()) as {
          playerId: string;
          x?: number;
          y?: number;
        };
        const res = vehicleService.exitVehicle(
          body.playerId,
          vehicleExitMatch[1],
          body.x,
          body.y
        );
        if (!res) return jsonResponse({ error: 'Vehicle or player not found' }, 404);
        return jsonResponse(res);
      }

      // 8. Missions List, Start, Complete
      if (req.method === 'GET' && path === '/api/v1/missions') {
        return jsonResponse({ missions: missionService.listMissions() });
      }

      const missionStartMatch = path.match(/^\/api\/v1\/missions\/([^/]+)\/start$/);
      if (req.method === 'POST' && missionStartMatch) {
        const body = (await req.json()) as { playerId: string };
        const run = missionService.startMission(missionStartMatch[1], body.playerId);
        if (!run) return jsonResponse({ error: 'Mission or player not found' }, 404);
        return jsonResponse({ run }, 201);
      }

      const missionCompleteMatch = path.match(
        /^\/api\/v1\/missions\/([^/]+)\/complete$/
      );
      if (req.method === 'POST' && missionCompleteMatch) {
        const body = (await req.json()) as { playerId: string; runId?: string };
        const res = missionService.completeMission(
          missionCompleteMatch[1],
          body.playerId,
          body.runId
        );
        if (!res) return jsonResponse({ error: 'Mission or player not found' }, 404);
        return jsonResponse(res);
      }

      // 9. Wallet & Shop Purchases
      const walletMatch = path.match(/^\/api\/v1\/wallets\/([^/]+)$/);
      if (req.method === 'GET' && walletMatch) {
        return jsonResponse(walletService.getWalletWithHistory(walletMatch[1]));
      }

      const shopPurchaseMatch = path.match(/^\/api\/v1\/wallets\/([^/]+)\/purchase$/);
      if (req.method === 'POST' && shopPurchaseMatch) {
        const body = (await req.json()) as {
          costTzs: number;
          category: 'fuel_purchase' | 'food_mama_ntilie' | 'mangi_shop' | 'repair';
          itemName: string;
        };
        const res = walletService.purchaseItem(
          shopPurchaseMatch[1],
          body.costTzs,
          body.category,
          body.itemName
        );
        return jsonResponse(res, res.success ? 200 : 400);
      }

      // 10. Client SQLite Delta Batch Sync Endpoint
      if (req.method === 'POST' && path === '/api/v1/sync/batch') {
        const body = (await req.json()) as ClientSyncBatchRequest;
        const synced = syncService.processClientSqliteBatch(body);
        if (!synced) return jsonResponse({ error: 'Player not found' }, 404);
        return jsonResponse(synced);
      }

      return jsonResponse({ error: 'Route not found', path }, 404);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal server error';
      return jsonResponse({ error: message }, 500);
    }
  };
}
