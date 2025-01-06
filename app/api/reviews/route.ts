import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { getReviews, createReview, updateReviewVisibility } from '@/lib/db/utils'
import { createClient } from '@vercel/postgres';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
  }

  try {
    const client = createClient();
    await client.connect();
    const reviews = await getReviews(productId)
    await client.end();
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const { productId, rating, comment, author } = await request.json()

  try {
    const client = createClient();
    await client.connect();
    const newReview = await createReview(productId, rating, comment, author)
    await client.end();
    return NextResponse.json(newReview)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, isHidden } = await request.json()

  try {
    const client = createClient();
    await client.connect();
    const updatedReview = await updateReviewVisibility(id, isHidden)
    await client.end();
    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

