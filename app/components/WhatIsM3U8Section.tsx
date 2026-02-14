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

export default function WhatIsM3U8Section() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Illustration placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                <FileVideo className="w-10 h-10 text-blue-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-100">M3U8</p>
                <p className="text-gray-400 text-sm">HLS Streaming Protocol</p>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-500 text-xs">
                <span className="px-2 py-1 bg-white/5 rounded">HLS Support</span>
                <span className="px-2 py-1 bg-white/5 rounded">Adaptive Bitrate</span>
                <span className="px-2 py-1 bg-white/5 rounded">Cross Platform</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
              What is M3U8
            </h2>
            <p className="text-gray-400 leading-relaxed">
              M3U8 is an HTTP-based streaming protocol widely used for live
              streaming and video-on-demand transmission. Our converter transforms
              these streams into universally playable MP4 files.
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
