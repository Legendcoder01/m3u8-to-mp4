import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "M3U8 to MP4 Converter - Free Online HLS Stream Converter",
  description:
    "Convert M3U8/HLS streams to MP4 video files online for free. Fast, reliable, and no software installation required. Supports all M3U8 formats with high-quality output.",
  keywords: [
    "m3u8 to mp4",
    "m3u8 converter",
    "hls to mp4",
    "m3u8 download",
    "stream converter",
    "video converter",
    "online converter",
    "free m3u8 converter",
    "hls stream download",
    "m3u8 to mp4 online",
  ],
  authors: [{ name: "M3U8 to MP4 Converter" }],
  creator: "M3U8 to MP4 Converter",
  publisher: "M3U8 to MP4 Converter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "M3U8 to MP4 Converter - Free Online HLS Stream Converter",
    description:
      "Convert M3U8/HLS streams to MP4 video files online for free. Fast, reliable, and no software installation required.",
    siteName: "M3U8 to MP4 Converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "M3U8 to MP4 Converter - Free Online HLS Stream Converter",
    description:
      "Convert M3U8/HLS streams to MP4 video files online for free. Fast, reliable, and no software installation required.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
