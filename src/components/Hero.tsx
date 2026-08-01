import { Link } from "react-router-dom";


type HeroProps = {
  handleTitleClick?: () => void;
};

export default function Hero({ handleTitleClick }: HeroProps) {
  return (
    <section className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#0b63f6_0%,#0d2d72_40%,#0b1220_100%)]" />

      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24 text-center">
        {/* Headline */}
        <h1
          onClick={handleTitleClick}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="bg-gradient-to-r from-indigo-200 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
            Effortlessly Organize Your Photo Chaos
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-4 text-lg md:text-xl text-white/80">
          Rename, sort, and declutter your photos in minutes.
        </p>

        {/* Quick Start Steps */}
        <div className="mt-12 max-w-2xl mx-auto bg-white/5 rounded-2xl p-8 border border-white/10 text-left">
          <h2 className="text-2xl font-semibold text-center mb-6">Quick Start</h2>
          <p className="text-center text-white/70 mb-8">
            Follow these steps to analyze, organize and rename your photos:
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                1
              </div>
              <p className="text-white/90 text-lg">Upload your images</p>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                2
              </div>
              <p className="text-white/90 text-lg">Click the Analyze Button</p>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                3
              </div>
              <p className="text-white/90 text-lg">
                Download the convenient ZIP file of your categorized and renamed photos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
