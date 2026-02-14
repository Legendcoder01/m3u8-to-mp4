const faqs = [
  {
    question: "What is M3U8 format?",
    answer:
      "M3U8 is an HTTP-based streaming protocol and playlist file format for HLS (HTTP Live Streaming). It's widely used for video live streaming and on-demand services, supporting adaptive bitrate streaming.",
  },
  {
    question: "What output formats are supported?",
    answer:
      "Our converter primarily outputs MP4 format, which is the most widely compatible video format. MP4 files work on virtually all devices, players, and platforms including phones, tablets, and computers.",
  },
  {
    question: "Why did my conversion fail?",
    answer:
      "Common reasons include: 1) Invalid or expired URL; 2) CORS restrictions on the source server; 3) Unsupported stream format; 4) Network connection issues. Try verifying the URL is accessible and try again.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No! M3U8 to MP4 Converter runs entirely in the browser with no downloads or installations required. You just need a modern browser (Chrome, Firefox, Safari, Edge, etc.).",
  },
  {
    question: "Is the converter free to use?",
    answer:
      "Yes, M3U8 to MP4 Converter is completely free to use with no hidden fees, usage limits, or feature restrictions. Convert as many streams as you need without any cost.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We do not store your URLs or converted files permanently. All data is processed in real-time and automatically cleaned up after your download completes. Your privacy is our priority.",
  },
  {
    question: "Can I convert DRM-protected streams?",
    answer:
      "No. Streams from services like Netflix, Hulu, or YouTube are encrypted with DRM (Digital Rights Management) and cannot be converted by any legitimate tool. Our converter only works with publicly accessible, non-DRM M3U8 streams.",
  },
  {
    question: "What engine does this converter use?",
    answer:
      "Our converter is powered by FFmpeg, the industry-standard open-source multimedia framework trusted by professionals worldwide. It runs on our servers to handle the heavy processing, so you don't need to install anything locally.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-balance">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          {"Can't find the answer? Feel free to contact our support team."}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-gray-100 pt-1">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed pl-11">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
