import { getDb } from './connection';
import { runAllMigrations } from './migrations';
import { runAllSeeds } from './seeds';

const db = getDb();
runAllMigrations(db);
runAllSeeds(db);
console.log('✓ Ushirika wa Neema & KCMC SQLite world database seeded.');
