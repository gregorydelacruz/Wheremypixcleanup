
import { Video, Youtube } from "lucide-react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const demoVideos = [
  {
    title: "Photo Organization App Demo",
    src: "https://f002.backblazeb2.com/file/wheremypics/WMP.promo.laser.eyes9.mp4", // Replace with your real demo video location or use an available file from public
    description: "See how easy it is to turn messy photos into beautifully organized folders.",
    poster: "https://f002.backblazeb2.com/file/wheremypics/wheremypix1.png"
  },
  {
    title: "Watch the Extension in Action",
    src: "https://f002.backblazeb2.com/file/wheremypics/EXTENSION_Demo.mp4",
    description: "A step-by-step look at our chrome extension tool for photos.",
    poster: "https://f002.backblazeb2.com/file/wheremypics/extension_cover.png"
  }
];

const Demos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#090e28] via-[#232b61] to-[#2e184a]">
      <SEO
        title="CDN Demo Videos - WhereMyPix"
        description="Stream our photo organizer and Chrome extension demos hosted on our CDN for faster playback."
        keywords={["cdn demos", "photo organizer video", "chrome extension demo"]}
        ogImage="/demo.png"
        canonicalUrl="https://stripe-price-magic-58.lovable.app/demos2"
      />

      <main className="flex-1 flex flex-col items-center pt-24 pb-24 px-4">
        <div className="max-w-3xl w-full mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Video className="text-pink-400 h-8 w-8 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Watch Demo Videos</h1>
          </div>
          <p className="text-white/80 mb-16 text-md md:text-lg">
            Explore quick demos and walkthroughs of our platform—see exactly how to organize your photo chaos.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {demoVideos.map((video, i) => (
              <div key={video.title} className="bg-black/70 backdrop-blur rounded-lg shadow-2xl p-5 flex flex-col items-center animate-fade-in">
                <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden shadow-lg">
                  <video 
                    controls 
                    preload="metadata" // <--- This is the key
                    poster={video.poster}
                    className="w-full h-full object-cover rounded-lg"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Youtube className="text-red-500 h-5 w-5" />
                  <h2 className="text-lg font-semibold text-white">{video.title}</h2>
                </div>
                <p className="text-white/70 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default Demos;
