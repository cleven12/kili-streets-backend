# Kili Streets Backend (`Ushirika wa Neema & KCMC`)

High-performance open-world game backend built with **Bun** and **Native SQLite (`bun:sqlite` in WAL Mode)** for **Kili Streets: Ushirika wa Neema & KCMC (Moshi, Kilimanjaro)**.

## Architecture Highlights
- **Runtime:** Bun (`v1.4+`) native HTTP & WebSocket server
- **Database:** `bun:sqlite` with Write-Ahead Logging (`WAL`), foreign keys, and in-memory temp store for `<0.2ms` query latency
- **Client SQLite Sync:** Dedicated bootstrap & delta-sync endpoints (`/api/v1/world/bootstrap` & `/api/v1/sync/batch`) designed to hydrate and synchronize the separate Client SQLite database
- **Domain Modules:**
  - `zones` — Geographic zones across *Ushirika wa Neema*, *Geti Kuu la KCMC*, *Njia Panda ya Mangi*, and *Shamba la Migomba*
  - `buildings` — Colliders & landmarks (*Hospitali ya KCMC*, *Duka la Dawa*, *Duka la Mangi*, *Kwa Mama Ntilie*, *Ushirika Center*)
  - `roads` — Paved tarmac and volcanic red-earth murram roads
  - `vehicles` — *Bodaboda (Boxer 150)*, *Bajaji (TVS King)*, and *Daladala (KCMC - Moshi Town)* physics specs & live coordinates
  - `players` & `wallets` — Player state, stamina, reputation, and TZS (Tanzanian Shilling) transaction ledger
  - `missions` & `npcs` — Local street missions (*Misheni za Mtaani*) and villager/hospital waypoint routines
