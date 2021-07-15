import { config } from 'dotenv';
config();

const {
  NODE_ENV,
  PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_TEST_DB,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  DATABASE_SSL,
  DB_SYNC,
} = process.env;

export const global = {
  nodeEnv: NODE_ENV,
  port: PORT,
};

export const db = {
  database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST || 'localhost',
  ssl: DATABASE_SSL === 'true',
  sync: DB_SYNC === 'true',
};

export const jwt = {
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRES_IN,
};
