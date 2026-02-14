
import ConverterForm from "./components/ConverterForm";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import WhatIsM3U8Section from "./components/WhatIsM3U8Section";
import HowToUseSection from "./components/HowToUseSection";
import WhyChooseSection from "./components/WhyChooseSection";
import FAQSection from "./components/FAQSection";
import ReviewsSection from "./components/ReviewsSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      {/* Hero + Converter */}
      <main className="relative overflow-hidden flex flex-col items-center justify-center px-4 pt-20 pb-12">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse delay-75" />
        </div>

        <div className="z-10 w-full max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 text-balance">
            Professional Online{" "}
            <span className="text-blue-400">M3U8 to MP4</span> Converter
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Free online M3U8 stream converter. Convert HLS streams to MP4 files
            instantly. No download required, fast conversion.
          </p>
        </div>

        <div className="z-10 w-full">
          <ConverterForm />
        </div>
      </main>

      {/* Info Sections */}
      <StatsSection />

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <div id="what-is-m3u8">
        <WhatIsM3U8Section />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <div id="how-to-use">
        <HowToUseSection />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <WhyChooseSection />

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <div id="faq">
        <FAQSection />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/5" />
      </div>

      <ReviewsSection />

      <FooterSection />
    </div>
  );
}
