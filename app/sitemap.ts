import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/brodet',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/brodet/tauberman-levain',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/brodet/tauberman-rag',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/brodet/tauberman-special',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/bestallningar',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/kontakt',
      lastModified: new Date(),
    },
  ]
}

