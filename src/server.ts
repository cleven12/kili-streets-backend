import { loadEnv } from './config/env';
import { getDb } from './db/connection';
import { runAllMigrations } from './db/migrations';
import { runAllSeeds } from './db/seeds';
import { createApiRouter } from './routes/router';

const env = loadEnv();
const db = getDb();

// Ensure SQLite schema and Ushirika wa Neema / KCMC world data are migrated & seeded
runAllMigrations(db);
runAllSeeds(db);

const handleApiRequest = createApiRouter(db);

const server = Bun.serve({
  port: env.PORT,
  hostname: env.HOST,
  fetch(req, srv) {
    const url = new URL(req.url);
    if (url.pathname === '/ws/world') {
      const upgraded = srv.upgrade(req);
      if (upgraded) return undefined;
      return new Response('WebSocket upgrade failed', { status: 400 });
    }
    return handleApiRequest(req);
  },
  websocket: {
    open(ws) {
      ws.subscribe('kili-world');
      ws.send(
        JSON.stringify({
          type: 'connected',
          region: 'Ushirika wa Neema & KCMC',
          timestamp: new Date().toISOString(),
        })
      );
    },
    message(ws, message) {
      // Broadcast real-time player/vehicle position updates to connected clients
      ws.publish('kili-world', String(message));
    },
    close(ws) {
      ws.unsubscribe('kili-world');
    },
  },
});

console.log(
  `🚀 Kili Streets Backend (Bun + SQLite WAL) listening on http://${server.hostname}:${server.port}`
);
