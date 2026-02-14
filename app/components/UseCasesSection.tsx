import { Wifi, Radio, Film, Smartphone } from "lucide-react";

const useCases = [
  {
    icon: Wifi,
    title: "Watch Offline",
    description:
      "Save HLS streams to your device and watch them anywhere -- no internet connection needed. Perfect for flights, commutes, and areas with poor connectivity.",
    keyword: "watch HLS streams offline",
  },
  {
    icon: Radio,
    title: "Archive Live Broadcasts",
    description:
      "Preserve live events, webinars, conference talks, and broadcasts as permanent MP4 files before they disappear from streaming platforms.",
    keyword: "archive live broadcasts",
  },
  {
    icon: Film,
    title: "Edit in Video Editors",
    description:
      "Import converted MP4 files directly into Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, or any professional editing software.",
    keyword: "import HLS into video editor",
  },
  {
    icon: Smartphone,
    title: "Play on Any Device",
    description:
      "MP4 works on virtually every device and media player. Convert M3U8 streams for playback on older TVs, game consoles, and portable players that don't support HLS.",
    keyword: "play HLS on any device",
  },
];

export default function UseCasesSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
            Why Convert M3U8 to MP4?
          </h2>
          <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
            M3U8 streams are designed for online playback only. Converting to MP4 unlocks these real-world use cases.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex items-start gap-5 p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-blue-500/20 hover:bg-white/[0.05] transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <useCase.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-100">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
