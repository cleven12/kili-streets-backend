import { Database } from 'bun:sqlite';
import { MissionRecord } from '../../types/domain';

export const INITIAL_MISSIONS: MissionRecord[] = [
  {
    id: 'mission-kcmc-patient',
    title: 'SAFARI YA KCMC (BAJAJI / BODA)',
    description: 'Mchukue abiria Ushirika wa Neema Center umfikishe haraka Geti Kuu la KCMC.',
    pickup_label: 'Abiria (Ushirika Center)',
    pickup_x: 1185,
    pickup_y: 1680,
    dropoff_label: 'Geti Kuu la KCMC',
    dropoff_x: 1200,
    dropoff_y: 330,
    reward_tzs: 3000,
    time_limit_seconds: 75,
    recommended_vehicle: 'bajaji',
  },
  {
    id: 'mission-mangi-supply',
    title: 'MZIGO WA DUKA LA MANGI',
    description: 'Chukua dawa na bidhaa Duka la Dawa KCMC ufikishe Duka la Mangi Ushirika.',
    pickup_label: 'Duka la Dawa KCMC',
    pickup_x: 890,
    pickup_y: 385,
    dropoff_label: 'Duka la Mangi',
    dropoff_x: 1125,
    dropoff_y: 1140,
    reward_tzs: 4500,
    time_limit_seconds: 70,
    recommended_vehicle: 'bodaboda',
  },
  {
    id: 'mission-mama-ntilie',
    title: 'CHAKULA CHA MAMA NTILIE',
    description: 'Chukua oda ya Ndizi Nyama Kwa Mama Ntilie upeleke Hosteli ya Wanafunzi.',
    pickup_label: 'Kwa Mama Ntilie',
    pickup_x: 1350,
    pickup_y: 1155,
    dropoff_label: 'Hosteli ya Wanafunzi',
    dropoff_x: 1710,
    dropoff_y: 840,
    reward_tzs: 3500,
    time_limit_seconds: 65,
    recommended_vehicle: 'bodaboda',
  },
  {
    id: 'mission-shamba-coffee',
    title: 'KAHAWA & NDIZI ZA SHAMBANI',
    description: 'Chukua gunia la ndizi Shamba la Magharibi upeleke Soko/Kijiwe cha KCMC.',
    pickup_label: 'Shamba la Migomba',
    pickup_x: 385,
    pickup_y: 1200,
    dropoff_label: 'Kijiwe cha KCMC',
    dropoff_x: 1380,
    dropoff_y: 390,
    reward_tzs: 6000,
    time_limit_seconds: 85,
    recommended_vehicle: 'bajaji',
  },
];

export function seed005Missions(db: Database): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO missions (
      id, title, description, pickup_label, pickup_x, pickup_y,
      dropoff_label, dropoff_x, dropoff_y, reward_tzs, time_limit_seconds, recommended_vehicle
    ) VALUES (
      $id, $title, $description, $pickup_label, $pickup_x, $pickup_y,
      $dropoff_label, $dropoff_x, $dropoff_y, $reward_tzs, $time_limit_seconds, $recommended_vehicle
    )
  `);
  for (const m of INITIAL_MISSIONS) {
    stmt.run({
      $id: m.id,
      $title: m.title,
      $description: m.description,
      $pickup_label: m.pickup_label,
      $pickup_x: m.pickup_x,
      $pickup_y: m.pickup_y,
      $dropoff_label: m.dropoff_label,
      $dropoff_x: m.dropoff_x,
      $dropoff_y: m.dropoff_y,
      $reward_tzs: m.reward_tzs,
      $time_limit_seconds: m.time_limit_seconds,
      $recommended_vehicle: m.recommended_vehicle,
    });
  }
}
