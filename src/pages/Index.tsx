import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import SocialProofSection from "@/components/SocialProofSection";
import Footer from "@/components/Footer";
import { useColorTheme } from "@/components/ColorThemeProvider";
import { ColorThemeToggle } from "@/components/ColorThemeToggle";

const Index = () => {
  const { user } = useAuth();
  const { colorTheme } = useColorTheme();
  const isPurple = colorTheme === "purple";

  return (
    <div className="relative flex flex-col md:min-h-screen">
      {/* Background switches with color theme */}
      <div className="fixed inset-0 -z-10">
        {isPurple ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a5e] via-[#4a1a8a] to-[#1a0a40]" />
            <div className="absolute inset-0">
              <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] max-w-[520px] max-h-[520px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
              <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[480px] max-h-[480px] rounded-full bg-violet-400/20 blur-[110px]" />
              <div className="absolute bottom-[-15%] left-[20%] w-[60vw] h-[45vw] max-w-[560px] max-h-[420px] rounded-full bg-indigo-600/30 blur-[120px]" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] to-[#0056b3]" />
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-16 left-10 w-56 h-56 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl" />
              <div className="absolute top-28 right-10 w-56 h-56 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl" />
            </div>
          </>
        )}
      </div>

      <main className="relative z-10 pt-6 pb-2 md:flex-1 md:pt-8 md:pb-10">
        <section className="px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="w-full whitespace-nowrap text-[clamp(1.2rem,5.9vw,3.25rem)] tracking-tight leading-none font-extrabold">
              <span className="text-white">Organize Your Photos </span>
              {isPurple ? (
                <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Instantly
                </span>
              ) : (
                <span className="text-white">Instantly</span>
              )}
            </h1>
            <p
              className={`mt-2 md:mt-4 text-sm sm:text-base md:text-xl max-w-xl mx-auto ${
                isPurple ? "text-white/55" : "text-white/80"
              }`}
            >
              My custom AI renames, organizes by category folders and downloads them all
            </p>

            <div className="mt-5 md:mt-8 flex justify-center">
              <Link
                to={user ? "/upload" : "/login"}
                className={`animate-cta-pulse inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-bold text-lg md:text-xl shadow-2xl transition-colors duration-300 hover:scale-105 hover:animate-none ${
                  isPurple
                    ? "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30"
                    : "bg-indigo-500 hover:bg-indigo-600 ring-2 ring-white/40"
                }`}
              >
                Organize My Photos
              </Link>
            </div>

            {/* Color theme dots */}
            <div className="mt-4 md:mt-6">
              <ColorThemeToggle />
            </div>
          </div>
        </section>

        <section className="mt-5 md:mt-10 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg md:text-3xl font-bold text-center text-white mb-3 md:mb-6">
              3 Simple Steps
            </h2>

            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {[
                {
                  n: "1",
                  title: "Login & Upload",
                  desc: "Sign in and upload. Originals stay private and untouched.",
                  badge: isPurple
                    ? "from-rose-400 to-orange-400"
                    : "from-indigo-400 to-sky-500",
                },
                {
                  n: "2",
                  title: "Organize",
                  desc: "AI renames, categorizes, and groups into clear folders.",
                  badge: isPurple
                    ? "from-amber-300 to-emerald-400"
                    : "from-indigo-400 to-sky-500",
                },
                {
                  n: "3",
                  title: "Download ZIP",
                  desc: "One ZIP with labeled folders—ready to store or share.",
                  badge: isPurple
                    ? "from-sky-400 to-violet-500"
                    : "from-indigo-400 to-sky-500",
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className={`backdrop-blur-md rounded-xl md:rounded-2xl p-2.5 md:p-6 border text-center ${
                    isPurple
                      ? "bg-white/5 border-white/10"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <div
                    className={`mx-auto h-8 w-8 md:h-14 md:w-14 rounded-full bg-gradient-to-br ${step.badge} flex items-center justify-center text-sm md:text-xl font-bold text-white shadow mb-1.5 md:mb-3`}
                  >
                    {step.n}
                  </div>
                  <h3 className="text-xs md:text-lg font-semibold text-white leading-tight">
                    {step.title}
                  </h3>
                  <p
                    className={`hidden md:block mt-2 text-sm ${
                      isPurple ? "text-white/60" : "text-white/80"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-2 md:mt-5 px-4">
          <SocialProofSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
