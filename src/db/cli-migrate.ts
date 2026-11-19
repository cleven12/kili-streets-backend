import { getDb } from './connection';
import { runAllMigrations } from './migrations';

const db = getDb();
runAllMigrations(db);
console.log('✓ SQLite migrations applied successfully (WAL mode enabled).');
