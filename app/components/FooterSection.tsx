import Image from 'next/image';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FooterSection() {
  const t = useTranslations('Footer');

  const footerLinks = {
    [t('aboutTitle')]: [
      { label: t('features'), href: '#features' },
      { label: t('faq'), href: '#faq' },
    ],
    [t('resourcesTitle')]: [
      { label: t('howToUse'), href: '#how-to-use' },
      { label: t('whatIsM3U8'), href: '#what-is-m3u8' },
      { label: t('howToFind'), href: '/blog/how-to-find-m3u8-link' },
    ],
    [t('toolsTitle')]: [
      { label: 'VLC Player', href: 'https://www.videolan.org/vlc/' },
      { label: 'FFmpeg', href: 'https://ffmpeg.org/' },
      { label: 'HLS.js', href: 'https://github.com/video-dev/hls.js/' },
    ],
  };

  return (
    <footer className="w-full border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="M3U8 to MP4 logo" width={24} height={24} className="rounded" />
              <span className="text-lg font-bold text-gray-100">M3U8 to MP4</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t('brandDescription')}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-200 text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-gray-200 transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">{t('poweredBy')}</p>
        </div>
      </div>
    </footer>
  );
}
