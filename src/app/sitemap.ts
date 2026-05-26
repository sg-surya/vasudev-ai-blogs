import { MetadataRoute } from 'next'
import { posts, categories } from '@/data/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog.vasudevai.in'

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/article/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories?q=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const routes = ['', '/articles', '/categories', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/sitemap'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...postUrls, ...categoryUrls]
}
