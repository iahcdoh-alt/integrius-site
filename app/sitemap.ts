import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const routes = ['', '/produtos', '/produtos/10equinze', '/produtos/msa', '/solucoes', '/precos', '/docs', '/blog', '/contato', '/demo', '/sobre', '/seguranca', '/lgpd']
  return routes.map((r) => ({
    url: `${base}${r || '/'}`,
    lastModified: new Date()
  }))
}
