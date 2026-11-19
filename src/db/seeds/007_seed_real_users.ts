import { Database } from 'bun:sqlite';
import { UserCharacterRecord } from '../../types/domain';

export const INITIAL_REAL_USER_CHARACTERS: UserCharacterRecord[] = [
  {
    id: 'char_cleven12',
    player_id: 'plr_cleven12',
    username: 'cleven12',
    display_name: 'Cleven Godson',
    role: 'Software Engineer',
    skin_tone: '#4A2C18',
    jacket_color: '#1D63B8',
    accent_color: '#F4B41A',
    headgear: 'cap',
    bio: 'Lead Software Engineer living in Ushirika wa Neema near KCMC, Kilimanjaro.',
    x: 1125,
    y: 1580,
    angle: -1.57,
    speed: 54,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 50,
    waypoints_json: JSON.stringify([
      { x: 1125, y: 1580 },
      { x: 1125, y: 1160 },
    ]),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'char_neema_kcmc',
    player_id: 'plr_neema_kcmc',
    username: 'dr_neema',
    display_name: 'Dr. Neema Massawe',
    role: 'KCMC Medic',
    skin_tone: '#5C3A21',
    jacket_color: '#2B5B84',
    accent_color: '#2ECC71',
    headgear: 'none',
    bio: 'Emergency Resident Doctor at KCMC Referral Hospital.',
    x: 1105,
    y: 350,
    angle: 0,
    speed: 55,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 42,
    waypoints_json: JSON.stringify([
      { x: 1105, y: 350 },
      { x: 910, y: 375 },
      { x: 1250, y: 355 },
    ]),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'char_mangi_kimaro',
    player_id: 'plr_mangi_kimaro',
    username: 'mangi_kimaro',
    display_name: 'Mangi Kimaro',
    role: 'Kilimanjaro Trader',
    skin_tone: '#6E472B',
    jacket_color: '#D97724',
    accent_color: '#F8F9FA',
    headgear: 'cap',
    bio: 'Founder of Mangi General Store & M-Pesa Agent in Ushirika wa Neema.',
    x: 1125,
    y: 1080,
    angle: 1.57,
    speed: 48,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 38,
    waypoints_json: JSON.stringify([
      { x: 1125, y: 1080 },
      { x: 1125, y: 1310 },
      { x: 1320, y: 1140 },
    ]),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'char_boda_juma',
    player_id: 'plr_boda_juma',
    username: 'juma_boxer150',
    display_name: 'Juma Mushi',
    role: 'Bodaboda Rider',
    skin_tone: '#4A2C18',
    jacket_color: '#E03131',
    accent_color: '#F4B41A',
    headgear: 'helmet',
    bio: 'Fastest Boxer 150 rider on the KCMC - Ushirika wa Neema route.',
    x: 1370,
    y: 380,
    angle: 3.14,
    speed: 58,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 35,
    waypoints_json: JSON.stringify([
      { x: 1370, y: 380 },
      { x: 1200, y: 620 },
      { x: 1200, y: 380 },
    ]),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'char_student_grace',
    player_id: 'plr_student_grace',
    username: 'grace_kcmc',
    display_name: 'Grace Shirima',
    role: 'University Student',
    skin_tone: '#5C3A21',
    jacket_color: '#8E44AD',
    accent_color: '#F1C40F',
    headgear: 'beanie',
    bio: 'Medical student living at East Hostels near Ushirika wa Neema.',
    x: 1520,
    y: 830,
    angle: 0,
    speed: 56,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 28,
    waypoints_json: JSON.stringify([
      { x: 1520, y: 830 },
      { x: 1265, y: 830 },
      { x: 1265, y: 540 },
    ]),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'char_captain_baraka',
    player_id: 'plr_captain_baraka',
    username: 'baraka_tvs',
    display_name: 'Baraka Lyimo',
    role: 'Bajaji Captain',
    skin_tone: '#4A2C18',
    jacket_color: '#1B8A5A',
    accent_color: '#F4B41A',
    headgear: 'cap',
    bio: 'TVS King Bajaji driver connecting Ushirika wa Neema residents to Moshi.',
    x: 1135,
    y: 1640,
    angle: 0,
    speed: 52,
    in_vehicle_id: null,
    is_online: 1,
    reputation: 33,
    waypoints_json: JSON.stringify([
      { x: 1135, y: 1640 },
      { x: 1135, y: 1885 },
      { x: 1450, y: 1885 },
    ]),
    updated_at: new Date().toISOString(),
  },
];

export function seed007RealUsers(db: Database): void {
  const playerStmt = db.prepare(`
    INSERT OR IGNORE INTO players (id, username, home_zone, x, y, angle, health, stamina, reputation, in_vehicle_id, updated_at)
    VALUES ($id, $username, 'zone-ushirika-village', $x, $y, $angle, 100, 100, $reputation, NULL, $updated_at)
  `);

  const walletStmt = db.prepare(`
    INSERT OR IGNORE INTO wallets (player_id, balance_tzs, total_earned_tzs, total_spent_tzs, updated_at)
    VALUES ($player_id, 7500, 7500, 0, $updated_at)
  `);

  const charStmt = db.prepare(`
    INSERT OR REPLACE INTO user_characters (
      id, player_id, username, display_name, role, skin_tone, jacket_color, accent_color,
      headgear, bio, x, y, angle, speed, in_vehicle_id, is_online, reputation, waypoints_json, updated_at
    ) VALUES (
      $id, $player_id, $username, $display_name, $role, $skin_tone, $jacket_color, $accent_color,
      $headgear, $bio, $x, $y, $angle, $speed, $in_vehicle_id, $is_online, $reputation, $waypoints_json, $updated_at
    )
  `);

  for (const u of INITIAL_REAL_USER_CHARACTERS) {
    playerStmt.run({
      $id: u.player_id,
      $username: u.username,
      $x: u.x,
      $y: u.y,
      $angle: u.angle,
      $reputation: u.reputation,
      $updated_at: u.updated_at,
    });

    walletStmt.run({
      $player_id: u.player_id,
      $updated_at: u.updated_at,
    });

    charStmt.run({
      $id: u.id,
      $player_id: u.player_id,
      $username: u.username,
      $display_name: u.display_name,
      $role: u.role,
      $skin_tone: u.skin_tone,
      $jacket_color: u.jacket_color,
      $accent_color: u.accent_color,
      $headgear: u.headgear,
      $bio: u.bio,
      $x: u.x,
      $y: u.y,
      $angle: u.angle,
      $speed: u.speed,
      $in_vehicle_id: u.in_vehicle_id,
      $is_online: u.is_online,
      $reputation: u.reputation,
      $waypoints_json: u.waypoints_json,
      $updated_at: u.updated_at,
    });
  }
}
