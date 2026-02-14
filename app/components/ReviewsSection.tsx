import { Star } from "lucide-react";

const reviews = [
  {
    name: "David Rodriguez",
    role: "Network Engineer",
    rating: 5,
    text: "Essential tool for converting HLS streams. Handles multiple formats with ease and the quality of the MP4 output is excellent.",
  },
  {
    name: "Emma Wilson",
    role: "Content Creator",
    rating: 5,
    text: "Perfect for downloading course videos. I can convert M3U8 streams to MP4 and watch them offline without any hassle.",
  },
  {
    name: "Alex Thompson",
    role: "Product Manager",
    rating: 5,
    text: "Clean and elegant interface with fast conversions. Our entire team uses this tool for converting and archiving video streams.",
  },
  {
    name: "Sarah Chen",
    role: "Video Editor",
    rating: 5,
    text: "Ideal for grabbing streaming content and converting to MP4 for editing. The conversion speed is impressive and quality stays intact.",
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
