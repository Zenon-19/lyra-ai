// RightPanel.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryItem {
  id: string;
  category: 'context' | 'preference' | 'fact';
  content: string;
  timestamp: Date;
}

const RightPanel: React.FC = () => {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'context' | 'preference' | 'fact'>('all');
  
  // Example memory items
  const memories: MemoryItem[] = [
    { id: '1', category: 'context', content: 'User is working on UI development', timestamp: new Date() },
    { id: '2', category: 'preference', content: 'Prefers dark mode for coding', timestamp: new Date() },
    { id: '3', category: 'fact', content: 'Uses VS Code as primary editor', timestamp: new Date() },
  ];

  const filteredMemories = selectedCategory === 'all' 
    ? memories 
    : memories.filter(m => m.category === selectedCategory);

  const categoryColors = {
    context: 'bg-blue-500/10 text-blue-600',
    preference: 'bg-purple-500/10 text-purple-600',
    fact: 'bg-green-500/10 text-green-600',
  };

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: showPanel ? 'var(--panel-width, 320px)' : '0px',
        opacity: showPanel ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="glass-effect hidden md:flex flex-col h-full border-l border-deepred/20 relative"
    >
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 
          bg-deepred text-offwhite rounded-l-lg p-2 text-sm"
      >
        {showPanel ? '▶' : '◀'}
      </button>

      <div className="p-4 border-b border-deepred/20">
        <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
          <span className="w-2 h-2 bg-deepred rounded-full animate-pulse-gentle" />
          Memory & Context
        </h2>
      </div>

      <div className="p-4 border-b border-deepred/20">
        <div className="flex gap-2">
          {(['all', 'context', 'preference', 'fact'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                selectedCategory === category 
                  ? 'bg-deepred text-offwhite' 
                  : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-3"
            >
              <div className={`rounded-lg p-3 ${categoryColors[memory.category]}`}>
                <div className="text-sm">{memory.content}</div>
                <div className="text-xs opacity-60 mt-1">
                  {new Intl.DateTimeFormat('en', { 
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: true 
                  }).format(memory.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-deepred/20">
        <button 
          className="w-full py-2 px-4 bg-deepred/10 text-deepred rounded-lg text-sm 
            hover:bg-deepred/20 transition-colors"
        >
          Clear Memory
        </button>
      </div>
    </motion.aside>
  );
};

export default RightPanel;
