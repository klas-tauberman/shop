import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function checkMigration() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully.');

    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'reviews'
      );
    `);

    if (result.rows[0].exists) {
      console.log('The "reviews" table exists. Migration was successful.');
    } else {
      console.log('The "reviews" table does not exist. Migration may have failed.');
    }

    client.release();
  } catch (error) {
    console.error('Error checking migration:', error);
  } finally {
    await pool.end();
  }
}

checkMigration();

