import { MetadataRoute } from 'next'
import { gurus } from '@/lib/data'
 
const BASE_URL = 'https://your-domain.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const guruRoutes = gurus.map((guru) => ({
    url: `${BASE_URL}/gurus/${guru.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/gurus`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/lineages`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/teachings`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/stories`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/timeline`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/ai-assistant`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
 
  return [
    ...staticRoutes,
    ...guruRoutes
  ]
}
