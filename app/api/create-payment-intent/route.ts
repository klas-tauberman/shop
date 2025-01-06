import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize stripe only when the API is called
let stripe: Stripe | null = null

export async function POST(req: Request) {
  try {
    // Check for stripe key when the API is actually called
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 500 }
      )
    }

    // Initialize Stripe if not already initialized
    if (!stripe) {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
      })
    }

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
    console.error('Error creating payment intent:', error)
    
    return NextResponse.json(
      { 
        error: 'Ett fel uppstod vid skapandet av betalningen.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

