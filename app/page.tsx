import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'

export default function Home() {
  const products = [
    {
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd med en perfekt balans av syrlig smak och mjuk konsistens. Bakat med kärlek och tradition.",
      price: "80 SEK",
      imageUrl: "/bread.png"
    },
    {
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: "80 SEK",
      imageUrl: "/bread.png"
    },
    {
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: "80 SEK",
      imageUrl: "/bread.png"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl font-normal mb-6">
              Välkommen till det lilla trevliga hantverksbageriet mitt i Malmö. Här kan ni beställa er bröd lorem ipsum dolar set amed.
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

