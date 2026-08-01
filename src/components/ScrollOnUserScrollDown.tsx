import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollOnUserScrollDown = () => {
  const hasScrolled = useRef(false);
  const lastScrollY = useRef(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    // Exclude upload page from auto-scroll behavior
    const excludedPaths = ['/upload', '/usage', '/admin'];
    if (excludedPaths.some(path => location.pathname.startsWith(path))) {
      return;
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (
        !hasScrolled.current &&
        currentScroll > lastScrollY.current // only trigger if user scrolls down
      ) {
        hasScrolled.current = true;

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });

        // Optionally: remove the scroll listener to prevent future triggers
        window.removeEventListener('scroll', handleScroll);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return null;
};

export default ScrollOnUserScrollDown;