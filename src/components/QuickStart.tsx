// src/components/QuickStart.tsx
export default function QuickStart() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-lg">
      <h3 className="text-2xl md:text-3xl font-bold text-center">
        Quick Start
      </h3>
      <p className="mt-2 text-center text-white/70">
        Follow these steps to analyze, organize and rename your photos:
      </p>

      <ol className="mt-6 space-y-6">
        {[
          "Upload your images",
          "Click the Analyze Button",
          "Download the convenient ZIP file of your categorized and renamed photos",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 text-lg font-bold text-white shadow-md">
              {i + 1}
            </span>
            <span className="text-white/90 text-lg">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
