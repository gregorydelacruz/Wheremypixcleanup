import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import SocialProofSection from "@/components/SocialProofSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col md:min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-16 left-10 w-56 h-56 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-28 right-10 w-56 h-56 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* flex-1 only on md+ so mobile doesn't stretch a huge empty gap above the footer */}
      <main className="relative z-10 pt-6 pb-2 md:flex-1 md:pt-8 md:pb-10">
        {/* HERO */}
        <section className="px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="w-full whitespace-nowrap text-[clamp(1.2rem,5.9vw,3.25rem)] tracking-tight leading-none font-extrabold text-white">
              Organize Your Photos Instantly
            </h1>
            <p className="mt-2 md:mt-4 text-sm sm:text-base md:text-xl text-white/80 max-w-xl mx-auto">
              My custom AI renames, organizes by category folders and downloads them all
            </p>

            <div className="mt-5 md:mt-8 flex justify-center">
              <Link
                to={user ? "/upload" : "/login"}
                className="animate-cta-pulse inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg md:text-xl shadow-2xl ring-2 ring-white/40 transition-colors duration-300 hover:scale-105 hover:animate-none"
              >
                Organize My Photos
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS — tight 3-step strip */}
        <section className="mt-5 md:mt-10 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg md:text-3xl font-bold text-center text-white mb-3 md:mb-6">
              3 Simple Steps
            </h2>

            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-white/20 text-center">
                <div className="mx-auto h-8 w-8 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-sm md:text-xl font-bold text-white shadow mb-1.5 md:mb-3">
                  1
                </div>
                <h3 className="text-xs md:text-lg font-semibold text-white leading-tight">
                  Login &amp; Upload
                </h3>
                <p className="hidden md:block mt-2 text-sm text-white/80">
                  Sign in and upload. Originals stay private and untouched.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-white/20 text-center">
                <div className="mx-auto h-8 w-8 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-sm md:text-xl font-bold text-white shadow mb-1.5 md:mb-3">
                  2
                </div>
                <h3 className="text-xs md:text-lg font-semibold text-white leading-tight">
                  Organize
                </h3>
                <p className="hidden md:block mt-2 text-sm text-white/80">
                  AI renames, categorizes, and groups into clear folders.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-2.5 md:p-6 border border-white/20 text-center">
                <div className="mx-auto h-8 w-8 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-indigo-400 to-sky-500 flex items-center justify-center text-sm md:text-xl font-bold text-white shadow mb-1.5 md:mb-3">
                  3
                </div>
                <h3 className="text-xs md:text-lg font-semibold text-white leading-tight">
                  Download ZIP
                </h3>
                <p className="hidden md:block mt-2 text-sm text-white/80">
                  One ZIP with labeled folders—ready to store or share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF — production-style fake counters */}
        <section className="mt-2 md:mt-5 px-4">
          <SocialProofSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
