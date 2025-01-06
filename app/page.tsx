'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  slug: string
  title: string
  description: string
  price: number
  imageUrl: string
  hoverImageUrl: string
}

export default function Home() {
  const router = useRouter()
  const { addToCart } = useCart()

  const products: Product[] = [
    {
      id: "1",
      slug: "tauberman-levain",
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: 70,
      imageUrl: "/levain.webp",
      hoverImageUrl: "/levain-open.webp"
    },
    {
      id: "2",
      slug: "tauberman-rag",
      title: "Tauberman RÅG",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: 75,
      imageUrl: "/rag.webp",
      hoverImageUrl: "/rag-open.webp"
    },
    {
      id: "3",
      slug: "tauberman-special",
      title: "Tauberman SPECIAL",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: 75,
      imageUrl: "/special.webp",
      hoverImageUrl: "/special-open.webp"
    }
  ]

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    })
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCheckout={handleCheckout} />
      <main className="flex-1 py-2 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-[40px]"> {/* Updated margin class */}
            <h1 className="text-[28px] font-normal mb-6 max-w-3xl">
              Välkommen till det lilla trevliga hantverksbageriet mitt i Malmö. Här kan ni beställa er bröd lorem ipsum dolar set amed.
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

