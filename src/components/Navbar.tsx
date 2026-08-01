// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import MobileMenu from "@/components/MobileMenu";
import { useState } from "react";

const NavButton: React.FC<
  React.PropsWithChildren<{ to?: string; onClick?: () => void }>
> = ({ to, onClick, children }) => {
  const cls =
    "inline-flex h-10 items-center justify-center rounded-xl " +
    "px-4 text-sm font-medium text-white " +
    "bg-white/5 hover:bg-white/10 border border-white/10 shadow";
  return to ? (
    <NavLink to={to} className={cls}>
      {children}
    </NavLink>
  ) : (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [open, setOpen] = useState(false); // reserved if you later add a mobile menu

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="
            flex items-center gap-4
            rounded-3xl border border-white/20
            bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 backdrop-blur-md shadow-2xl
            px-5 py-3
          "
        >
          {/* Brand */}
          <Link to="/" className="shrink-0 select-none text-xl font-bold md:flex-none flex-1 text-center md:text-left">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Where My Pix
            </span>
          </Link>

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center">
            <MainNavigation handleLinkClick={() => {}} isAuthenticated={isAuthenticated} />
          </div>

          {/* Desktop controls - hidden on mobile */}
          <div className="hidden md:flex ml-auto items-center gap-2">
            {isAuthenticated ? (
              <NavButton onClick={logout}>Log Out</NavButton>
            ) : (
              <NavButton to="/login">Login</NavButton>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile hamburger menu - shown only on mobile */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
