import { FileVideo, Mail } from "lucide-react";

const footerLinks = {
  About: [
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  Resources: [
    { label: "How to Use", href: "#how-to-use" },
    { label: "What is M3U8", href: "#what-is-m3u8" },
    { label: "How to Find M3U8 Links", href: "/blog/how-to-find-m3u8-link" },
  ],
  "Recommended Tools": [
    { label: "VLC Player", href: "https://www.videolan.org/vlc/" },
    { label: "FFmpeg", href: "https://ffmpeg.org/" },
    { label: "HLS.js", href: "https://github.com/video-dev/hls.js/" },
  ],
};

export default function FooterSection() {
  return (
    <footer className="w-full border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileVideo className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-gray-100">
                M3U8 to MP4
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional online M3U8 to MP4 converter supporting HLS streams
              and on-demand content. Free to use, no registration required.
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-200 text-sm mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-gray-200 transition-colors"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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
          <p className="text-gray-500 text-xs">
            Powered by Next.js & FFmpeg
          </p>
        </div>
      </div>
    </footer>
  );
}
