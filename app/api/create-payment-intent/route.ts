import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not configured')
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  try {
    console.log('Starting payment intent creation...')
    
    const { amount, email } = await req.json()
    console.log('Received request:', { amount, email })

    if (!amount || !email) {
      console.error('Missing required fields:', { amount, email })
      return NextResponse.json(
        { error: 'Amount and email are required' },
        { status: 400 }
      )
    }

    // Log the Stripe key being used (first 8 chars only for security)
    const keyPrefix = process.env.STRIPE_SECRET_KEY.substring(0, 8)
    console.log('Using Stripe key prefix:', keyPrefix)

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

    console.log('Payment intent created successfully:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    // Log the full error for debugging
    console.error('Error creating payment intent:', error)
    
    // Return a user-friendly error message
    return NextResponse.json(
      { 
        error: 'Ett fel uppstod vid skapandet av betalningen.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

