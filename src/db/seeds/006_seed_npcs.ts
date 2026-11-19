import { Database } from 'bun:sqlite';
import { NpcRecord } from '../../types/domain';

export const INITIAL_NPCS: NpcRecord[] = [
  {
    id: 'ped-mangi',
    name: 'Mangi (Dukani)',
    role: 'shopkeeper',
    shirt_color: '#E67E22',
    x: 1125,
    y: 1080,
    speed: 48,
    waypoints_json: JSON.stringify([
      { x: 1125, y: 1080 },
      { x: 1125, y: 1320 },
    ]),
    dialogue_sw: 'Karibu Duka la Mangi! M-Pesa na vocha zipo hapa.',
  },
  {
    id: 'ped-mama-ntilie',
    name: 'Mama Ntilie',
    role: 'chef',
    shirt_color: '#9B59B6',
    x: 1270,
    y: 1090,
    speed: 45,
    waypoints_json: JSON.stringify([
      { x: 1270, y: 1090 },
      { x: 1480, y: 1140 },
    ]),
    dialogue_sw: 'Supu ya moto na ndizi nyama tayari!',
  },
  {
    id: 'ped-kcmc-nurse',
    name: 'Nesi wa KCMC',
    role: 'medic',
    shirt_color: '#3498DB',
    x: 1105,
    y: 350,
    speed: 55,
    waypoints_json: JSON.stringify([
      { x: 1105, y: 350 },
      { x: 920, y: 380 },
    ]),
    dialogue_sw: 'Tafadhali endesha kwa uangalifu karibu na Geti la KCMC.',
  },
  {
    id: 'ped-villager-1',
    name: 'Mkazi wa Ushirika',
    role: 'farmer',
    shirt_color: '#2ECC71',
    x: 1130,
    y: 1620,
    speed: 52,
    waypoints_json: JSON.stringify([
      { x: 1130, y: 1620 },
      { x: 1130, y: 1890 },
      { x: 1450, y: 1890 },
    ]),
    dialogue_sw: 'Hali ya hewa ya Kilimanjaro ni safi sana leo!',
  },
  {
    id: 'ped-student-1',
    name: 'Mwanafunzi wa KCMC',
    role: 'student',
    shirt_color: '#F1C40F',
    x: 1520,
    y: 830,
    speed: 58,
    waypoints_json: JSON.stringify([
      { x: 1520, y: 830 },
      { x: 1265, y: 830 },
      { x: 1265, y: 550 },
    ]),
    dialogue_sw: 'Ninawahi kipindi asubuhi KCMC, Boda ipo wapi?',
  },
];

export function seed006Npcs(db: Database): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO npcs (id, name, role, shirt_color, x, y, speed, waypoints_json, dialogue_sw)
    VALUES ($id, $name, $role, $shirt_color, $x, $y, $speed, $waypoints_json, $dialogue_sw)
  `);
  for (const n of INITIAL_NPCS) {
    stmt.run({
      $id: n.id,
      $name: n.name,
      $role: n.role,
      $shirt_color: n.shirt_color,
      $x: n.x,
      $y: n.y,
      $speed: n.speed,
      $waypoints_json: n.waypoints_json,
      $dialogue_sw: n.dialogue_sw,
    });
  }
}
