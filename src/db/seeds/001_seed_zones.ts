import { Database } from 'bun:sqlite';
import { ZoneRecord } from '../../types/domain';

export const INITIAL_ZONES: ZoneRecord[] = [
  {
    id: 'zone-kcmc-gate',
    title: 'KCMC MAIN HOSPITAL GATE',
    subtitle: 'Referral Hospital Junction • Bajaji & Bodaboda Terminal',
    center_x: 1200,
    center_y: 340,
    radius: 360,
    danger_level: 1,
    ambient_sound: 'kcmc_traffic',
  },
  {
    id: 'zone-mangi-junction',
    title: 'MANGI CROSSROADS',
    subtitle: 'Ushirika wa Neema • Mama Ntilie Kitchen & M-Pesa Hub',
    center_x: 1200,
    center_y: 1160,
    radius: 380,
    danger_level: 1,
    ambient_sound: 'village_market',
  },
  {
    id: 'zone-ushirika-village',
    title: 'USHIRIKA WA NEEMA VILLAGE',
    subtitle: 'Moshi, Kilimanjaro • Highland Banana & Coffee Groves',
    center_x: 1200,
    center_y: 1780,
    radius: 460,
    danger_level: 1,
    ambient_sound: 'kili_breeze',
  },
  {
    id: 'zone-shamba-west',
    title: 'WEST BANANA PLANTATION',
    subtitle: 'Ushirika wa Neema • Village Shortcut Trails',
    center_x: 420,
    center_y: 1200,
    radius: 380,
    danger_level: 2,
    ambient_sound: 'banana_leaves',
  },
  {
    id: 'zone-hostel-east',
    title: 'EAST STUDENT HOSTELS',
    subtitle: 'Near KCMC • Medical Student Residences & Apartments',
    center_x: 1950,
    center_y: 950,
    radius: 380,
    danger_level: 1,
    ambient_sound: 'student_quarter',
  },
];

export function seed001Zones(db: Database): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO zones (id, title, subtitle, center_x, center_y, radius, danger_level, ambient_sound)
    VALUES ($id, $title, $subtitle, $center_x, $center_y, $radius, $danger_level, $ambient_sound)
  `);
  for (const z of INITIAL_ZONES) {
    stmt.run({
      $id: z.id,
      $title: z.title,
      $subtitle: z.subtitle,
      $center_x: z.center_x,
      $center_y: z.center_y,
      $radius: z.radius,
      $danger_level: z.danger_level,
      $ambient_sound: z.ambient_sound,
    });
  }
}
