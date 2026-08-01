
import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileQuestion, MessageCircle, Chrome, Shield, Video } from 'lucide-react';
import { 
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';

interface ResourcesDropdownProps {
  handleLinkClick: () => void;
}

export const ResourcesDropdown = ({ handleLinkClick }: ResourcesDropdownProps) => {
  return (
    <NavigationMenuContent>
      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black/90 backdrop-blur-sm">
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/help"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Get help with using our service and troubleshooting issues.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/examples"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <FileQuestion className="h-4 w-4" />
              <span>Examples</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              View examples of organized photos and folder structures.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/faq"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <MessageCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Find answers to commonly asked questions about our service.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/demos"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <Video className="h-4 w-4" />
              <span>Demos</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Watch step-by-step demos of our photo organization tools.
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/chrome-extension"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <Chrome className="h-4 w-4" />
              <span>Chrome Extension</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Now Available!
            </p>
          </Link>
        </NavigationMenuLink>
        
        <NavigationMenuLink asChild onClick={handleLinkClick}>
          <Link
            to="/chrome-store-policy"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <Shield className="h-4 w-4" />
              <span>Chrome Store Policy</span>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              View our Chrome Web Store privacy policy for the extension.
            </p>
          </Link>
        </NavigationMenuLink>
      </div>
    </NavigationMenuContent>
  );
};
