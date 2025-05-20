// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'zen';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isLight: boolean;
  isDark: boolean;
  isZen: boolean;
  followSystemTheme: boolean;
  setFollowSystemTheme: (follow: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isLight: true,
  isDark: false,
  isZen: false,
  followSystemTheme: false,
  setFollowSystemTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('lyra-theme');
    return (saved as Theme) || 'light';
  });
  const [followSystemTheme, setFollowSystemTheme] = useState<boolean>(() => {
    return localStorage.getItem('lyra-follow-system-theme') === 'true';
  });

  // System theme detection
  const detectSystemTheme = (): Theme => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('lyra-theme', newTheme);
    setThemeState(newTheme);
    // When manually setting theme, turn off system theme following
    if (followSystemTheme) {
      setFollowSystemTheme(false);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'zen' : 'light';
    setTheme(nextTheme);
  };

  // Handle system theme preference changes
  useEffect(() => {
    if (!followSystemTheme) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      setThemeState(detectSystemTheme());
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [followSystemTheme]);

  // Apply system theme if followSystemTheme is enabled
  useEffect(() => {
    if (followSystemTheme) {
      setThemeState(detectSystemTheme());
    }
  }, [followSystemTheme]);

  // Update followSystemTheme in localStorage
  useEffect(() => {
    localStorage.setItem('lyra-follow-system-theme', followSystemTheme.toString());
  }, [followSystemTheme]);

  useEffect(() => {
    // Set data-theme attribute for styling
    document.documentElement.setAttribute('data-theme', theme);
    
    // Toggle dark class for compatibility
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Add transition class for smooth theme changes
    document.documentElement.classList.add('theme-transition');
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [theme]);

  const themeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isZen: theme === 'zen',
    followSystemTheme,
    setFollowSystemTheme: (follow: boolean) => {
      setFollowSystemTheme(follow);
      if (follow) {
        const systemTheme = detectSystemTheme();
        setThemeState(systemTheme);
      }
    }
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
