// Sidebar.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';
import { useTheme } from '../contexts/ThemeContext';

export type ViewType = 'appDashboard' | 'chat' | 'memory' | 'personality' | 'skills' | 'tasks' | 'voice' | 'profile';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  console.log('[Sidebar] Rendering with currentView:', currentView);
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, toggleTheme } = useTheme();
  
  const onSelectView = (view: ViewType) => {
    console.log('[Sidebar] Changing view to:', view);
    onViewChange(view);
  };

  // Theme icon selector
  const getThemeIcon = () => {
    switch(theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'zen': return '🧘';
      default: return '☀️';
    }
  };
  const navItems: Array<{ key: ViewType; label: string; icon: React.ReactNode }> = [
    {
      key: 'appDashboard',
      label: 'Dashboard',
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    },
    {
      key: 'chat',
      label: 'Chat',
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    },
    {
      key: 'memory',
      label: 'Memory',
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
    },
    {
      key: 'personality',
      label: 'Personality',
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    }
  ];

  const bottomNavItems: Array<{ key: ViewType; label: string; icon: React.ReactNode }> = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    }
  ];

  return (    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 'var(--sidebar-width, 264px)' : 'var(--sidebar-collapsed-width, 80px)' }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col border-r border-gray-200 relative z-10 shadow-md bg-white text-[#222222]"
      aria-label="Sidebar navigation"
    >      <div className="flex items-center gap-3 p-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors text-[#6B7280]"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? '◀' : '▶'}
        </button>
        {isExpanded ? (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold tracking-wide text-[#222222]"
          >
            Lyra AI
          </motion.h1>
        ) : null}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="ml-auto p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors text-[#6B7280]"
          title={`Current theme: ${theme}`}
        >
          {getThemeIcon()}
        </motion.button>
      </div>      {/* Animated Lyra Avatar */}
      <div className="flex justify-center mb-2">
        <motion.div
          animate={{ boxShadow: '0 0 0 6px rgba(138, 185, 206, 0.15)' }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
          className="rounded-full"
        >
          <LyraAvatar emotion="cheerful" showNameTag={false} size={isExpanded ? 72 : 48} />
        </motion.div>
      </div>
      {/* Section divider */}
      <div className="border-b border-gray-200 mb-2" />
      <div className="px-3 mb-6">
        <nav className="space-y-1" aria-label="Main navigation">          {navItems.map(({ key, label, icon }) => (
            <motion.button
              key={key}
              onClick={() => onSelectView(key)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 relative transition-all group focus:outline-none focus:ring-2 focus:ring-[#8AB9CE]/50
                ${currentView === key ? 'bg-[#F9FAFB] shadow-sm' : 'hover:bg-[#F9FAFB]'}`}
              aria-current={currentView === key ? 'page' : undefined}
            >
              <span className="text-xl">{icon}</span>
              {isExpanded && <span>{label}</span>}
              {/* Animated active indicator */}
              {currentView === key && (
                <motion.span
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-[#8AB9CE] shadow-sm"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>      {/* Section divider */}
      <div className="border-b border-gray-200 mb-2" />
        <div className="flex-1 overflow-y-auto px-3">
        {/* Empty space - removed recent conversations section */}
      </div>      <div className="p-4 border-t border-gray-200">
        {isExpanded ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LyraAvatar emotion="balanced" showNameTag={false} size={32} />
              <div>
                <div className="text-xs text-[#6B7280]">Powered by</div>
                <div className="font-medium">Lyra AI</div>
              </div>
            </div>
            <div className="text-xs text-[#6B7280]">v1.0</div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <LyraAvatar emotion="balanced" showNameTag={false} size={32} />
          </div>
        )}
      </div>
      {/* Bottom navigation */}
      <div className="border-t border-gray-200 mt-auto">
        <div className="px-3 py-2">
          <nav className="space-y-1" aria-label="Bottom navigation">            {bottomNavItems.map(({ key, label, icon }) => (
              <motion.button
                key={key}
                onClick={() => onSelectView(key)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 relative transition-all group focus:outline-none focus:ring-2 focus:ring-[#8AB9CE]/50
                  ${currentView === key ? 'bg-[#F9FAFB] shadow-sm' : 'hover:bg-[#F9FAFB]'}`}
                aria-current={currentView === key ? 'page' : undefined}
              >
                <span className="text-xl">{icon}</span>
                {isExpanded && <span>{label}</span>}
                {/* Animated active indicator */}
                {currentView === key && (
                  <motion.span
                    layoutId="sidebar-active-indicator-bottom"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-[#8AB9CE] shadow-sm"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
