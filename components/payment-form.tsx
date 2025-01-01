'use client'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './checkout-form'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  customerInfo?: { email: string }
  isActive?: boolean
}

export function PaymentForm({ customerInfo, isActive = false }: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerInfo?.email,
            amount: 15500, // 155.00 SEK in öre
          }),
        })

        const data = await response.json()

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Error creating payment intent:', err)
        setError('Ett fel uppstod. Försök igen senare.')
      }
    }

    if (isActive) {
      createPaymentIntent()
    }
  }, [customerInfo, isActive])

  if (error) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">2. Betalningsinformation</h2>
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!isActive) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-medium text-gray-400 opacity-50">2. Betalningsinformation</h2>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">2. Betalningsinformation</h2>
        <div>Laddar betalningsformulär...</div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">2. Betalningsinformation</h2>
      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance: { 
            theme: 'stripe',
            variables: {
              colorPrimary: '#000000',
              borderRadius: '0',
            },
          },
          locale: 'sv',
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  )
}

