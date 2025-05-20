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

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 'var(--sidebar-width, 264px)' : 'var(--sidebar-collapsed-width, 80px)' }}
      transition={{ duration: 0.2 }}
      className="glass-effect-dark text-offwhite h-full flex flex-col border-r border-deepred/20 relative z-10"
    >
      <div className="flex items-center gap-3 p-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-deepred/20 rounded-lg transition-colors"
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
      </div>      <div className="px-3 mb-6">
        <nav className="space-y-1">
          <button
            onClick={() => onSelectView('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3
              ${currentView === 'dashboard' 
                ? 'bg-crimson/30 shadow-md' 
                : 'hover:bg-crimson/20'}`}
          >
            {!isExpanded ? (
              <span className="text-xl">🏠</span>
            ) : (
              <>
                <span className="text-xl">🏠</span>
                <span>Dashboard</span>
              </>
            )}
          </button>
            <button
            onClick={() => onSelectView('chat')}
            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3
              ${currentView === 'chat' 
                ? 'bg-crimson/30 shadow-md' 
                : 'hover:bg-crimson/20'}`}
          >
            {!isExpanded ? (
              <span className="text-xl">💬</span>
            ) : (
              <>
                <span className="text-xl">💬</span>
                <span>Chat</span>
              </>
            )}
          </button>
            <button
            onClick={() => onSelectView('memory')}
            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3
              ${currentView === 'memory' 
                ? 'bg-crimson/30 shadow-md' 
                : 'hover:bg-crimson/20'}`}
          >
            {!isExpanded ? (
              <span className="text-xl">🧠</span>
            ) : (
              <>
                <span className="text-xl">🧠</span>
                <span>Memory</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => onSelectView('personality')}
            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3
              ${currentView === 'personality' 
                ? 'bg-crimson/30 shadow-md' 
                : 'hover:bg-crimson/20'}`}
          >
            {!isExpanded ? (
              <span className="text-xl">😊</span>
            ) : (
              <>
                <span className="text-xl">😊</span>
                <span>Personality</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => onSelectView('skills')}
            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3
              ${currentView === 'skills' 
                ? 'bg-crimson/30 shadow-md' 
                : 'hover:bg-crimson/20'}`}
          >
            {!isExpanded ? (
              <span className="text-xl">⚡</span>
            ) : (
              <>
                <span className="text-xl">⚡</span>
                <span>Skills</span>
              </>
            )}
          </button>
        </nav>
      </div>
      
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
              <LyraAvatar size="small" mood="happy" />
              <div>
                <div className="text-xs text-offwhite/80">Powered by</div>
                <div className="font-medium">Lyra AI</div>
              </div>
            </div>
            <div className="text-xs text-offwhite/50">v1.0</div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <LyraAvatar size="small" mood="happy" />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
