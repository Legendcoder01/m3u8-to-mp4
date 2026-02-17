import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'hi', 'es', 'fr', 'de'];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  try {
    return {
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  } catch {
    return {
      messages: (await import('../messages/en.json')).default,
    };
  }
});
