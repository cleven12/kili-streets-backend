import { Database } from 'bun:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { loadEnv } from '../config/env';

let dbInstance: Database | null = null;

export function createSqliteConnection(customPath?: string): Database {
  const env = loadEnv();
  const targetPath = customPath || env.DB_PATH;

  if (targetPath !== ':memory:') {
    mkdirSync(dirname(targetPath), { recursive: true });
  }

  const db = new Database(targetPath, { create: true });

  // Tune SQLite for high-concurrency low-latency game state reads/writes
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA synchronous = NORMAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA temp_store = MEMORY;');
  db.exec('PRAGMA cache_size = -16000;');

  return db;
}

export function getDb(): Database {
  if (!dbInstance) {
    dbInstance = createSqliteConnection();
  }
  return dbInstance;
}

export function setDbForTesting(db: Database): void {
  dbInstance = db;
}
