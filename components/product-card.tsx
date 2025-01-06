'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductCardProps {
  id: string
  slug: string
  title: string
  description: string
  price: number
  imageUrl: string
  onAddToCart: () => void
}

export function ProductCard({ slug, title, description, price, imageUrl, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAdding(true)
    onAddToCart()
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/brodet/${slug}`)
  }

  return (
    <div className="relative w-full max-w-sm mx-auto group">
      <div className="relative">
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-full h-[300px] transition-all duration-300 ease-in-out group-hover:-translate-y-10 group-hover:translate-x-[calc(-50%+12px)] group-hover:rotate-[15deg]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain transition-transform duration-300 ease-in-out origin-center"
            priority
          />
        </div>

        <div className="relative mt-32 bg-[#FDF4E7]">
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: 'url(/paper-texture.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.8
            }}
          />
          
          <div className="relative z-10 p-8">
            <h2 className="text-[22px] font-medium mb-3">{title}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
            <p className="text-[22px] font-medium mb-6">{price} SEK</p>
            <div className="flex flex-row items-center justify-between gap-4">
              <Button 
                className="flex-grow bg-black text-white hover:bg-black/90 rounded-full px-6 py-3 text-base font-normal"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Tillagd!' : 'Lägg till'}
              </Button>
              <Button 
                variant="outline" 
                className="border-black text-black hover:bg-transparent rounded-full px-6 py-3 text-base font-normal bg-transparent border-opacity-100"
                onClick={handleReadMore}
              >
                Läs mer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

