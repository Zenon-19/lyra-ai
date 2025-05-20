// Sidebar.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  currentView?: 'dashboard' | 'chat' | 'memory' | 'personality' | 'skills';
  onSelectView?: (view: 'dashboard' | 'chat' | 'memory' | 'personality' | 'skills') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView = 'dashboard',
  onSelectView = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // Theme icon selector
  const getThemeIcon = () => {
    switch(theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'zen': return '🧘';
      default: return '☀️';
    }
  };

  type SidebarView = 'dashboard' | 'chat' | 'memory' | 'personality' | 'skills';
  const navItems: Array<{ key: SidebarView, label: string, icon: string }> = [
    { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { key: 'chat', label: 'Chat', icon: '💬' },
    { key: 'memory', label: 'Memory', icon: '🧠' },
    { key: 'personality', label: 'Personality', icon: '😊' },
    { key: 'skills', label: 'Skills', icon: '⚡' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 'var(--sidebar-width, 264px)' : 'var(--sidebar-collapsed-width, 80px)' }}
      transition={{ duration: 0.2 }}
      className="glass-effect-dark text-offwhite h-full flex flex-col border-r border-deepred/20 relative z-10 shadow-xl"
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center gap-3 p-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-deepred/20 rounded-lg transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? '◀' : '▶'}
        </button>
        {isExpanded ? (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-deepred to-offwhite bg-clip-text text-transparent"
          >
            Lyra AI
          </motion.h1>
        ) : null}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="ml-auto p-2 hover:bg-deepred/20 rounded-lg transition-colors"
          title={`Current theme: ${theme}`}
        >
          {getThemeIcon()}
        </motion.button>
      </div>
      {/* Animated Lyra Avatar */}
      <div className="flex justify-center mb-2">
        <motion.div
          animate={{ boxShadow: '0 0 0 6px rgba(220,38,38,0.15)' }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
          className="rounded-full"
        >
          <LyraAvatar emotion="cheerful" animated={true} showNameTag={false} size={isExpanded ? 72 : 48} />
        </motion.div>
      </div>
      {/* Section divider */}
      <div className="border-b border-deepred/10 mb-2" />
      <div className="px-3 mb-6">
        <nav className="space-y-1" aria-label="Main navigation">
          {navItems.map(({ key, label, icon }) => (
            <motion.button
              key={key}
              onClick={() => onSelectView(key)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 relative transition-all group focus:outline-none focus:ring-2 focus:ring-deepred/50
                ${currentView === key ? 'bg-crimson/30 shadow-md' : 'hover:bg-crimson/20'}`}
              aria-current={currentView === key ? 'page' : undefined}
            >
              <span className="text-xl">{icon}</span>
              {isExpanded && <span>{label}</span>}
              {/* Animated active indicator */}
              {currentView === key && (
                <motion.span
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-deepred shadow-lg"
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
      {/* Section divider */}
      <div className="border-b border-deepred/10 mb-2" />
      
      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-4">
          {isExpanded && (
            <h2 className="text-xs uppercase tracking-wider text-offwhite/50 ml-2 mb-2">Recent Conversations</h2>
          )}
          <div className="space-y-1">
            {/* Conversation history items */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-3 rounded-lg hover:bg-deepred/20 cursor-pointer transition-colors flex items-center gap-2"
                onClick={() => onSelectView('chat')}
              >
                {!isExpanded ? (
                  <div className="h-2 w-2 rounded-full bg-offwhite/60" />
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-offwhite/60" />
                    <div>
                      <div className="text-sm font-medium">Chat {i + 1}</div>
                      <div className="text-xs text-offwhite/60">Yesterday</div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-deepred/20">
        {isExpanded ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LyraAvatar emotion="balanced" animated={false} showNameTag={false} size={32} />
              <div>
                <div className="text-xs text-offwhite/80">Powered by</div>
                <div className="font-medium">Lyra AI</div>
              </div>
            </div>
            <div className="text-xs text-offwhite/50">v1.0</div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <LyraAvatar emotion="balanced" animated={false} showNameTag={false} size={32} />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
