import { createPool } from '@vercel/postgres';

const pool = process.env.POSTGRES_URL
  ? createPool({
      connectionString: process.env.POSTGRES_URL,
    })
  : null;

export default pool;

