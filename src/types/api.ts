import {
  BuildingRecord,
  CharacterRole,
  HeadgearStyle,
  MissionRecord,
  NpcRecord,
  PlayerRecord,
  RoadRecord,
  TreeRecord,
  UserCharacterRecord,
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
  characters: UserCharacterRecord[];
  npcs: NpcRecord[];
}

export interface GenerateCharacterRequest {
  username: string;
  displayName: string;
  role: CharacterRole;
  skinTone: string;
  jacketColor: string;
  accentColor: string;
  headgear: HeadgearStyle;
  bio?: string;
}

export interface GenerateCharacterResponse {
  player: PlayerRecord;
  character: UserCharacterRecord;
  wallet: WalletRecord;
  allCharacters: UserCharacterRecord[];
}

export interface ClientSyncEvent {
  eventId: string;
  eventType:
    | 'player_move'
    | 'vehicle_move'
    | 'mission_complete'
    | 'shop_purchase'
    | 'character_update';
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
  characters: UserCharacterRecord[];
  serverTime: string;
}
