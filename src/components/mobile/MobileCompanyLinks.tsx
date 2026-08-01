
import { Info, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileCompanyLinksProps {
  handleLinkClick: () => void;
}

export const MobileCompanyLinks = ({ handleLinkClick }: MobileCompanyLinksProps) => {
  return (
    <>
      <p className="text-base font-semibold text-muted-foreground mt-2">Company</p>
      <Link
        to="/about"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Info className="h-4 w-4 mr-1" />
        About
      </Link>
      <Link
        to="/contact"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <FileText className="h-4 w-4 mr-1" />
        Contact
      </Link>
      <Link
        to="/terms"
        className="text-base font-medium text-foreground hover:text-foreground/80 pl-2"
        onClick={handleLinkClick}
      >
        Terms
      </Link>
      <Link
        to="/privacy"
        className="text-base font-medium text-foreground hover:text-foreground/80 pl-2"
        onClick={handleLinkClick}
      >
        Privacy
      </Link>
    </>
  );
};
