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

  const formattedImages = imagesProcessed.toLocaleString();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0b1220] border border-white/10 px-4 py-5 md:px-8 md:py-7 text-center shadow-xl">
        <h3 className="text-lg md:text-2xl font-bold text-white">
          Trusted by Users Worldwide
        </h3>

        <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-6">
          <div>
            <div className="text-xl md:text-3xl font-extrabold text-white">
              {activeUsers.toLocaleString()}+
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm">Active Users</div>
          </div>

          <div>
            <div className="text-xl md:text-3xl font-extrabold text-white">
              {formattedImages}+
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm">Images Processed</div>
          </div>

          <div>
            <div className="text-base md:text-2xl font-extrabold flex items-center justify-center gap-0.5 md:gap-1">
              <span>⭐️</span>
              <span>⭐️</span>
              <span>⭐️</span>
              <span>⭐️</span>
              <span>✨</span>
            </div>
            <div className="mt-1 text-white/50 text-[10px] md:text-sm">
              {averageRating}/5 Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
