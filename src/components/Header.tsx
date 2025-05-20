import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import LyraAvatar from './LyraAvatar';

interface HeaderProps {
  title?: string;
  onThemeToggle?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Lyra',
  onThemeToggle,
  onSettingsClick
}) => {
  const { theme, toggleTheme } = useTheme();
  
  // Theme icon based on current theme
  const ThemeIcon = () => {
    switch(theme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      case 'dark':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      case 'zen':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="M7 14.5s1.5 2 5 2 5-2 5-2"></path>
            <path d="M7 10v0"></path>
            <path d="M17 10v0"></path>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <header className="flex justify-between items-center py-2 px-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <LyraAvatar size="small" mood="neutral" />
        </div>
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onThemeToggle || toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
          title={`Current: ${theme} theme (Alt+T to toggle)`}
        >
          <ThemeIcon />
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </motion.button>
        
        <div className="w-8 h-8 rounded-full bg-dusty-rose flex items-center justify-center text-white font-medium ml-1">
          LL
        </div>
      </div>
    </header>
  );
};

export default Header;
