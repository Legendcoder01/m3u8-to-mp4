import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Get M3U8 Link",
    description:
      "find-m3u8-guide",
  },
  {
    number: 2,
    title: "Paste Link",
    description:
      "Paste the M3U8 link into the converter's input field above.",
  },
  {
    number: 3,
    title: "Start Conversion",
    description:
      "Click the convert button to begin processing your M3U8 stream to MP4.",
  },
  {
    number: 4,
    title: "Download MP4",
    description:
      "Once complete, download the converted MP4 file directly to your device.",
  },
];

export default function HowToUseSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
          How to Use M3U8 to MP4 Converter
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          Simple steps to convert your M3U8 streams to MP4:
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-700" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start md:items-center text-left md:text-center gap-4">
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.number === 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 border border-gray-600"
                }`}
              >
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-gray-100">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description === "find-m3u8-guide" ? (
                  <>
                    {"Find the M3U8 stream URL using your browser's Developer Tools (Network tab). "}
                    <Link href="/blog/how-to-find-m3u8-link" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                      Not sure how? Read our guide
                    </Link>
                    .
                  </>
                ) : (
                  step.description
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
