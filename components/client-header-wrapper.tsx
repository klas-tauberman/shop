'use client'

import { useRouter } from 'next/navigation'
import { Header } from './header'

export function ClientHeaderWrapper() {
  const router = useRouter()

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return <Header onCheckout={handleCheckout} />
}

