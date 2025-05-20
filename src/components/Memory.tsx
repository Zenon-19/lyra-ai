// Memory.tsx - Timeline-inspired horizontal memory context manager
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Glass from './Glass';
import LyraAvatar from './LyraAvatar';

interface MemoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: 'conversation' | 'insight' | 'preference' | 'task';
  isPinned?: boolean;
}

interface MemoryProps {
  initialMemories?: MemoryItem[];
}

// Type-specific colors and icons
const memoryTypeConfig = {
  conversation: {
    color: 'var(--color-stealth-blue)',
    icon: '💬'
  },
  insight: {
    color: 'var(--color-crimson)',
    icon: '💡'
  },
  preference: {
    color: '#8A2BE2', // BlueViolet
    icon: '❤️'
  },
  task: {
    color: '#FF9500', // Orange
    icon: '✓'
  }
};

const Memory: React.FC<MemoryProps> = ({ initialMemories = [] }) => {
  // Sample memory items for demo
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories.length > 0 ? initialMemories : [
    {
      id: '1',
      title: 'First conversation',
      content: 'You discussed your project ideas and mentioned needing help with React component design.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      type: 'conversation'
    },
    {
      id: '2',
      title: 'Design preferences',
      content: 'You like minimalist interfaces with subtle animations and a focus on typography.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      type: 'preference',
      isPinned: true
    },
    {
      id: '3',
      title: 'Task completion reminder',
      content: 'Finish the MVP presentation by Friday.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      type: 'task'
    },
    {
      id: '4',
      title: 'Your work habits',
      content: 'You tend to work better in the evenings and prefer to have visual examples when learning new concepts.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      type: 'insight'
    },
  ]);
  
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'conversation' | 'insight' | 'preference' | 'task'>('all');

  const filteredMemories = memories.filter(m => filter === 'all' || m.type === filter);
  
  // Scroll to center on initial render
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = (scrollRef.current.scrollWidth - scrollRef.current.clientWidth) / 2;
    }
  }, []);

  // Delete memory item
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to forget this memory? This action cannot be undone.')) {
      setMemories(prev => prev.filter(m => m.id !== id));
      setActiveItem(null);
    }
  };

  // Pin/unpin memory item
  const handleTogglePin = (id: string) => {
    setMemories(prev => prev.map(m => 
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    ));
  };

  // Edit memory content
  const handleEditStart = (item: MemoryItem) => {
    setEditingItem(item.id);
    setEditContent(item.content);
  };

  const handleEditSave = () => {
    if (!editingItem) return;
    
    setMemories(prev => prev.map(m => 
      m.id === editingItem ? { ...m, content: editContent } : m
    ));
    setEditingItem(null);
  };

  const handleEditCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Memory & Context</h1>
          <p className="text-charcoal/60 dark:text-offwhite/60">
            Explore and edit what Lyra knows about you
          </p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-offwhite/50 dark:bg-charcoal/50 border border-charcoal/10 dark:border-offwhite/10"
          >
            <option value="all">All Memories</option>
            <option value="conversation">💬 Conversations</option>
            <option value="insight">💡 Insights</option>
            <option value="preference">❤️ Preferences</option>
            <option value="task">✓ Tasks</option>
          </select>
          
          <button className="px-3 py-1.5 rounded-lg bg-crimson/10 text-crimson border border-crimson/30 hover:bg-crimson/20 transition-colors">
            Clear All
          </button>
        </div>
      </motion.div>
      
      {/* Timeline */}
      <div 
        ref={scrollRef}
        className="relative flex-1 overflow-x-auto py-6 mt-2"
      >
        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-charcoal/20 dark:via-offwhite/20 to-transparent transform -translate-y-1/2" />
        
        {/* Memory items */}
        <div className="relative min-w-max px-10 flex items-center justify-center gap-16">
          {filteredMemories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`relative ${i % 2 === 0 ? 'mt-14' : 'mb-14'}`}
            >
              {/* Connector line */}
              <div 
                className="absolute left-1/2 w-0.5 bg-gradient-to-b from-transparent via-charcoal/30 dark:via-offwhite/30 to-transparent"
                style={{ 
                  height: '40px', 
                  top: i % 2 === 0 ? '-40px' : '100%',
                  transform: 'translateX(-50%)'
                }} 
              />
              
              {/* Timeline dot */}
              <div 
                className="absolute left-1/2 w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: memoryTypeConfig[memory.type].color,
                  top: i % 2 === 0 ? '-4px' : 'calc(100% + 1px)',
                  transform: 'translate(-50%, -50%)'
                }} 
              />
              
              {/* Memory card */}
              <Glass
                hover
                className={`w-48 rounded-xl ${memory.isPinned ? 'ring-2 ring-offset-2 ring-offset-offwhite dark:ring-offset-charcoal ring-yellow-400' : ''}`}
                onClick={() => setActiveItem(activeItem === memory.id ? null : memory.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${memoryTypeConfig[memory.type].color}30` }}
                    >
                      {memoryTypeConfig[memory.type].icon}
                    </div>
                    <div className="text-xs text-charcoal/50 dark:text-offwhite/50">
                      {memory.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-1">{memory.title}</h3>
                  
                  <p className="text-sm text-charcoal/70 dark:text-offwhite/70 line-clamp-2">
                    {memory.content}
                  </p>
                </div>
                
                <AnimatePresence>
                  {activeItem === memory.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 flex gap-2 justify-end border-t border-charcoal/10 dark:border-offwhite/10 mt-1">
                        <button 
                          className="p-1 rounded hover:bg-charcoal/10 dark:hover:bg-offwhite/10 text-charcoal/70 dark:text-offwhite/70"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStart(memory);
                          }}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-charcoal/10 dark:hover:bg-offwhite/10 text-charcoal/70 dark:text-offwhite/70"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTogglePin(memory.id);
                          }}
                          title={memory.isPinned ? "Unpin" : "Pin"}
                        >
                          {memory.isPinned ? "📌" : "📍"}
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-crimson/10 text-crimson"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(memory.id);
                          }}
                          title="Forget"
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Glass>
              
              {/* Date tag above or below the card */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 text-xs text-charcoal/60 dark:text-offwhite/60 whitespace-nowrap"
                style={{ 
                  bottom: i % 2 === 0 ? 'auto' : 'calc(100% + 45px)',
                  top: i % 2 === 0 ? 'calc(100% + 5px)' : 'auto',
                }}
              >
                {memory.timestamp.toLocaleDateString(undefined, { 
                  month: 'short', day: 'numeric' 
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Detail Panel */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0 p-4 bg-offwhite/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-charcoal/10 dark:border-offwhite/10 z-10"
          >
            <div className="max-w-3xl mx-auto">
              <div className="mb-3 flex justify-between">                <div className="flex items-center gap-2">
                  <LyraAvatar emotion="thoughtful" animated={false} showNameTag={false} size={32} />
                  <h3 className="text-lg font-medium">Editing Memory</h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1.5 rounded-lg border border-charcoal/20 dark:border-offwhite/20 hover:bg-charcoal/10 dark:hover:bg-offwhite/10 transition-colors"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1.5 rounded-lg bg-crimson text-offwhite hover:bg-crimson/90 transition-colors"
                    onClick={handleEditSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
              
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 rounded-lg border border-charcoal/20 dark:border-offwhite/20 bg-offwhite/50 dark:bg-charcoal/50 focus:outline-none focus:ring-2 focus:ring-crimson"
                rows={4}
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memory;
