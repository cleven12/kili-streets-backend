import {
  BuildingRecord,
  MissionRecord,
  NpcRecord,
  PlayerRecord,
  RoadRecord,
  TreeRecord,
  VehicleRecord,
  WalletRecord,
  ZoneRecord,
} from './domain';

export interface WorldBootstrapPayload {
  version: number;
  region: string;
  serverTime: string;
  zones: ZoneRecord[];
  roads: RoadRecord[];
  buildings: BuildingRecord[];
  trees: TreeRecord[];
  vehicles: VehicleRecord[];
  missions: MissionRecord[];
  npcs: NpcRecord[];
}

export interface ClientSyncEvent {
  eventId: string;
  eventType: 'player_move' | 'vehicle_move' | 'mission_complete' | 'shop_purchase';
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface ClientSyncBatchRequest {
  playerId: string;
  clientSqliteVersion: number;
  events: ClientSyncEvent[];
}

export interface ClientSyncBatchResponse {
  syncedCount: number;
  player: PlayerRecord;
  wallet: WalletRecord;
  vehicles: VehicleRecord[];
  serverTime: string;
}
