
import { Upload, Chrome, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileActionLinksProps {
  handleLinkClick: () => void;
  isAuthenticated: boolean;
}

export const MobileActionLinks = ({ handleLinkClick, isAuthenticated }: MobileActionLinksProps) => {
  return (
    <>
      <p className="text-base font-semibold text-muted-foreground mt-2">Actions</p>
      <Link
        to="/upload"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Upload className="h-4 w-4 mr-1" />
        Upload
      </Link>
      <Link
        to="/chrome-extension"
        className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
        onClick={handleLinkClick}
      >
        <Chrome className="h-4 w-4 mr-1" />
        Chrome Extension
      </Link>
      {isAuthenticated && (
        <Link
          to="/usage"
          className="text-base font-medium text-foreground hover:text-foreground/80 flex items-center gap-1 pl-2"
          onClick={handleLinkClick}
        >
          <BarChart className="h-4 w-4 mr-1" />
          Usage
        </Link>
      )}
    </>
  );
};
