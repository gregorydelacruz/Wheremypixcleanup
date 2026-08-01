
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BeforeAfterShowcase = () => {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Before State */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isAfter ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-rose-100/30" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Before</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-background/80 backdrop-blur-sm" 
              onClick={() => setIsAfter(true)}
            >
              See After <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={`before-${i}`}
                className="aspect-square bg-background/20 backdrop-blur-sm rounded-md shadow-sm overflow-hidden flex items-center justify-center group"
                style={{ 
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center p-2">
                  <div className="text-xs text-center text-muted-foreground">
                    IMG_{Math.floor(1000 + Math.random() * 9000)}.jpg
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-center text-muted-foreground bg-background/60 backdrop-blur-sm p-2 rounded-lg">
            Unorganized files with random names scattered across your device
          </div>
        </div>
      </div>
      
      {/* After State */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isAfter ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-100/30" />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">After</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-background/80 backdrop-blur-sm" 
              onClick={() => setIsAfter(false)}
            >
              See Before <ArrowRight className="w-4 h-4 ml-1 rotate-180" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
            {[
              { name: "Vacation Photos", count: 28 },
              { name: "Family Gatherings", count: 43 },
              { name: "Nature & Landscapes", count: 16 },
              { name: "Work & Documents", count: 12 }
            ].map((folder, i) => (
              <div 
                key={`after-${i}`}
                className="bg-background/70 backdrop-blur-sm rounded-md shadow-sm overflow-hidden flex items-center p-3"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{folder.name}</div>
                  <div className="text-xs text-muted-foreground">{folder.count} photos</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-center text-foreground bg-background/80 backdrop-blur-sm p-2 rounded-lg font-medium">
            Neatly organized, categorized folders ready to download
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterShowcase;
