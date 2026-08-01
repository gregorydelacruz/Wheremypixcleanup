// src/components/SocialProofSection.tsx
import { useEffect, useState } from "react";

function getRandomIncrement() {
  return Math.floor(Math.random() * 2) + 1; // 1–2
}

export default function SocialProofSection() {
  const [activeUsers, setActiveUsers] = useState(15);
  const [imagesProcessed, setImagesProcessed] = useState(1_000_000);
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
    <div className="flex justify-center py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card backdrop-blur-md p-8 text-center shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-card-foreground">
          Trusted by Users Worldwide
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-extrabold text-card-foreground">
              {activeUsers.toLocaleString()}+
            </div>
            <div className="mt-1 text-muted-foreground text-sm">Active Users</div>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-card-foreground">{formattedImages}+</div>
            <div className="mt-1 text-muted-foreground text-sm">Images Processed</div>
          </div>

          <div>
            <div className="text-3xl font-extrabold flex items-center justify-center gap-2">
              ⭐️⭐️⭐️⭐️✨
            </div>
            <div className="mt-1 text-muted-foreground text-sm">
              {averageRating}/5 Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
