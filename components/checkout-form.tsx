'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (error) {
      setErrorMessage(error.message ?? 'Ett fel uppstod')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-black text-white hover:bg-black/90 rounded-full px-6 py-6 text-base font-normal"
      >
        {isProcessing ? 'Bearbetar...' : 'Betala nu'}
      </Button>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </form>
  )
}

