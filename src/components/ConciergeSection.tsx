
import React from 'react';
import { HandHelping, Check, Clock, User, Search, Folder, Rocket, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ConciergeSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-indigo-500/10 border border-white/10 shadow-2xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-indigo-500/20 animate-gradient" />
        
        {/* Content container */}
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left column */}
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#9b87f5]/20 rounded-xl">
                    <HandHelping className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                    Done-for-You Concierge Service
                  </h2>
                </div>
                <h3 className="text-xl font-semibold text-white/90">Let Us Handle the Chaos!</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  Overwhelmed by thousands of scattered photos? Let us do the work for you!
                  Our Concierge Service takes the hassle out of organizing your digital memories.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="flex items-center text-xl font-semibold text-white/90">
                  <span className="mr-2">💎</span> What's Included?
                </h4>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Personalized Organization",
                      description: "AI + human expertise to ensure 100% accuracy and meaningful file names"
                    },
                    {
                      title: "Cross-Platform Sorting",
                      description: "We pull your photos from multiple locations (cloud, hard drives, phone backups)"
                    },
                    {
                      title: "Duplicates & Junk Removed",
                      description: "We eliminate blurry, duplicate, and irrelevant images"
                    },
                    {
                      title: "Fully Labeled & Searchable",
                      description: "Your photos will be neatly categorized with easy-to-search names"
                    },
                    {
                      title: "Delivered Ready-to-Use",
                      description: "Receive a professionally organized zip file or have us upload it to your preferred storage"
                    }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                      <div className="flex-shrink-0 p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                        <Check className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <span className="block font-semibold text-white/90">{item.title}</span>
                        <span className="text-sm text-white/70">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 space-y-8 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="space-y-6">
                  <h4 className="flex items-center text-xl font-semibold text-white/90">
                    <span className="mr-2">🎯</span> Perfect for:
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { icon: Clock, text: "Busy professionals with no time to sort through years of photos" },
                      { icon: User, text: "Families looking to preserve memories in a structured way" },
                      { icon: Search, text: "Content creators needing an efficient, searchable archive" },
                      { icon: Folder, text: "Anyone tired of digital clutter" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <item.icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-white/80">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-white/90">
                      <Rocket className="h-5 w-5 text-[#9b87f5]" />
                      <span>Get White-Glove Photo Organization</span>
                    </div>
                    <Button
                      size="lg"
                      className={cn(
                        "w-full bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED]",
                        "text-white font-semibold py-6 transform hover:scale-105 transition-all duration-300"
                      )}
                      onClick={() => window.location.href = 'https://buy.stripe.com/eVqeVd0BT6Iu98S7fldAk05'}
                    >
                      Book Now
                    </Button>
                    <p className="flex items-center justify-center text-sm text-white/60">
                      <Lightbulb className="h-4 w-4 text-amber-400 mr-1" />
                      <span>Limited Spots Available</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
