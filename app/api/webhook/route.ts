import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateOrderStatus } from '@/lib/db/utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      throw new Error('No stripe signature found in request headers')
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // Update order status in database
      // Note: You'll need to add a query to find the order by payment_intent_id
      await updateOrderStatus(parseInt(paymentIntent.metadata.orderId), 'paid')
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}

