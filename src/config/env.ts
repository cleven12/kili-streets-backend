export interface EnvConfig {
  PORT: number;
  HOST: string;
  DB_PATH: string;
  CORS_ORIGIN: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

export function loadEnv(): EnvConfig {
  return {
    PORT: Number(process.env.PORT || 4000),
    HOST: process.env.HOST || '0.0.0.0',
    DB_PATH: process.env.DB_PATH || 'data/kili_streets.sqlite',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  };
}
