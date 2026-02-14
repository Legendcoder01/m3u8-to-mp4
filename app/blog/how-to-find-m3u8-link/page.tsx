import type { Metadata } from "next";
import Link from "next/link";
import { FileVideo, ArrowLeft, Monitor, Globe, Code, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Find an M3U8 Link - Step-by-Step Guide | M3U8 to MP4 Converter",
  description:
    "Learn how to find M3U8 stream URLs using Chrome DevTools, Firefox, and page source. Step-by-step guide with detailed instructions for extracting HLS streaming links.",
  keywords: [
    "how to find m3u8 link",
    "get m3u8 url from website",
    "chrome devtools m3u8",
    "extract m3u8 link",
    "find hls stream url",
    "how to get m3u8 link",
    "m3u8 url finder",
    "network tab m3u8",
  ],
  openGraph: {
    title: "How to Find an M3U8 Link - Step-by-Step Guide",
    description:
      "Learn how to find M3U8 stream URLs using Chrome DevTools, Firefox, and page source.",
    type: "article",
  },
  alternates: {
    canonical: "/blog/how-to-find-m3u8-link",
  },
};

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold border border-blue-500/30">
          {number}
        </div>
      </div>
      <div className="space-y-2 pb-8">
        <h4 className="text-lg font-semibold text-gray-100">{title}</h4>
        <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

function MethodSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
      </div>
      <div className="ml-[52px] space-y-0">{children}</div>
    </section>
  );
}

