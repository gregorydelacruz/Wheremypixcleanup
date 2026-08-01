// src/components/ScrollToBottom.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToBottom = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    // Delay to ensure DOM/content fully renders
    const delayScroll = setTimeout(scrollToBottom, 100); // adjust if needed

    return () => clearTimeout(delayScroll);
  }, [pathname]);

  return null;
};

export default ScrollToBottom;