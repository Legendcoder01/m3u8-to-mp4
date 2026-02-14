import {
  FileVideo,
  Gauge,
  Settings,
  MonitorPlay,
  Shield,
  Download,
} from "lucide-react";

const features = [
  {
    icon: FileVideo,
    title: "M3U8/HLS Support",
    description:
      "Full support for M3U8 and HLS protocols, compatible with various streaming sources for seamless conversion.",
  },
  {
    icon: Gauge,
    title: "Fast Conversion",
    description:
      "High-speed conversion engine that processes M3U8 streams to MP4 quickly without compromising quality.",
  },
  {
    icon: Settings,
    title: "Quality Control",
    description:
      "Maintain original video quality during conversion with adaptive bitrate handling for best results.",
  },
  {
    icon: MonitorPlay,
    title: "Cross-Platform",
    description:
      "Works on all modern browsers without installing any plugins or software. Convert from any device.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "All conversions are processed securely on our servers using FFmpeg. Your URLs and converted files are automatically deleted after download -- nothing is stored or shared.",
  },
  {
    icon: Download,
    title: "Direct Download",
    description:
      "Download your converted MP4 files directly to your device with a single click after conversion.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
          M3U8 to MP4 Core Features
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          All essential features you need from a professional converter.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-start text-left gap-4">
              <div className="w-14 h-14 rounded-full border border-blue-400/30 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