export default function HowToFindM3U8Link() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Converter</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <FileVideo className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-gray-200">M3U8 to MP4</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
            <span>Guide</span>
            <span className="text-gray-600">{"/"}</span>
            <span className="text-gray-400">M3U8 Links</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance leading-tight">
            How to Find an M3U8 Link on Any Website
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
            Before you can convert an M3U8 stream to MP4, you need to find the stream URL. An M3U8 file is a
            playlist used by HLS (HTTP Live Streaming) -- it tells the video player where to find the actual
            video segments. This guide shows you exactly how to extract it.
          </p>
        </div>

        <div className="space-y-16">
          {/* Method 1: Chrome DevTools */}
          <MethodSection icon={Monitor} title="Method 1: Chrome DevTools (Recommended)">
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              This is the most reliable method and works on most websites that use HLS streaming.
            </p>
            <StepCard number={1} title="Open the page with the video">
              <p>
                Navigate to the website that contains the video stream you want to convert.
                Make sure the page is fully loaded but do not play the video yet.
              </p>
            </StepCard>
            <StepCard number={2} title="Open Chrome DevTools">
              <p>
                {"Press "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">F12</kbd>
                {" on Windows/Linux or "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Cmd + Option + I</kbd>
                {" on macOS to open Developer Tools. You can also right-click anywhere on the page and select \"Inspect\"."}
              </p>
            </StepCard>
            <StepCard number={3} title="Go to the Network tab">
              <p>
                {"In the DevTools panel, click on the "}
                <strong className="text-gray-200">Network</strong>
                {" tab at the top. This tab shows all network requests the page makes."}
              </p>
            </StepCard>
            <StepCard number={4} title="Filter for M3U8 requests">
              <p>
                {"In the filter bar at the top of the Network tab, type "}
                <code className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-blue-300">m3u8</code>
                {". This filters the request list to only show M3U8 playlist files."}
              </p>
            </StepCard>
            <StepCard number={5} title="Play the video">
              <p>
                Now click play on the video. As it starts streaming, you will see M3U8 requests appear in the
                Network tab. There may be multiple entries -- look for the one labeled as a
                <strong className="text-gray-200"> master</strong> or <strong className="text-gray-200">index</strong> playlist (it often contains resolution info).
              </p>
            </StepCard>
            <StepCard number={6} title="Copy the URL">
              <p>
                {"Right-click on the M3U8 request and select "}
                <strong className="text-gray-200">{"\"Copy > Copy URL\""}</strong>
                {". This is your M3U8 link -- paste it into our converter to download the video as MP4."}
              </p>
            </StepCard>
          </MethodSection>

          {/* Method 2: Firefox */}
          <MethodSection icon={Globe} title="Method 2: Firefox Developer Tools">
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The process is very similar in Firefox with a slightly different interface.
            </p>
            <StepCard number={1} title="Open Developer Tools in Firefox">
              <p>
                {"Press "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">F12</kbd>
                {" or "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Ctrl + Shift + I</kbd>
                {" ("}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Cmd + Option + I</kbd>
                {" on macOS) to open Firefox's Developer Tools."}
              </p>
            </StepCard>
            <StepCard number={2} title="Navigate to the Network tab and filter">
              <p>
                {"Click the "}
                <strong className="text-gray-200">Network</strong>
                {" tab, then type "}
                <code className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-blue-300">m3u8</code>
                {" into the filter input."}
              </p>
            </StepCard>
            <StepCard number={3} title="Play the video and copy the URL">
              <p>
                {"Play the video, wait for the M3U8 request to appear, right-click it, and select "}
                <strong className="text-gray-200">{"\"Copy > Copy URL\""}</strong>
                {"."}
              </p>
            </StepCard>
          </MethodSection>

          {/* Method 3: View Source */}
          <MethodSection icon={Code} title="Method 3: View Page Source (Simple Sites)">
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              On some simpler websites, the M3U8 URL may be directly embedded in the page source.
            </p>
            <StepCard number={1} title="Open page source">
              <p>
                {"Right-click on the page and select "}
                <strong className="text-gray-200">{"\"View Page Source\""}</strong>
                {", or press "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Ctrl + U</kbd>
                {" ("}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Cmd + U</kbd>
                {" on macOS)."}
              </p>
            </StepCard>
            <StepCard number={2} title="Search for M3U8">
              <p>
                {"Press "}
                <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-xs font-mono text-gray-300">Ctrl + F</kbd>
                {" and search for "}
                <code className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-blue-300">.m3u8</code>
                {". If found, copy the full URL containing the .m3u8 extension."}
              </p>
            </StepCard>
          </MethodSection>

          {/* Tips & Common Issues */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-100">Tips & Common Issues</h3>
            </div>
            <div className="ml-[52px] space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-lg space-y-2">
                  <h4 className="font-medium text-gray-200 text-sm">Multiple M3U8 files appearing?</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {"HLS streams often have a "}
                    <strong className="text-gray-300">master playlist</strong>
                    {" (which lists available quality levels) and "}
                    <strong className="text-gray-300">media playlists</strong>
                    {" (one per quality). For best results, copy the master playlist URL -- it typically loads first and our converter will automatically select the best quality."}
                  </p>
                </div>
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-lg space-y-2">
                  <h4 className="font-medium text-gray-200 text-sm">No M3U8 requests showing up?</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Some sites use DASH instead of HLS, or embed videos via YouTube/Vimeo iframes. Also, make sure you opened the Network tab before playing the video -- requests that happen before the tab is open are not captured.
                  </p>
                </div>
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-lg space-y-2">
                  <h4 className="font-medium text-gray-200 text-sm">DRM-protected content</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Streams from Netflix, YouTube, Hulu, Disney+, and similar services are encrypted with DRM. Even if you find an M3U8 URL, it will not convert because the video segments are encrypted. Our converter only works with publicly accessible, non-DRM streams.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-8">
            <div className="p-8 bg-blue-500/5 border border-blue-500/15 rounded-2xl text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-100">Ready to Convert?</h3>
              <p className="text-gray-400 max-w-lg mx-auto">
                Now that you have your M3U8 link, paste it into our free converter and download your video as an MP4 file in seconds.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Go to Converter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileVideo className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-gray-200">M3U8 to MP4 Converter</span>
          </Link>
          <p className="text-gray-500 text-xs">
            Powered by Next.js & FFmpeg
          </p>
        </div>
      </footer>
    </div>
  );
}
