
import { Link } from "react-router-dom";

interface MobileMainLinksProps {
  handleLinkClick: () => void;
}

export const MobileMainLinks = ({ handleLinkClick }: MobileMainLinksProps) => {
  return (
    <>
      <Link
        to="/"
        className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
        onClick={handleLinkClick}
      >
        Home
      </Link>
      <Link
        to="/features"
        className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
        onClick={handleLinkClick}
      >
        Features
      </Link>
      <Link
        to="/pricing"
        className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
        onClick={handleLinkClick}
      >
        Pricing
      </Link>
    </>
  );
};
