import { createClient } from '@vercel/postgres';

if (!process.env.POSTGRES_URL_NON_POOLING) {
  throw new Error('POSTGRES_URL_NON_POOLING environment variable is not set');
}

const client = createClient({
  connectionString: process.env.POSTGRES_URL_NON_POOLING
});

export default client;

