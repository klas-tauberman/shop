import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { createClient } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = createClient();
    await client.connect();

    const result = await sql`
      SELECT 
        o.id,
        c.email as customer_email,
        o.total_amount,
        o.status,
        o.created_at
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
      LIMIT 50
    `;

    await client.end();

    return NextResponse.json(result.rows || [])
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json([], { status: 500 })
  }
}

