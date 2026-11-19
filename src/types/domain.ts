export type SurfaceType = 'tarmac' | 'murram' | 'grass';
export type VehicleKind = 'bodaboda' | 'bajaji' | 'daladala';

export type CharacterRole =
  | 'Software Engineer'
  | 'Bodaboda Rider'
  | 'Bajaji Captain'
  | 'KCMC Medic'
  | 'Kilimanjaro Trader'
  | 'University Student';

export type HeadgearStyle = 'none' | 'helmet' | 'cap' | 'beanie';

export interface ZoneRecord {
  id: string;
  title: string;
  subtitle: string;
  center_x: number;
  center_y: number;
  radius: number;
  danger_level: number;
  ambient_sound: string;
}

export interface BuildingRecord {
  id: string;
  zone_id: string;
  name: string;
  label: string | null;
  category:
    | 'hospital'
    | 'pharmacy'
    | 'shop'
    | 'food'
    | 'hostel'
    | 'community'
    | 'residential';
  x: number;
  y: number;
  width: number;
  height: number;
  roof_color: string;
  wall_color: string;
}

export interface RoadRecord {
  id: string;
  name: string;
  surface: 'tarmac' | 'murram';
  orientation: 'horizontal' | 'vertical';
  x: number;
  y: number;
  width: number;
  height: number;
  has_center_line: number;
}

export interface TreeRecord {
  id: string;
  kind: 'banana' | 'acacia' | 'coffee';
  x: number;
  y: number;
  radius: number;
}

export interface VehicleRecord {
  id: string;
  kind: VehicleKind;
  display_name: string;
  plate_number: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  max_speed: number;
  reverse_speed: number;
  acceleration: number;
  braking: number;
  turn_speed: number;
  drift_grip: number;
  width: number;
  length: number;
  primary_color: string;
  secondary_color: string;
  is_ai: number;
  driver_player_id: string | null;
  fuel_level: number;
  condition_percent: number;
}

export interface PlayerRecord {
  id: string;
  username: string;
  home_zone: string;
  x: number;
  y: number;
  angle: number;
  health: number;
  stamina: number;
  reputation: number;
  in_vehicle_id: string | null;
  updated_at: string;
}

export interface UserCharacterRecord {
  id: string;
  player_id: string;
  username: string;
  display_name: string;
  role: CharacterRole;
  skin_tone: string;
  jacket_color: string;
  accent_color: string;
  headgear: HeadgearStyle;
  bio: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  in_vehicle_id: string | null;
  is_online: number;
  reputation: number;
  waypoints_json: string;
  updated_at: string;
}

export interface WalletRecord {
  player_id: string;
  balance_tzs: number;
  total_earned_tzs: number;
  total_spent_tzs: number;
  updated_at: string;
}

export interface WalletTransactionRecord {
  id: string;
  player_id: string;
  amount_tzs: number;
  tx_type:
    | 'mission_reward'
    | 'fuel_purchase'
    | 'food_mama_ntilie'
    | 'mangi_shop'
    | 'repair';
  reference_id: string | null;
  description: string;
  created_at: string;
}

export interface MissionRecord {
  id: string;
  title: string;
  description: string;
  pickup_label: string;
  pickup_x: number;
  pickup_y: number;
  dropoff_label: string;
  dropoff_x: number;
  dropoff_y: number;
  reward_tzs: number;
  time_limit_seconds: number;
  recommended_vehicle: VehicleKind | null;
}

export interface MissionRunRecord {
  id: string;
  mission_id: string;
  player_id: string;
  stage: 'pickup' | 'dropoff' | 'completed' | 'expired';
  started_at: string;
  completed_at: string | null;
  earned_tzs: number;
}

export interface NpcRecord {
  id: string;
  name: string;
  role: string;
  shirt_color: string;
  x: number;
  y: number;
  speed: number;
  waypoints_json: string;
  dialogue_sw: string;
}
