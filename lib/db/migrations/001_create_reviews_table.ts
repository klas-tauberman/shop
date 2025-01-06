import { Pool } from 'pg';

export async function up(pool: Pool) {
  console.log('Starting to create reviews table...');
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        is_hidden BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Reviews table created successfully');
  } catch (error) {
    console.error('Error creating reviews table:', error);
    throw error;
  }
}

export async function down(pool: Pool) {
  console.log('Starting to drop reviews table...');
  try {
    await pool.query(`
      DROP TABLE IF EXISTS reviews
    `);
    console.log('Reviews table dropped successfully');
  } catch (error) {
    console.error('Error dropping reviews table:', error);
    throw error;
  }
}

