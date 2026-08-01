import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import SocialProofSection from "@/components/SocialProofSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <main className="flex-1 pt-8 pb-12 relative z-10">
  {/* HERO */}
  <section className="py-4">
    <div className="mx-auto max-w-5xl px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
        Turn Decades of Photo Chaos into a Clean Searchable Library in Minutes
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white/80">
        Where My Pix uses my custom AI to rename, sort, and declutter your photos
        automatically—so you can actually find the moments that matter.
      </p>

     {/* CTA BUTTON */}
<div className="mt-8 flex justify-center">
  <Link
    to={user ? "/upload" : "/login"}
    className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl shadow-2xl transition duration-300 transform hover:scale-105"
  >
    Organize My Photos
  </Link>
</div>
    </div>
  </section>

  {/* SOCIAL PROOF */}
  <section className="py-6">
    <SocialProofSection />
  </section>
        {/* HOW IT WORKS */}
        <section className="pt-2 pb-8">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              From Chaos to Organized in 3 Simple Steps
            </h2>
            <p className="text-center text-white/80 text-lg mb-12">
              No technical setup. No manual sorting. Just results.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Login & Upload
                </h3>
                <p className="text-white/80">
                  Sign in and upload your photos. No technical setup needed. No edits to your original images. Your photos stay private and secure.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Click "Organize Photos"
                </h3>
                <p className="text-white/80">
                  Our AI renames, categorizes, and groups your images into clear folders in just a few minutes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Download Your Library
                </h3>
                <p className="text-white/80">
                  Get a single ZIP file with all your neatly labeled folders—ready to store, back up, or share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES LINK */}
        <section className="pt-2 pb-10 text-center">
          <Link
            to="/features"
            className="text-xl font-semibold text-white hover:text-white/80 underline underline-offset-4 transition-colors"
          >
            Core Features & Benefits
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
