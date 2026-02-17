import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const siteUrl = "https://m3u8-to-mp4.farhanabhatt.com";

const seoByLocale: Record<string, { title: string; description: string; localeTag: string }> = {
  en: {
    title: "M3U8 to MP4 Converter - Free Online HLS Stream Converter",
    description:
      "Convert M3U8/HLS streams to MP4 online for free. Fast, reliable, no software installation required.",
    localeTag: "en_US",
  },
  hi: {
    title: "M3U8 से MP4 कन्वर्टर - मुफ्त ऑनलाइन HLS कन्वर्टर",
    description:
      "M3U8/HLS स्ट्रीम को मुफ्त में MP4 में कन्वर्ट करें। तेज़, भरोसेमंद और बिना इंस्टॉलेशन के।",
    localeTag: "hi_IN",
  },
  es: {
    title: "Convertidor M3U8 a MP4 - Convertidor HLS Online Gratis",
    description:
      "Convierte streams M3U8/HLS a MP4 gratis online. Rápido, fiable y sin instalación.",
    localeTag: "es_ES",
  },
  fr: {
    title: "Convertisseur M3U8 en MP4 - Convertisseur HLS Gratuit en Ligne",
    description:
      "Convertissez des flux M3U8/HLS en MP4 gratuitement en ligne. Rapide, fiable et sans installation.",
    localeTag: "fr_FR",
  },
  de: {
    title: "M3U8 zu MP4 Konverter - Kostenloser Online HLS Konverter",
    description:
      "Konvertiere M3U8/HLS-Streams kostenlos online zu MP4. Schnell, zuverlässig und ohne Installation.",
    localeTag: "de_DE",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  const localePath = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    applicationName: "M3U8 to MP4 Converter",
    keywords: ["m3u8 to mp4", "hls to mp4", "m3u8 converter", "stream downloader"],
    alternates: {
      canonical: localePath,
      languages: {
        en: "/en",
        hi: "/hi",
        es: "/es",
        fr: "/fr",
        de: "/de",
        "x-default": "/en",
      },
    },
    icons: {
      icon: "/icon.svg",
      apple: "/apple-icon.svg",
      shortcut: "/icon.svg",
    },
    openGraph: {
      type: "website",
      url: localePath,
      siteName: "M3U8 to MP4 Converter",
      locale: seo.localeTag,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "/logo.svg",
          width: 512,
          height: 512,
          alt: "M3U8 to MP4 logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/logo.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased text-gray-100 bg-[#0f172a]`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
