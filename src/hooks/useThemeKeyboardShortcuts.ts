import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * A custom hook to handle keyboard shortcuts for theme switching
 * Alt+L: Light theme
 * Alt+D: Dark theme
 * Alt+Z: Zen theme
 * Alt+T: Toggle through themes
 */
const useThemeKeyboardShortcuts = () => {
  const { setTheme, toggleTheme } = useTheme();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond to Alt key combinations
      if (!e.altKey) return;
      
      switch(e.key.toLowerCase()) {
        case 'l':
          // Alt+L: Switch to light theme
          setTheme('light');
          break;
        case 'd':
          // Alt+D: Switch to dark theme
          setTheme('dark');
          break;
        case 'z':
          // Alt+Z: Switch to zen theme
          setTheme('zen');
          break;
        case 't':
          // Alt+T: Toggle through themes
          toggleTheme();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTheme, toggleTheme]);
};

export default useThemeKeyboardShortcuts;
