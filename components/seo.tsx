import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const siteTitle = "SUR—DEG"
  const fullTitle = `${title} | ${siteTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  )
}

