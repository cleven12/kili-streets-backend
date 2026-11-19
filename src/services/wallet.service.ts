import { Database } from 'bun:sqlite';
import { WalletRepository } from '../repositories/wallet.repo';
import { WalletRecord, WalletTransactionRecord } from '../types/domain';

export class WalletService {
  private walletRepo: WalletRepository;

  constructor(db: Database) {
    this.walletRepo = new WalletRepository(db);
  }

  public getWalletWithHistory(playerId: string): {
    wallet: WalletRecord;
    transactions: WalletTransactionRecord[];
  } {
    const wallet = this.walletRepo.ensureWallet(playerId);
    const transactions = this.walletRepo.listTransactions(playerId);
    return { wallet, transactions };
  }

  public purchaseItem(
    playerId: string,
    costTzs: number,
    category: 'fuel_purchase' | 'food_mama_ntilie' | 'mangi_shop' | 'repair',
    itemName: string
  ): { success: boolean; wallet: WalletRecord; message: string } {
    const current = this.walletRepo.ensureWallet(playerId);
    if (current.balance_tzs < costTzs) {
      return {
        success: false,
        wallet: current,
        message: 'Salio la TZS halitoshi!',
      };
    }

    const updated = this.walletRepo.recordTransaction(
      playerId,
      -Math.abs(costTzs),
      category,
      `Manunuzi: ${itemName}`
    );

    return {
      success: true,
      wallet: updated,
      message: `Umenunua ${itemName} (-TZS ${costTzs.toLocaleString()})`,
    };
  }
}
