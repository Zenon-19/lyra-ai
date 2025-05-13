// Sidebar.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

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
        {isExpanded && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-deepred to-offwhite bg-clip-text text-transparent"
          >
            Lyra AI
          </motion.h1>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="space-y-2">
          {/* Conversation history items */}
          {isExpanded && Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-3 rounded-lg hover:bg-deepred/20 cursor-pointer transition-colors"
            >
              <div className="text-sm font-medium">Previous Chat {i + 1}</div>
              <div className="text-xs text-offwhite/60">Yesterday</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={`p-4 border-t border-deepred/20 ${isExpanded ? 'text-sm' : 'text-xs'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-deepred rounded-full animate-pulse-gentle" />
          <span>{isExpanded ? 'Connected to Lyra' : '●'}</span>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
