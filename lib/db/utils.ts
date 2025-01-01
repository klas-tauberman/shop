import pool from '../db';

export async function createCustomer(email: string | null, phone: string | null) {
  try {
    const result = await pool.query(
      'INSERT INTO customers (email, phone) VALUES ($1, $2) RETURNING id',
      [email, phone]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function createOrder(
  customerId: number,
  totalAmount: number,
  stripePaymentIntentId: string,
  items: Array<{ productId: string; quantity: number; price: number }>
) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      'INSERT INTO orders (customer_id, total_amount, status, stripe_payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [customerId, totalAmount, 'pending', stripePaymentIntentId]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');
    return orderId;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

