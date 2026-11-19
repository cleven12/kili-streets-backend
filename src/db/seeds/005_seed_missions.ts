import { Database } from 'bun:sqlite';
import { MissionRecord } from '../../types/domain';

export const INITIAL_MISSIONS: MissionRecord[] = [
  {
    id: 'mission-kcmc-patient',
    title: 'KCMC HOSPITAL EXPRESS (BAJAJI / BODA)',
    description:
      'Pick up a passenger at Ushirika wa Neema Center and rush them safely to KCMC Main Gate.',
    pickup_label: 'Passenger (Ushirika Center)',
    pickup_x: 1185,
    pickup_y: 1680,
    dropoff_label: 'KCMC Hospital Main Gate',
    dropoff_x: 1200,
    dropoff_y: 330,
    reward_tzs: 3000,
    time_limit_seconds: 75,
    recommended_vehicle: 'bajaji',
  },
  {
    id: 'mission-mangi-supply',
    title: 'MANGI STORE SUPPLY RUN',
    description:
      'Collect urgent medical & shop supplies at KCMC Pharmacy and deliver them to Mangi General Store.',
    pickup_label: 'KCMC Medical Pharmacy',
    pickup_x: 890,
    pickup_y: 385,
    dropoff_label: 'Mangi General Store',
    dropoff_x: 1125,
    dropoff_y: 1140,
    reward_tzs: 4500,
    time_limit_seconds: 70,
    recommended_vehicle: 'bodaboda',
  },
  {
    id: 'mission-mama-ntilie',
    title: 'MAMA NTILIE HOT LUNCH DELIVERY',
    description:
      'Pick up hot lunch orders at Mama Ntilie Kitchen and deliver them to KCMC Student Hostels.',
    pickup_label: 'Mama Ntilie Kitchen',
    pickup_x: 1350,
    pickup_y: 1155,
    dropoff_label: 'KCMC Student Hostels',
    dropoff_x: 1710,
    dropoff_y: 840,
    reward_tzs: 3500,
    time_limit_seconds: 65,
    recommended_vehicle: 'bodaboda',
  },
  {
    id: 'mission-shamba-coffee',
    title: 'KILIMANJARO COFFEE & BANANA CARGO',
    description:
      'Load fresh highland coffee & banana harvest at West Plantation and transport it to KCMC Terminal.',
    pickup_label: 'West Banana Plantation',
    pickup_x: 385,
    pickup_y: 1200,
    dropoff_label: 'KCMC Terminal Stage',
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
