import { ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ShoppingCartProps {
  itemCount: number
  onCheckout: () => void
  buttonClassName?: string
}

export function ShoppingCart({ itemCount, onCheckout, buttonClassName }: ShoppingCartProps) {
  return (
    <Button onClick={onCheckout} className={`flex items-center gap-2 rounded-full ${buttonClassName}`} aria-label="Shopping cart">
      <span className="text-sm">Varukorg {itemCount > 0 ? `(${itemCount})` : ''}</span>
      <ShoppingBag className="w-5 h-5" />
    </Button>
  )
}

