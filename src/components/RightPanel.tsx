// RightPanel.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';
import LyraAvatar from './LyraAvatar';

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
  const [showEmotions, setShowEmotions] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
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
        {/* Lyra Avatar Preview */}
        <div className="flex justify-center mt-4">
          <LyraAvatar 
            emotion={activeTab === 'memory' ? 'balanced' : 'cheerful'} 
            animated={enableAnimations} 
            showNameTag={true} 
            accessibilityMode={!enableAnimations} 
            size={96}
          />
        </div>
      </div>

      {activeTab === 'memory' ? (
        <>
          <div className="p-4 border-b border-deepred/20">
            <div className="flex gap-2">
              {(['all', 'context', 'preference', 'fact'] as const).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.08 }}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-deepred/40 focus:ring-offset-2 duration-150 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-tr from-deepred to-pink-400 text-offwhite scale-105 shadow-lg' 
                      : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {category === 'context' && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                    {category === 'preference' && <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                    {category === 'fact' && <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                    {category}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="popLayout">
              {filteredMemories.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col items-center justify-center h-40 text-charcoal/60"
                >
                  <span className="text-3xl mb-2">🧠</span>
                  <span className="text-base font-medium">No memories found in this category.</span>
                  <span className="text-xs mt-1">Lyra will remember as you interact more.</span>
                </motion.div>
              ) : (
                filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="mb-3"
                  >
                    <div className={`rounded-lg p-3 shadow-md border border-white/40 backdrop-blur-md ${categoryColors[memory.category]}`}>
                      <div className="text-sm font-medium flex items-center gap-2">
                        {memory.category === 'context' && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                        {memory.category === 'preference' && <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                        {memory.category === 'fact' && <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                        {memory.content}
                      </div>
                      <div className="text-xs opacity-60 mt-1">
                        {new Intl.DateTimeFormat('en', { 
                          hour: 'numeric', 
                          minute: 'numeric',
                          hour12: true 
                        }).format(memory.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-deepred/20">
            <motion.button 
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              className="w-full py-2 px-4 bg-deepred/10 text-deepred rounded-lg text-sm font-semibold hover:bg-deepred/20 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span className="text-lg">🧹</span> Clear Memory
            </motion.button>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-deepred/80 to-pink-400 text-white shadow-md">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              Theme Settings
            </h3>
            <ThemeSwitcher />
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500/80 to-cyan-400 text-white shadow-md">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              Lyra Avatar Settings
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gradient-to-tr from-pink-400 to-deepred/80 rounded-full mr-1" />
                  Show emotions
                </label>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  animate={{ background: showEmotions ? 'linear-gradient(to top right, #f472b6, #be123c)' : '#e5e7eb' }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-deepred/40 ${showEmotions ? 'bg-gradient-to-tr from-pink-400 to-deepred/80' : 'bg-charcoal/10'}`}
                  onClick={() => setShowEmotions(v => !v)}
                >
                  <span className="sr-only">Toggle emotions</span>
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-200 ${showEmotions ? 'bg-gradient-to-tr from-pink-400 to-deepred/80 translate-x-5' : 'bg-gray-300 translate-x-0'}`}
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full mr-1" />
                  Animation speed
                </label>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-32"
                >
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={animationSpeed}
                    onChange={e => setAnimationSpeed(Number(e.target.value))}
                    className="w-full accent-blue-500 rounded-lg overflow-hidden bg-gray-200 h-2 appearance-none"
                  />
                  <div className="flex justify-between text-xs mt-1 text-charcoal/50">
                    <span className={animationSpeed === 1 ? 'font-bold text-blue-600' : ''}>Fast</span>
                    <span className={animationSpeed === 2 ? 'font-bold text-blue-600' : ''}>Normal</span>
                    <span className={animationSpeed === 3 ? 'font-bold text-blue-600' : ''}>Slow</span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ x: (animationSpeed - 1) * 48 }}
                    className="absolute -top-6 left-0 text-xs font-semibold text-blue-600"
                  >
                    {animationSpeed === 1 ? 'Fast' : animationSpeed === 2 ? 'Normal' : 'Slow'}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-green-500/80 to-lime-400 text-white shadow-md">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              Interface Settings
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gradient-to-tr from-green-400 to-lime-400 rounded-full mr-1" />
                  Enable animations
                </label>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  animate={{ background: enableAnimations ? 'linear-gradient(to top right, #4ade80, #a3e635)' : '#e5e7eb' }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/40 ${enableAnimations ? 'bg-gradient-to-tr from-green-400 to-lime-400' : 'bg-charcoal/10'}`}
                  onClick={() => setEnableAnimations(v => !v)}
                >
                  <span className="sr-only">Toggle animations</span>
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-200 ${enableAnimations ? 'bg-gradient-to-tr from-green-400 to-lime-400 translate-x-5' : 'bg-gray-300 translate-x-0'}`}
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gradient-to-tr from-gray-400 to-charcoal/60 rounded-full mr-1" />
                  Compact mode
                </label>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  animate={{ background: compactMode ? 'linear-gradient(to top right, #a1a1aa, #334155)' : '#e5e7eb' }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/40 ${compactMode ? 'bg-gradient-to-tr from-gray-400 to-charcoal/60' : 'bg-charcoal/10'}`}
                  onClick={() => setCompactMode(v => !v)}
                >
                  <span className="sr-only">Toggle compact mode</span>
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`inline-block h-5 w-5 transform rounded-full shadow transition-transform duration-200 ${compactMode ? 'bg-gradient-to-tr from-gray-400 to-charcoal/60 translate-x-5' : 'bg-gray-300 translate-x-0'}`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default RightPanel;
