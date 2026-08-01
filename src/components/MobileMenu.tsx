
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { MobileMainLinks } from "./mobile/MobileMainLinks";
import { MobileResourcesLinks } from "./mobile/MobileResourcesLinks";
import { MobileCompanyLinks } from "./mobile/MobileCompanyLinks";
import { MobileActionLinks } from "./mobile/MobileActionLinks";
import { MobileAuthButtons } from "./mobile/MobileAuthButtons";
import { ScrollArea } from "./ui/scroll-area";

const MobileMenu = () => {
  const { isAuthenticated, login, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close drawer when navigation happens
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Function to handle clicking on nav links
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              {/* Main Navigation */}
              <MobileMainLinks handleLinkClick={handleLinkClick} />
              
              {/* Resources Section */}
              <MobileResourcesLinks handleLinkClick={handleLinkClick} />

              {/* Company Section */}
              <MobileCompanyLinks handleLinkClick={handleLinkClick} />
              
              {/* Action Items */}
              <MobileActionLinks 
                handleLinkClick={handleLinkClick} 
                isAuthenticated={isAuthenticated}
              />
            </nav>
            
            {/* Authentication Buttons */}
            <MobileAuthButtons
              isAuthenticated={isAuthenticated}
              login={login}
              logOut={logOut}
            />
            
            {/* Theme Toggle */}
            <div className="flex justify-center pt-4">
              <ThemeToggle />
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
