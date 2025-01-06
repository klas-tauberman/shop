'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'

interface ClientProductPageProps {
  product: Product
}

export default function ClientProductPage({ product }: ClientProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      imageUrl: product.images[0]
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-2">
          Välj antal
        </label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border rounded-md py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button 
        className="w-full bg-black text-white hover:bg-black/90 rounded-full py-6 text-base"
        onClick={handleAddToCart}
      >
        Lägg till
      </Button>

      <div className="bg-[#f9e7dc] p-4 rounded-lg">
        <p className="text-sm">
          Avhämtning sker på tisdagar och torsdagar mellan kl 12 – 16.
        </p>
      </div>
    </div>
  )
}

