import { FileVideo, Monitor, Zap } from "lucide-react";

const points = [
  {
    icon: FileVideo,
    title: "HLS Protocol Support",
    description:
      "Full support for HTTP Live Streaming protocol, compatible with various streaming sources.",
  },
  {
    icon: Monitor,
    title: "Cross-Platform Compatible",
    description:
      "Works on all modern browsers without installing any plugins or software.",
  },
  {
    icon: Zap,
    title: "High-Performance Conversion",
    description:
      "Adaptive bitrate handling with intelligent processing for smooth, high-quality MP4 output.",
  },
];

const comparisonRows = [
  { feature: "Type", m3u8: "Playlist / Manifest", mp4: "Container File" },
  { feature: "Internet Required", m3u8: "Yes (Streaming)", mp4: "No (Offline)" },
  { feature: "Compatibility", m3u8: "Browsers / HLS Players", mp4: "Almost All Devices" },
  { feature: "File Structure", m3u8: "Segmented (variable)", mp4: "Single File" },
  { feature: "Editing Support", m3u8: "Limited", mp4: "Universal" },
];

export default function WhatIsM3U8Section() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: M3U8 vs MP4 Comparison Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-gray-100">M3U8 vs MP4 Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">M3U8 (HLS)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-400 uppercase tracking-wider">MP4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3.5 text-gray-300 font-medium">{row.feature}</td>
                      <td className="px-6 py-3.5 text-gray-400">{row.m3u8}</td>
                      <td className="px-6 py-3.5 text-gray-400">{row.mp4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
              What is M3U8
            </h2>
            <p className="text-gray-400 leading-relaxed">
              M3U8 is an HTTP-based streaming protocol widely used for live
              streaming and video-on-demand transmission. Unlike MP4 which is a
              self-contained video file, M3U8 is a playlist that points to small
              video segments delivered over the internet. Our converter reassembles
              these segments into a single, universally playable MP4 file.
            </p>

            <div className="space-y-6 mt-8">
              {points.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  <point.icon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-blue-400 font-semibold">
                      {point.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
