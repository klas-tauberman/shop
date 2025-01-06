import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/components/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SUR—DEG | Hantverksbageri i Malmö',
    template: '%s | SUR—DEG'
  },
  description: 'Välkommen till SUR—DEG, ett litet trevligt hantverksbageri mitt i Malmö. Här kan ni beställa ert bröd och uppleva äkta hantverkstradition.',
  keywords: ['surdeg', 'bröd', 'bageri', 'Malmö', 'hantverksbageri'],
  authors: [{ name: 'SUR—DEG' }],
  creator: 'SUR—DEG',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://your-domain.com',
    siteName: 'SUR—DEG',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SUR—DEG Hantverksbageri i Malmö',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={`${inter.className} bg-[#F9F4F1] min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

