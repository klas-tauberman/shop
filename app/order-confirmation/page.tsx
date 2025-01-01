'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"

export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Generate a random order number (in a real app, this would come from your backend)
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase())
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={0} onCheckout={() => {}} />
      <main className="flex-1 py-4 px-6">
        <div className="max-w-2xl mx-auto bg-[#FDF4E7] p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Tack för din beställning!</h1>
          <div className="mb-6">
            <p className="text-lg mb-2">Din order har bekräftats och är nu under behandling.</p>
            <p className="text-lg mb-4">Ordernummer: <span className="font-semibold">{orderNumber}</span></p>
            <p className="text-lg">Vi kommer att skicka en bekräftelse via e-post med detaljer om din order.</p>
          </div>
          <div className="border-t border-gray-300 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Ordersammanfattning</h2>
            <div className="space-y-2">
              <p>1x Tauberman LEVAIN - 80 SEK</p>
              <p>1x Tauberman RÅG - 85 SEK</p>
              <p className="font-semibold">Totalt: 165 SEK</p>
            </div>
          </div>
          <div className="text-center">
            <Button 
              onClick={() => router.push('/')}
              className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-3 text-base font-normal"
            >
              Återgå till startsidan
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

