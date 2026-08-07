import { Heart } from "lucide-react";
import { SocialShareWrapper } from "./social/SocialShareWrapper";

const Footer = () => {
  return (
    <footer className="pt-2 pb-3 md:py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2 md:gap-6">
          <SocialShareWrapper />
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-4 text-center text-sm text-white leading-snug">
            <span>© 2025 Where My Pix. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>by Gregory de la Cruz</span>
            </div>
            <span className="hidden md:inline">•</span>
            <span>
              All proceeds go to{" "}
              <a
                href="http://delacruzfoundation.org/"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                delaCruzFoundation.org
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
