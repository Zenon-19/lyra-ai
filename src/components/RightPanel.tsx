// RightPanel.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

interface MemoryItem {
  id: string;
  category: 'context' | 'preference' | 'fact';
  content: string;
  timestamp: Date;
}

const RightPanel: React.FC = () => {
  const [showPanel, setShowPanel] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'context' | 'preference' | 'fact'>('all');
  const [activeTab, setActiveTab] = useState<'memory' | 'settings'>('memory');
  
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
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
            <span className="w-2 h-2 bg-deepred rounded-full animate-pulse-gentle" />
            {activeTab === 'memory' ? 'Memory & Context' : 'Settings'}
          </h2>
          <div className="flex">
            <button 
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-1 rounded-l-lg text-sm ${
                activeTab === 'memory' 
                  ? 'bg-deepred text-offwhite' 
                  : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
              }`}
            >
              Memory
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1 rounded-r-lg text-sm ${
                activeTab === 'settings' 
                  ? 'bg-deepred text-offwhite' 
                  : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'memory' ? (
        <>
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
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Theme Settings</h3>
            <ThemeSwitcher />
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Lyra Avatar Settings</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Show emotions</label>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-500 focus:ring-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Animation speed</label>
                <select className="text-sm bg-gray-100 rounded-md p-1">
                  <option>Fast</option>
                  <option selected>Normal</option>
                  <option>Slow</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Interface Settings</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Enable animations</label>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-500 focus:ring-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Compact mode</label>
                <input type="checkbox" className="h-4 w-4 text-blue-500 focus:ring-blue-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default RightPanel;
