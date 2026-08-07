import { FileQuestion, HelpCircle, MessageCircle, Chrome, Shield, Video } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileResourcesLinksProps {
  handleLinkClick: () => void;
}

export const MobileResourcesLinks = ({ handleLinkClick }: MobileResourcesLinksProps) => {
  return (
    <>
      <p className="text-base font-semibold text-muted-foreground mt-2">Resources</p>
      <Link
        to="/examples"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <FileQuestion className="h-4 w-4 mr-1" />
        Examples
      </Link>
      <Link
        to="/help"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <HelpCircle className="h-4 w-4 mr-1" />
        Help
      </Link>
      <Link
        to="/faq"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        FAQ
      </Link>
      <Link
        to="/demos"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Video className="h-4 w-4 mr-1" />
        Demos
      </Link>
      <Link
        to="/chrome-extension"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Chrome className="h-4 w-4 mr-1" />
        Chrome Extension
      </Link>
      <Link
        to="/chrome-store-policy"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Shield className="h-4 w-4 mr-1" />
        Chrome Store Policy
      </Link>
    </>
  );
};
