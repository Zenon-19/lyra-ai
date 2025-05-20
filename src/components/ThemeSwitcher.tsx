import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { theme, toggleTheme, setTheme, followSystemTheme, setFollowSystemTheme } = useTheme();

  return (
    <div className={`theme-switcher ${className}`}>
      <div className="flex flex-col gap-3 mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Select Theme</h3>
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme('light')}
            className={`theme-button p-3 rounded-xl flex flex-col items-center justify-center ${
              theme === 'light' 
                ? 'bg-gradient-to-r from-dusty-rose to-coral text-white ring-2 ring-coral shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Light theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <span className="text-xs mt-1">Light</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme('dark')}
            className={`theme-button p-3 rounded-xl flex flex-col items-center justify-center ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-tiger-lily to-coral text-white ring-2 ring-tiger-lily shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Dark theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span className="text-xs mt-1">Dark</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme('zen')}
            className={`theme-button p-3 rounded-xl flex flex-col items-center justify-center ${
              theme === 'zen' 
                ? 'bg-gradient-to-r from-dusty-rose to-white text-deep-burgundy ring-2 ring-dusty-rose shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Zen theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M7 14.5s1.5 2 5 2 5-2 5-2"></path>
              <path d="M7 10v0"></path>
              <path d="M17 10v0"></path>
            </svg>
            <span className="text-xs mt-1">Zen</span>
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <input
          id="system-theme-toggle"
          type="checkbox"
          checked={followSystemTheme}
          onChange={() => setFollowSystemTheme(!followSystemTheme)}
          className="form-checkbox h-4 w-4 text-coral focus:ring-tiger-lily rounded"
        />
        <label htmlFor="system-theme-toggle" className="text-sm flex-1">
          Follow system preferences
        </label>
        <div className={`text-xs px-2 py-1 rounded-full ${followSystemTheme ? 'bg-coral/20 text-tiger-lily' : 'bg-gray-200 text-gray-500'}`}>
          {followSystemTheme ? 'On' : 'Off'}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Keyboard Shortcuts</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">Alt+L</kbd>
            <span>Light theme</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">Alt+D</kbd>
            <span>Dark theme</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">Alt+Z</kbd>
            <span>Zen theme</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">Alt+T</kbd>
            <span>Toggle themes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
