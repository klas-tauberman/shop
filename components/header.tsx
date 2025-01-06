'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from './shopping-cart'
import { useCart } from '@/contexts/CartContext'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onCheckout: () => void;
  isCheckoutPage?: boolean;
}

export function Header({ onCheckout, isCheckoutPage = false }: HeaderProps) {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="py-6 px-6">
      <div className="max-w-7xl mx-auto border-b border-[#000000] pb-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-wider">
            SUR—DEG
          </Link>
          
          {!isCheckoutPage && (
            <div className="flex items-center space-x-2 md:space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/brodet" className="text-base hover:text-gray-600">
                  Brödet
                </Link>
                <Link href="/bestallningar" className="text-base hover:text-gray-600">
                  Beställningar
                </Link>
                <Link href="/kontakt" className="text-base hover:text-gray-600">
                  Kontakt
                </Link>
              </nav>
              <ShoppingCart itemCount={cartItemCount} onCheckout={onCheckout} buttonClassName="rounded-full px-4 py-2" />
              <div className="md:hidden ml-4">
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
          
          {isCheckoutPage && (
            <ShoppingCart itemCount={cartItemCount} onCheckout={onCheckout} buttonClassName="rounded-full px-4 py-2" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-[#000000]">
              <Link href="/" className="text-xl font-semibold tracking-wider">
                SUR—DEG
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col p-6 space-y-4">
              <Link href="/brodet" className="text-lg hover:text-gray-600" onClick={toggleMobileMenu}>
                Brödet
              </Link>
              <Link href="/bestallningar" className="text-lg hover:text-gray-600" onClick={toggleMobileMenu}>
                Beställningar
              </Link>
              <Link href="/kontakt" className="text-lg hover:text-gray-600" onClick={toggleMobileMenu}>
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

