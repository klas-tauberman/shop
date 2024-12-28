import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <header className="py-6 px-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-wider">
          SUR—DEG
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/brodet" className="text-sm hover:text-gray-600">
            Brödet
          </Link>
          <Link href="/bestallningar" className="text-sm hover:text-gray-600">
            Beställningar
          </Link>
          <Link href="/kontakt" className="text-sm hover:text-gray-600">
            Kontakt
          </Link>
        </nav>
        
        <button className="p-2" aria-label="Shopping cart">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

