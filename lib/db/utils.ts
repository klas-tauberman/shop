import { createClient } from '@vercel/postgres';

export async function getReviews(productId: string) {
  const client = createClient();
  await client.connect();
  try {
    const result = await client.query(
      'SELECT * FROM reviews WHERE product_id = $1 AND is_hidden = false ORDER BY created_at DESC',
      [productId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function createReview(productId: string, rating: number, comment: string, author: string) {
  const client = createClient();
  await client.connect();
  try {
    const result = await client.query(
      'INSERT INTO reviews (product_id, rating, comment, author) VALUES ($1, $2, $3, $4) RETURNING *',
      [productId, rating, comment, author]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function updateReviewVisibility(id: number, isHidden: boolean) {
  const client = createClient();
  await client.connect();
  try {
    const result = await client.query(
      'UPDATE reviews SET is_hidden = $1 WHERE id = $2 RETURNING *',
      [isHidden, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating review visibility:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  const client = createClient();
  await client.connect();
  try {
    await client.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  } finally {
    await client.end();
  }
}

