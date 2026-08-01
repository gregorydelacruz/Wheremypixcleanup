
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, FileText, MessageSquare } from 'lucide-react';
import { 
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';

interface CompanyDropdownProps {
  handleLinkClick: () => void;
}

export const CompanyDropdown = ({ handleLinkClick }: CompanyDropdownProps) => {
  return (
    <NavigationMenuContent>
      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/about"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <Info className="h-4 w-4" />
              <span>About</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Learn about our mission and the team behind WhereMyPix.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/contact"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <MessageSquare className="h-4 w-4" />
              <span>Contact</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Get in touch with our support team for assistance.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/terms"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <FileText className="h-4 w-4" />
              <span>Terms</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Read our terms of service and legal information.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/privacy"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <FileText className="h-4 w-4" />
              <span>Privacy</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              View our privacy policy and how we protect your data.
            </p>
          </Link>
        </NavigationMenuLink>
      </div>
    </NavigationMenuContent>
  );
};
