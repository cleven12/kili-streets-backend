import { Database } from 'bun:sqlite';

export function up011CreateUserCharacters(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_characters (
      id TEXT PRIMARY KEY,
      player_id TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL,
      skin_tone TEXT NOT NULL DEFAULT '#5C3A21',
      jacket_color TEXT NOT NULL DEFAULT '#1D63B8',
      accent_color TEXT NOT NULL DEFAULT '#F4B41A',
      headgear TEXT NOT NULL DEFAULT 'none',
      bio TEXT NOT NULL DEFAULT 'Resident of Ushirika wa Neema, Kilimanjaro',
      x REAL NOT NULL DEFAULT 1125,
      y REAL NOT NULL DEFAULT 1580,
      angle REAL NOT NULL DEFAULT -1.57,
      speed REAL NOT NULL DEFAULT 52,
      in_vehicle_id TEXT,
      is_online INTEGER NOT NULL DEFAULT 1,
      reputation INTEGER NOT NULL DEFAULT 15,
      waypoints_json TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL,
      FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_user_characters_online ON user_characters(is_online);
  `);
}
