'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'

export function CartSummary() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">Din varukorg</h2>
      <div className="space-y-4 sm:space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm sm:text-base">{item.title}</h3>
                <p className="font-medium text-sm sm:text-base">{item.price} kr</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Totalt</span>
            <span className="font-medium">{total} kr</span>
          </div>
        </div>
      </div>
    </div>
  )
}

