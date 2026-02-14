import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marcus J.",
    role: "College Student",
    rating: 5,
    text: "My university streams recorded lectures in HLS format with no download option. This tool let me convert them to MP4 so I can study offline during my commute. Absolute lifesaver during finals.",
  },
  {
    name: "Priya S.",
    role: "Freelance Journalist",
    rating: 5,
    text: "I cover live press conferences that are only available via HLS streams. Being able to quickly convert them to MP4 means I can clip quotes and edit packages in Premiere without missing deadlines.",
  },
  {
    name: "Tom K.",
    role: "Freelance Video Editor",
    rating: 4,
    text: "A client sent me an M3U8 link instead of a proper video file. I had no idea what to do with it until I found this tool. Converted it to MP4 in minutes and imported it straight into DaVinci Resolve.",
  },
  {
    name: "Dr. Lena F.",
    role: "Academic Researcher",
    rating: 5,
    text: "I archive publicly available webinar recordings for my research. Many academic platforms use HLS streaming with no download button. This converter is the cleanest solution I have found.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">
          User Reviews
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-100 text-balance">
          What Users Say About M3U8 to MP4
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          Real reviews and experiences from users around the world.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-left flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-100 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {`"${review.text}"`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
