import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
            <MobileAuthButtons
              isAuthenticated={isAuthenticated}
              login={login}
              logOut={logOut}
            />

            <nav className="flex flex-col space-y-4">
              <MobileMainLinks handleLinkClick={handleLinkClick} />
              <MobileResourcesLinks handleLinkClick={handleLinkClick} />
              <MobileCompanyLinks handleLinkClick={handleLinkClick} />
              <MobileActionLinks
                handleLinkClick={handleLinkClick}
                isAuthenticated={isAuthenticated}
              />
            </nav>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
