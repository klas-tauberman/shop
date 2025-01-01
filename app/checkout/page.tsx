'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CustomerInfoForm } from '@/components/customer-info-form'
import { CartSummary } from '@/components/cart-summary'
import { PaymentForm } from '@/components/payment-form'
import { InfoBox } from '@/components/info-box'

export default function Checkout() {
  const [customerInfo, setCustomerInfo] = useState<{ email: string } | null>(null)

  const handleCustomerInfoComplete = (data: { email: string }) => {
    setCustomerInfo(data)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F4F1]">
      <Header isCheckoutPage={true} />
      <main className="flex-1 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-medium mb-6 sm:mb-8">Kassa</h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="lg:col-span-3 space-y-6">
              <CustomerInfoForm onComplete={handleCustomerInfoComplete} />
              <PaymentForm 
                customerInfo={customerInfo}
                isActive={!!customerInfo}
              />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <CartSummary />
              <InfoBox />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

