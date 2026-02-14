import { Users, FileVideo, Zap } from "lucide-react";

const stats = [
  {
    label: "Daily Active",
    value: "10K+",
    sublabel: "Users",
    icon: Users,
  },
  {
    label: "Supported",
    value: "50+",
    sublabel: "Video Formats",
    icon: FileVideo,
  },
  {
    label: "Conversion Time",
    value: "<2",
    sublabel: "Seconds",
    icon: Zap,
  },
];

export default function StatsSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">
          Statistics
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-100 text-balance">
          Users Love M3U8 to MP4 Converter
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          {"Because it's simple, free, and powerful."}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">
                {stat.label}
              </span>
              <span className="text-5xl md:text-6xl font-bold text-blue-400">
                {stat.value}
              </span>
              <span className="text-gray-400 text-sm">{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
