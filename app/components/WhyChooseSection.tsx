"use client";

import { useState } from "react";
import { DollarSign, Settings, ShieldCheck, ChevronDown } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Zero Cost",
    description:
      "Completely free with no registration required. No hidden fees or usage limitations. Convert as many videos as you need.",
  },
  {
    icon: Settings,
    title: "Powerful Features",
    description:
      "Advanced conversion engine powered by FFmpeg. Supports adaptive bitrate streams, multiple resolutions, and preserves original quality.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "All processing happens securely on our servers. Your URLs and converted files are automatically deleted after download. No data is stored or shared.",
  },
];

export default function WhyChooseSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Accordion */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-300 border border-gray-600 rounded-full">
              Benefits
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-100 text-balance">
              Why Choose M3U8 to MP4 Converter
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Professional, free, and easy-to-use online M3U8 to MP4 conversion solution.
            </p>

            <div className="mt-8 space-y-2">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="border-b border-gray-700/50">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <benefit.icon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-200">
                        {benefit.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <>
                      <p className="pb-4 text-gray-400 text-sm leading-relaxed pl-8">
                        {benefit.description}
                      </p>
                      <div className="h-px bg-blue-500/50 mb-1" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[380px]">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Settings className="w-12 h-12 text-blue-400" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-gray-100">
                  M3U8 to MP4
                </p>
                <p className="text-gray-400 text-sm">
                  Professional Converter
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="px-3 py-1.5 bg-white/5 rounded-lg text-gray-300">Professional</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-lg text-gray-300">Zero Cost</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-lg text-gray-300">No Limits</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-lg text-gray-300">Easy to Use</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
