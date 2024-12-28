import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductCardProps {
  title: string
  description: string
  price: string
  imageUrl: string
}

export function ProductCard({ title, description, price, imageUrl }: ProductCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-64 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="bg-[#FDF4E7] p-6 rounded-b-lg">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-xl font-bold mb-4">{price}</p>
        <div className="flex gap-4">
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            Lägg till
          </Button>
          <Button variant="outline" className="border-black text-black hover:bg-gray-100">
            Läs mer
          </Button>
        </div>
      </div>
    </div>
  )
}

