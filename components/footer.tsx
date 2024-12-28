import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-wider">
            SUR—DEG
          </Link>
        </div>
        <div className="space-y-4">
          <Link href="/instagram" className="block text-sm hover:text-gray-600">
            Instagram
          </Link>
        </div>
        <div className="space-y-4">
          <Link href="/brodet" className="block text-sm hover:text-gray-600">
            Brödet
          </Link>
          <Link href="/bestallningar" className="block text-sm hover:text-gray-600">
            Beställningar
          </Link>
          <Link href="/kontakt" className="block text-sm hover:text-gray-600">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  )
}

