import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-primary hover:opacity-90">
          Where My Pix
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition">
            Features
          </Link>
          
          {/* NEW: Blog Link */}
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition">
            Blog
          </Link>

          <Link to="/upload" className="text-sm text-muted-foreground hover:text-primary transition">
            Upload
          </Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition">
            Pricing
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition">
            Company
          </Link>
        </nav>

        {/* Call to Action */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
