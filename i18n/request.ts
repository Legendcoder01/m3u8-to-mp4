import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'hi', 'es', 'fr', 'de'] as const;
const defaultLocale = 'en';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requested = locale ?? (await requestLocale);
  const resolvedLocale = requested && locales.includes(requested as (typeof locales)[number])
    ? requested
    : defaultLocale;

  if (requested && !locales.includes(requested as (typeof locales)[number])) {
    notFound();
  }

  try {
    return {
      locale: resolvedLocale,
      messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    };
  } catch {
    return {
      locale: defaultLocale,
      messages: (await import('../messages/en.json')).default,
    };
  }
});
