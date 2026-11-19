export const WORLD_BOUNDS = {
  WIDTH: 2400,
  HEIGHT: 2400,
  REGION_NAME: 'Ushirika wa Neema & KCMC — Moshi, Kilimanjaro',
  DEFAULT_SPAWN_X: 1125,
  DEFAULT_SPAWN_Y: 1580,
  STARTING_BALANCE_TZS: 5000,
} as const;

export const SURFACE_PHYSICS = {
  tarmac: { speedFactor: 1.0, driftGripFactor: 1.0, rollingDrag: 120 },
  murram: { speedFactor: 0.92, driftGripFactor: 0.85, rollingDrag: 135 },
  grass: { speedFactor: 0.72, driftGripFactor: 0.75, rollingDrag: 210 },
} as const;
