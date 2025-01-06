import { createClient } from '@vercel/postgres';

// Add debug logging
const dbUrl = process.env.POSTGRES_URL_NON_POOLING;
console.log('Database URL configured:', !!dbUrl);

if (!dbUrl) {
  console.error('Database connection error: POSTGRES_URL_NON_POOLING is not set');
  throw new Error('Database configuration is missing');
}

// Create the client with the original URL
// @vercel/postgres will handle the protocol internally
const client = createClient({
  connectionString: dbUrl
});

// Test the connection
client.connect().catch(err => {
  console.error('Failed to connect to database:', err);
});

export default client;

