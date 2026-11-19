import { Database } from 'bun:sqlite';

export function up006CreateWalletsAndTransactions(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS wallets (
      player_id TEXT PRIMARY KEY,
      balance_tzs INTEGER NOT NULL DEFAULT 5000,
      total_earned_tzs INTEGER NOT NULL DEFAULT 5000,
      total_spent_tzs INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id TEXT PRIMARY KEY,
      player_id TEXT NOT NULL,
      amount_tzs INTEGER NOT NULL,
      tx_type TEXT NOT NULL,
      reference_id TEXT,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_wallet_tx_player ON wallet_transactions(player_id, created_at);
  `);
}
