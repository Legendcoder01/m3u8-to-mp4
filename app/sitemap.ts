import type { MetadataRoute } from 'next';

const baseUrl = 'https://m3u8-to-mp4.farhanabhatt.com';
const locales = ['en', 'hi', 'es', 'fr', 'de'];

export default function sitemap(): MetadataRoute.Sitemap {
  const localeRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  return [
    ...localeRoutes,
    {
      url: `${baseUrl}/blog/how-to-find-m3u8-link`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
