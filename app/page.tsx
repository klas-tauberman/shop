'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
}

export default function Home() {
  const router = useRouter()
  const { addToCart, cartItems } = useCart()

  const products: Product[] = [
    {
      id: "1",
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: 80,
      imageUrl: "/bread.png"
    },
    {
      id: "2",
      title: "Tauberman RÅG",
      description: "Ett saftigt rågbröd med en perfekt balans mellan sötma och syrlighet.",
      price: 85,
      imageUrl: "/bread.png"
    },
    {
      id: "3",
      title: "Tauberman SPECIAL",
      description: "Vårt specialbröd med en unik blandning av säsongens bästa ingredienser.",
      price: 90,
      imageUrl: "/bread.png"
    }
  ]

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCheckout={handleCheckout} />
      <main className="flex-1 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-[88px]">
            <h1 className="text-[28px] font-normal mb-6 max-w-3xl">
              Välkommen till det lilla trevliga hantverksbageriet mitt i Malmö. Här kan ni beställa er bröd lorem ipsum dolar set amed.
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

