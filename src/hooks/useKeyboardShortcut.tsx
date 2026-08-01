
import { useEffect } from 'react';

interface KeyboardShortcutOptions {
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  key: string;
  callback: () => void;
}

export const useKeyboardShortcut = ({ 
  ctrlKey = false, 
  shiftKey = false, 
  altKey = false, 
  key, 
  callback 
}: KeyboardShortcutOptions) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (ctrlKey === e.ctrlKey) &&
        (shiftKey === e.shiftKey) &&
        (altKey === e.altKey) &&
        (key === e.key)
      ) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ctrlKey, shiftKey, altKey, key, callback]);
};

export default useKeyboardShortcut;
