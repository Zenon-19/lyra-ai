// MemoryView.tsx - Next generation memory management system
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Glass from './Glass';
import LyraAvatar from './LyraAvatar';

interface MemoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: 'conversation' | 'insight' | 'preference' | 'task' | 'image' | 'link' | 'document';
  sourceAgent?: string;
  agentColor?: string;
  isPinned?: boolean;
  tags?: string[];
  imageUrl?: string;
  linkUrl?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface TimelinePeriod {
  label: string;
  memories: MemoryItem[];
}

interface MemoryViewProps {
  initialMemories?: MemoryItem[];
}

// Type-specific configurations
const memoryTypeConfig = {
  conversation: {
    color: '#4A7BF7', // Blue
    icon: '💬'
  },
  insight: {
    color: '#FF5757', // Crimson
    icon: '💡'
  },
  preference: {
    color: '#9747FF', // Purple
    icon: '❤️'
  },
  task: {
    color: '#FF9500', // Orange
    icon: '✓'
  },
  image: {
    color: '#34C759', // Green
    icon: '🖼️'
  },
  link: {
    color: '#5856D6', // Indigo
    icon: '🔗'
  },
  document: {
    color: '#FF3B30', // Red
    icon: '📄'
  }
};

// Memory card component
const MemoryCard: React.FC<{
  memory: MemoryItem;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ memory, isActive, onClick, onEdit, onDelete, onTogglePin }) => {
  const typeConfig = memoryTypeConfig[memory.type];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl overflow-hidden shadow-md cursor-pointer border-2 transition-all ${
        isActive 
          ? 'shadow-lg border-crimson/50' 
          : 'hover:shadow-lg border-white/20'
      }`}
      style={{ 
        backgroundColor: `${memory.isPinned ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'}`,
      }}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: typeConfig.color }}
            >
              {typeConfig.icon}
            </div>
            <h3 className="font-semibold text-charcoal">{memory.title}</h3>
          </div>
          {memory.isPinned && (
            <div className="text-crimson">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
              </svg>
            </div>
          )}
        </div>
        
        {memory.type === 'image' && memory.imageUrl && (
          <div className="mb-2 rounded-lg overflow-hidden">
            <img src={memory.imageUrl} alt={memory.title} className="w-full h-32 object-cover" />
          </div>
        )}
        
        <p className="text-sm text-charcoal/80 line-clamp-3">{memory.content}</p>
        
        {memory.tags && memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {memory.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-0.5 rounded-full bg-charcoal/10 text-charcoal/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-charcoal/10">
          <div className="text-xs text-charcoal/50">
            {memory.timestamp.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: memory.timestamp.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
            })}
          </div>
          
          {isActive && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
                className="text-charcoal/50 hover:text-crimson transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14M5 5v14M5 5L19 19" />
                </svg>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="text-charcoal/50 hover:text-blue-500 transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-charcoal/50 hover:text-red-500 transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Memory detail component
const MemoryDetail: React.FC<{
  memory: MemoryItem;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ memory, onClose, onEdit, onDelete, onTogglePin }) => {
  const typeConfig = memoryTypeConfig[memory.type];
  
  return (
    <Glass className="rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: typeConfig.color }}
          >
            {typeConfig.icon}
          </div>
          <h2 className="text-xl font-bold text-charcoal">{memory.title}</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onTogglePin}
            className={`p-2 rounded-full ${
              memory.isPinned 
                ? 'bg-crimson/10 text-crimson' 
                : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
            } transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={memory.isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14M5 5v14M5 5L19 19" />
            </svg>
          </button>
          <button 
            onClick={onEdit}
            className="p-2 rounded-full bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={onDelete}
            className="p-2 rounded-full bg-charcoal/5 text-charcoal/60 hover:bg-red-100 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {memory.sourceAgent && (
        <div className="flex items-center gap-2 mb-4">
          <LyraAvatar 
            size="sm" 
            color={memory.agentColor || memoryTypeConfig[memory.type].color} 
            name={memory.sourceAgent[0]} 
          />
          <span className="text-sm text-charcoal/70">Remembered by {memory.sourceAgent}</span>
        </div>
      )}
      
      {memory.type === 'image' && memory.imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={memory.imageUrl} alt={memory.title} className="w-full max-h-96 object-contain bg-white/50" />
        </div>
      )}
      
      {memory.type === 'link' && memory.linkUrl && (
        <div className="mb-4 p-4 rounded-lg bg-white/50 border border-charcoal/10">
          <a 
            href={memory.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {memory.linkUrl}
          </a>
        </div>
      )}
      
      <div className="mb-6 leading-relaxed whitespace-pre-wrap text-charcoal/80">
        {memory.content}
      </div>
      
      {memory.tags && memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {memory.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 rounded-full bg-charcoal/10 text-charcoal/70 text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center pt-4 border-t border-charcoal/10">
        <div className="text-sm text-charcoal/60">
          {memory.timestamp.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
          })}
        </div>
        
        <div className={`text-sm px-3 py-1 rounded-full ${
          memory.sentiment === 'positive' 
            ? 'bg-green-100 text-green-700' 
            : memory.sentiment === 'negative'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
        }`}>
          {memory.sentiment || 'Neutral'} Memory
        </div>
      </div>
    </Glass>
  );
};

const MemoryView: React.FC<MemoryViewProps> = ({ initialMemories = [] }) => {
  // Sample memory items for demo
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories.length > 0 ? initialMemories : [
    {
      id: '1',
      title: 'Meeting notes from client discussion',
      content: 'The client is looking for a modern interface with voice commands as a primary interaction method. They mentioned being inspired by the Pi AI interface and would like something similar but more focused on business use cases.',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      type: 'conversation',
      sourceAgent: 'Lyra',
      agentColor: '#FF5757',
      tags: ['client', 'requirements', 'interface'],
      sentiment: 'positive'
    },
    {
      id: '2',
      title: 'Interface preference',
      content: 'You prefer dark mode interfaces with high contrast and minimal animations. You mentioned that accessibility is important to you.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      type: 'preference',
      sourceAgent: 'Muse',
      agentColor: '#9747FF',
      isPinned: true,
      tags: ['ui', 'preferences', 'accessibility'],
      sentiment: 'neutral'
    },
    {
      id: '3',
      title: 'Project deadline reminder',
      content: 'Complete the first phase of the Lyra AI redesign by May 28, 2025.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      type: 'task',
      sourceAgent: 'Lyra',
      agentColor: '#FF5757',
      isPinned: true,
      tags: ['deadline', 'project', 'important'],
      sentiment: 'neutral'
    },
    {
      id: '4',
      title: 'Dashboard wireframe',
      content: 'Dashboard layout with key metrics and quick actions.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      type: 'image',
      imageUrl: '/memories/dashboard-wireframe.jpg',
      sourceAgent: 'Designer',
      agentColor: '#34C759',
      tags: ['design', 'wireframe', 'dashboard'],
      sentiment: 'positive'
    },
    {
      id: '5',
      title: 'Voice interface research',
      content: 'Collection of best practices for voice UI implementation.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      type: 'link',
      linkUrl: 'https://uxdesign.cc/voice-user-interfaces-vui-the-ultimate-designers-guide-8756cb2578a1',
      content: 'This article on UX Collective covers best practices for voice user interfaces (VUI) that we should incorporate into the Lyra redesign.',
      sourceAgent: 'Scholar',
      agentColor: '#4A7BF7',
      tags: ['research', 'voice-ui', 'reference'],
      sentiment: 'positive'
    },
    {
      id: '6',
      title: 'Emotion recognition algorithm',
      content: 'We should implement the latest emotion recognition algorithm from the research paper "Advanced Sentiment Analysis for Conversational AI" to better understand user emotions during voice interactions.',
      timestamp: new Date(), // Today
      type: 'insight',
      sourceAgent: 'Scholar',
      agentColor: '#4A7BF7',
      tags: ['ai', 'emotion', 'research'],
      sentiment: 'neutral'
    },
  ]);
  
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [editingMemory, setEditingMemory] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | keyof typeof memoryTypeConfig>('all');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [timeView, setTimeView] = useState<'all' | 'recent' | 'pinned'>('all');
  
  // Group memories by time periods
  const organizeByTimePeriod = (mems: MemoryItem[]): TimelinePeriod[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const periods: TimelinePeriod[] = [
      { label: 'Today', memories: [] },
      { label: 'Yesterday', memories: [] },
      { label: 'This Week', memories: [] },
      { label: 'This Month', memories: [] },
      { label: 'Older', memories: [] }
    ];
    
    mems.forEach(memory => {
      const date = new Date(memory.timestamp);
      if (date >= today) {
        periods[0].memories.push(memory);
      } else if (date >= yesterday) {
        periods[1].memories.push(memory);
      } else if (date >= lastWeek) {
        periods[2].memories.push(memory);
      } else if (date >= lastMonth) {
        periods[3].memories.push(memory);
      } else {
        periods[4].memories.push(memory);
      }
    });
    
    // Sort memories within each period by timestamp (newest first)
    periods.forEach(period => {
      period.memories.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    });
    
    // Only return periods that have memories
    return periods.filter(period => period.memories.length > 0);
  };
  
  // Apply filters
  const filteredMemories = memories.filter(memory => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (memory.tags && memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Type filter
    const matchesType = filterType === 'all' || memory.type === filterType;
    
    // Tag filter
    const matchesTags = filterTags.length === 0 || 
      (memory.tags && filterTags.every(tag => memory.tags.includes(tag)));
    
    // Time view
    const matchesTimeView = timeView === 'all' || 
      (timeView === 'pinned' && memory.isPinned) || 
      (timeView === 'recent' && memory.timestamp >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesType && matchesTags && matchesTimeView;
  });
  
  const timelinePeriods = organizeByTimePeriod(filteredMemories);
  
  // Get all unique tags from memories
  const allTags = Array.from(
    new Set(
      memories
        .flatMap(m => m.tags || [])
        .filter(Boolean)
    )
  );
  
  // Handle memory actions
  const handleDeleteMemory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
      setMemories(prev => prev.filter(m => m.id !== id));
      if (selectedMemory === id) {
        setSelectedMemory(null);
      }
    }
  };
  
  const handleTogglePin = (id: string) => {
    setMemories(prev => prev.map(m => 
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    ));
  };
  
  const handleEditStart = (memory: MemoryItem) => {
    setEditingMemory(memory.id);
    setEditContent(memory.content);
  };
  
  const handleEditSave = () => {
    if (editingMemory) {
      setMemories(prev => prev.map(m => 
        m.id === editingMemory ? { ...m, content: editContent } : m
      ));
      setEditingMemory(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <h1 className="text-2xl font-bold text-charcoal">Memory Timeline</h1>
          
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search memories..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all bg-white/50"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-charcoal/20 bg-white/50 outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/20 transition-all"
            >
              <option value="all">All Types</option>
              {Object.keys(memoryTypeConfig).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={timeView}
              onChange={(e) => setTimeView(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-charcoal/20 bg-white/50 outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/20 transition-all"
            >
              <option value="all">All Time</option>
              <option value="recent">Recent</option>
              <option value="pinned">Pinned</option>
            </select>
          </div>
        </div>
        
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  if (filterTags.includes(tag)) {
                    setFilterTags(filterTags.filter(t => t !== tag));
                  } else {
                    setFilterTags([...filterTags, tag]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterTags.includes(tag)
                    ? 'bg-crimson/10 text-crimson border border-crimson/30'
                    : 'bg-charcoal/10 text-charcoal/70 border border-transparent'
                } transition-colors`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-4">
        {filteredMemories.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold text-charcoal mb-2">No memories found</h2>
            <p className="text-charcoal/60 max-w-md">
              {searchTerm || filterType !== 'all' || filterTags.length > 0 || timeView !== 'all'
                ? "Try adjusting your search filters to find what you're looking for."
                : "Your memories will appear here as you interact with Lyra. Try having a conversation or adding a note."
              }
            </p>
            {(searchTerm || filterType !== 'all' || filterTags.length > 0 || timeView !== 'all') && (
              <button 
                className="mt-4 px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson/90 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterTags([]);
                  setTimeView('all');
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {timelinePeriods.map((period, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-bold text-charcoal mb-4">{period.label}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {period.memories.map(memory => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      isActive={selectedMemory === memory.id}
                      onClick={() => setSelectedMemory(memory.id)}
                      onEdit={() => handleEditStart(memory)}
                      onDelete={() => handleDeleteMemory(memory.id)}
                      onTogglePin={() => handleTogglePin(memory.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Memory detail modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              <MemoryDetail
                memory={memories.find(m => m.id === selectedMemory)!}
                onClose={() => setSelectedMemory(null)}
                onEdit={() => handleEditStart(memories.find(m => m.id === selectedMemory)!)}
                onDelete={() => handleDeleteMemory(selectedMemory)}
                onTogglePin={() => handleTogglePin(selectedMemory)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Edit memory modal */}
      <AnimatePresence>
        {editingMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setEditingMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Edit Memory</h2>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-40 p-3 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditingMemory(null)}
                  className="px-4 py-2 rounded-lg border border-charcoal/20 hover:bg-charcoal/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryView;
