import { Database } from 'bun:sqlite';
import { WORLD_BOUNDS } from '../config/constants';
import { WalletRecord, WalletTransactionRecord } from '../types/domain';

export class WalletRepository {
  constructor(private db: Database) {}

  public findByPlayerId(playerId: string): WalletRecord | null {
    return (
      (this.db
        .query('SELECT * FROM wallets WHERE player_id = $playerId')
        .get({ $playerId: playerId }) as WalletRecord | null) || null
    );
  }

  public ensureWallet(playerId: string): WalletRecord {
    const existing = this.findByPlayerId(playerId);
    if (existing) return existing;

    const now = new Date().toISOString();
    this.db
      .prepare(
        `INSERT INTO wallets (player_id, balance_tzs, total_earned_tzs, total_spent_tzs, updated_at)
         VALUES ($playerId, $initial, $initial, 0, $now)`
      )
      .run({
        $playerId: playerId,
        $initial: WORLD_BOUNDS.STARTING_BALANCE_TZS,
        $now: now,
      });
    return this.findByPlayerId(playerId)!;
  }

  public recordTransaction(
    playerId: string,
    amountTzs: number,
    txType: WalletTransactionRecord['tx_type'],
    description: string,
    referenceId: string | null = null
  ): WalletRecord {
    const now = new Date().toISOString();
    const txId = `tx_${crypto.randomUUID()}`;

    const runTx = this.db.transaction(() => {
      this.ensureWallet(playerId);
      const earnedDelta = amountTzs > 0 ? amountTzs : 0;
      const spentDelta = amountTzs < 0 ? Math.abs(amountTzs) : 0;

      this.db
        .prepare(
          `UPDATE wallets
           SET balance_tzs = MAX(0, balance_tzs + $amountTzs),
               total_earned_tzs = total_earned_tzs + $earnedDelta,
               total_spent_tzs = total_spent_tzs + $spentDelta,
               updated_at = $now
           WHERE player_id = $playerId`
        )
        .run({
          $playerId: playerId,
          $amountTzs: amountTzs,
          $earnedDelta: earnedDelta,
          $spentDelta: spentDelta,
          $now: now,
        });

      this.db
        .prepare(
          `INSERT INTO wallet_transactions (id, player_id, amount_tzs, tx_type, reference_id, description, created_at)
           VALUES ($id, $playerId, $amountTzs, $txType, $referenceId, $description, $now)`
        )
        .run({
          $id: txId,
          $playerId: playerId,
          $amountTzs: amountTzs,
          $txType: txType,
          $referenceId: referenceId,
          $description: description,
          $now: now,
        });
    });

    runTx();
    return this.findByPlayerId(playerId)!;
  }

  public listTransactions(playerId: string, limit = 25): WalletTransactionRecord[] {
    return this.db
      .query(
        `SELECT * FROM wallet_transactions
         WHERE player_id = $playerId
         ORDER BY created_at DESC
         LIMIT $limit`
      )
      .all({ $playerId: playerId, $limit: limit }) as WalletTransactionRecord[];
  }
}
