import { Pool } from 'pg';
import { up as createReviewsTable } from './migrations/001_create_reviews_table';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function runMigrations() {
  try {
    console.log('Starting migrations...');
    await createReviewsTable(pool);
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await pool.end();
    console.log('Migration process finished');
  }
}

runMigrations().catch(error => {
  console.error('Unhandled error during migration:', error);
  process.exit(1);
});

