import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  try {
    const { amount, email } = await req.json()

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'sek',
      metadata: {
        email,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Ett fel uppstod vid skapandet av betalningen.' }, 
      { status: 400 }
    )
  }
}

