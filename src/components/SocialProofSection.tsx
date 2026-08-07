import { useEffect, useState } from "react";

function getRandomIncrement() {
  return Math.floor(Math.random() * 2) + 1; // 1–2
}

export default function SocialProofSection() {
  const [activeUsers, setActiveUsers] = useState(41);
  const [imagesProcessed, setImagesProcessed] = useState(1_000_122);
  const averageRating = 4.9;

  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers((prev) =>
        prev >= 2000 ? 2000 : prev + getRandomIncrement()
      );
    }, 60_000);

    const imageInterval = setInterval(() => {
      setImagesProcessed((prev) => prev + getRandomIncrement());
    }, 3_000);

    return () => {
      clearInterval(userInterval);
      clearInterval(imageInterval);
    };
  }, []);

  // Compact form on narrow screens so the long count doesn't collide with stars
  const formattedImages =
    imagesProcessed >= 1_000_000
      ? `${(imagesProcessed / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
      : imagesProcessed.toLocaleString();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0b1220] border border-white/10 px-3 py-3 md:px-8 md:py-5 text-center shadow-xl">
        <h3 className="text-base md:text-2xl font-bold text-white leading-tight">
          Trusted by Users Worldwide
        </h3>

        <div className="mt-2.5 md:mt-4 flex items-end justify-between gap-1 md:gap-6">
          {/* Users — left */}
          <div className="flex-shrink-0 w-[22%] md:w-auto md:flex-1 text-left md:text-center pl-1 md:pl-0">
            <div className="h-7 md:h-9 flex items-end md:items-center md:justify-center">
              <span className="text-xl md:text-3xl font-extrabold text-white tabular-nums leading-none">
                {activeUsers.toLocaleString()}+
              </span>
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm leading-tight">
              Active Users
            </div>
          </div>

          {/* Images — center */}
          <div className="flex-1 text-center px-1">
            <div className="h-7 md:h-9 flex items-end justify-center md:items-center">
              <span className="text-xl md:text-3xl font-extrabold text-white tabular-nums leading-none">
                {formattedImages}+
              </span>
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm leading-tight">
              Images Processed
            </div>
          </div>

          {/* Rating — same baseline as the numbers */}
          <div className="flex-shrink-0 w-[34%] md:w-auto md:flex-1 text-right md:text-center pr-1 md:pr-0">
            <div className="h-7 md:h-9 flex items-end justify-end md:items-center md:justify-center gap-0.5 text-[13px] md:text-xl leading-none">
              <span>⭐️</span>
              <span>⭐️</span>
              <span>⭐️</span>
              <span>⭐️</span>
              <span>✨</span>
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm leading-tight">
              {averageRating}/5 Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
