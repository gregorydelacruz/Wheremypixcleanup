import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-16 left-10 w-56 h-56 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-28 right-10 w-56 h-56 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* flex-1 only on md+ so mobile doesn't stretch a huge empty gap above the footer */}
      <main className="relative z-10 pt-6 pb-3 md:flex-1 md:pt-8 md:pb-10">
        {/* HERO */}
        <section className="px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[1.65rem] leading-tight sm:text-3xl md:text-5xl font-extrabold text-white">
              Turn Messy Photos into an Organized, Downloadable Library
            </h1>
            <p className="mt-2 md:mt-4 text-sm sm:text-base md:text-xl text-white/80 max-w-xl mx-auto">
              AI renames, sorts, and folders your photos—so you can find the moments that matter.
            </p>

            <div className="mt-4 md:mt-8 flex justify-center">
              <Link
                to={user ? "/upload" : "/login"}
                className="inline-flex items-center justify-center px-7 py-2.5 md:px-10 md:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base md:text-xl shadow-2xl transition duration-300 hover:scale-105"
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

        {/* SOCIAL PROOF — below steps */}
        <section className="mt-4 md:mt-8 px-4">
          <div className="mx-auto max-w-lg flex items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-2.5 md:px-6 md:py-4 text-center">
            <div className="flex-1">
              <div className="text-base md:text-2xl font-extrabold text-white">2,000+</div>
              <div className="text-[10px] md:text-xs text-white/70 leading-tight">Users</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex-1">
              <div className="text-base md:text-2xl font-extrabold text-white">1M+</div>
              <div className="text-[10px] md:text-xs text-white/70 leading-tight">Images</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex-1">
              <div className="text-base md:text-2xl font-extrabold text-white">4.9★</div>
              <div className="text-[10px] md:text-xs text-white/70 leading-tight">Rating</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
