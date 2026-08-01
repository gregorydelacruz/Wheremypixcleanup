
import { FileQuestion, HelpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileResourcesLinksProps {
  handleLinkClick: () => void;
}

export const MobileResourcesLinks = ({ handleLinkClick }: MobileResourcesLinksProps) => {
  return (
    <>
      <p className="text-base font-semibold text-muted-foreground mt-22">Resources</p>
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
    </>
  );
};
