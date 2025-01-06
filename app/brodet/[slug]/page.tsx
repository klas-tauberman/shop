import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import { ClientHeaderWrapper } from '@/components/client-header-wrapper'
import { Footer } from '@/components/footer'
import { Reviews } from '@/components/reviews'
import { Product } from '@/types/product'
import ClientProductPage from '@/components/client-product-page'
import { SEO } from '@/components/seo'
import Script from 'next/script'

// This should be replaced with an actual data fetching function
async function getProduct(slug: string): Promise<Product | null> {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 100))

  const products: Product[] = [
    {
      id: "1",
      slug: "tauberman-levain",
      title: "Tauberman LEVAIN",
      description: "Ett luftigt surdegsbröd innehållande hela korn och färskmalet fullkornsvetemjöl.",
      price: 70,
      images: ["/levain.webp", "/levain-open.webp"],
      rating: 4,
      reviewCount: 2,
      ingredients: ["Färskmalet fullkornsvetemjöl av Dalavete från Wärpinge Gård (kultursort)", "siktat vetemjöl", "surdeg (vete&råg)", "oraffinerat havssalt"],
      weight: "cirka 800 gram",
      allergyInfo: "Nötter hanteras i bageriet",
      storageInfo: "Vira in brödet i en handuk och förvara det i skafferiet eller ställ det med snittytan nedåt på ett plant underlag i köket, typ en skärbräda."
    },
    {
      id: "2",
      slug: "tauberman-rag",
      title: "Tauberman RÅG",
      description: "Ett saftigt rågbröd med en perfekt balans mellan sötma och syrlighet.",
      price: 75,
      images: ["/rag.webp", "/rag-open.webp"],
      rating: 4,
      reviewCount: 2,
      ingredients: ["Rågmjöl", "vatten", "surdeg", "salt"],
      weight: "cirka 700 gram",
      allergyInfo: "Nötter hanteras i bageriet",
      storageInfo: "Förvara i rumstemperatur"
    },
    {
      id: "3",
      slug: "tauberman-special",
      title: "Tauberman SPECIAL",
      description: "Vårt specialbröd med en unik blandning av säsongens bästa ingredienser.",
      price: 75,
      images: ["/special.webp", "/special-open.webp"],
      rating: 5,
      reviewCount: 1,
      ingredients: ["Vetemjöl", "rågmjöl", "vatten", "surdeg", "salt", "säsongens specialingredienser"],
      weight: "cirka 900 gram",
      allergyInfo: "Nötter hanteras i bageriet",
      storageInfo: "Förvara i rumstemperatur"
    }
  ]

  return products.find(p => p.slug === slug) || null
}

export async function generateStaticParams() {
  return [
    { slug: 'tauberman-levain' },
    { slug: 'tauberman-rag' },
    { slug: 'tauberman-special' },
  ]
}

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images[0],
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "SEK",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <>
      <SEO 
        title={product.title}
        description={product.description}
        canonical={`https://shop.tauberman.se/brodet/${params.slug}`}
        ogImage={product.images[0]}
      />
      <Script
        id={`product-jsonld-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#f9f4f1]">
        <ClientHeaderWrapper />
        <main className="flex-1 py-2 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Image Gallery - 3 columns on desktop, 1 column on mobile */}
              <div className="lg:col-span-3 space-y-4">
                <div className="aspect-square relative bg-[#d9d9d9] rounded-[20px] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="hidden lg:grid grid-cols-2 gap-4">
                  <div className="aspect-square relative bg-[#d9d9d9] rounded-[20px] overflow-hidden">
                    <Image
                      src={product.images[1] || product.images[0]}
                      alt={`${product.title} detail 1`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative bg-[#d9d9d9] rounded-[20px] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={`${product.title} detail 2`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= product.rating ? 'fill-[#ffca3a] text-[#ffca3a]' : 'text-[#c9c9c9]'}`}
                        />
                      ))}
                    </div>
                    <a href="#reviews" className="text-sm underline">
                      {product.reviewCount} recensioner
                    </a>
                  </div>
                  <p className="text-2xl font-medium mb-4">{product.price} kr</p>
                  <p className="text-base text-gray-700">{product.description}</p>
                </div>

                <ClientProductPage product={product} />

                <div className="space-y-6 pt-6 border-t">
                  <div>
                    <h2 className="text-lg font-medium mb-2">Ingredienser</h2>
                    <ul className="list-disc pl-5 text-base text-gray-700">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <p className="text-base text-gray-700 mt-2">
                      Vikt: {product.weight}
                    </p>
                    <p className="text-base text-gray-700 mt-2">
                      {product.allergyInfo}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-2">Tips på förvaring</h2>
                    <p className="text-base text-gray-700">
                      {product.storageInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only additional images */}
            <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">
              <div className="aspect-square relative bg-[#d9d9d9] rounded-[20px] overflow-hidden">
                <Image
                  src={product.images[1] || product.images[0]}
                  alt={`${product.title} detail 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative bg-[#d9d9d9] rounded-[20px] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={`${product.title} detail 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div id="reviews" className="mt-16 py-16 border-t">
              <h2 className="text-2xl font-medium mb-8">Recensioner</h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                <div className="lg:col-span-3">
                  <Reviews productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

