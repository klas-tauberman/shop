import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SUR—DEG',
  description: 'Hantverksbageri i Malmö',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={`${inter.className} bg-[#F9F4F1] min-h-screen`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

