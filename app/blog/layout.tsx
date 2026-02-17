import type { Metadata } from 'next';
import '../globals.css';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'Blog - M3U8 to MP4 Converter',
  description: 'Guides and tutorials for M3U8 and HLS conversion.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-gray-100 bg-[#0f172a]">{children}</body>
    </html>
  );
}
