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
  hoverImageUrl: string
  onAddToCart: () => void
}

export function ProductCard({ 
  slug, 
  title, 
  description, 
  price, 
  imageUrl,
  hoverImageUrl, 
  onAddToCart 
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAdding(true)
    onAddToCart()
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleCardClick = () => {
    router.push(`/brodet/${slug}`)
  }

  return (
    <div 
      className="relative w-full max-w-sm mx-auto cursor-pointer"
      onClick={handleCardClick}
    >
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square mb-4">
          <Image
            src={isHovered ? hoverImageUrl : imageUrl}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 rounded-[20px]"
            priority
          />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-[20px] font-medium">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <h2 className="text-[20px] font-medium">{price} SEK</h2>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-black text-white hover:bg-black/90 rounded-full px-6 py-6 text-base font-normal"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? 'Tillagd!' : 'Lägg till'}
            </Button>
            <button 
              className="w-full text-center underline text-base hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/brodet/${slug}`);
              }}
            >
              Läs mer om brödet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

