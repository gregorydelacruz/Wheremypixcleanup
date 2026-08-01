

import { Link } from "react-router-dom"
import { Upload, BarChart } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ResourcesDropdown } from "@/components/navigation/ResourcesDropdown"
import { CompanyDropdown } from "@/components/navigation/CompanyDropdown"

interface MainNavigationProps {
  handleLinkClick: () => void;
  isAuthenticated?: boolean;
}

export const MainNavigation = ({ handleLinkClick, isAuthenticated }: MainNavigationProps) => {
  return (
    <NavigationMenu className="flex flex-row flex-wrap items-center justify-center gap-2">
      <NavigationMenuList className="flex-row space-x-2">
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
            Home
          </Link>
        </NavigationMenuItem>
		
		
		
	
      
        <NavigationMenuItem>
          <Link to="/pricing" className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
            Pricing
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <ResourcesDropdown handleLinkClick={handleLinkClick} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <CompanyDropdown handleLinkClick={handleLinkClick} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/upload" className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
            <Upload size={16} className="mr-1" />
            Upload
          </Link>
        </NavigationMenuItem>
        {isAuthenticated && (
          <NavigationMenuItem>
            <Link to="/usage" className={navigationMenuTriggerStyle()} onClick={handleLinkClick}>
              <BarChart size={16} className="mr-1" />
              Usage
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
