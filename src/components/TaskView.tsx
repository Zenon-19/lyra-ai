// TaskView.tsx - Redesigned task management system
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Glass from './Glass';
import Modal from './Modal';
import LyraAvatar from './LyraAvatar';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  assignedAgent?: string;
  agentColor?: string;
  tags?: string[];
  completedAt?: Date;
  reminderTime?: Date;
}

interface TaskViewProps {
  initialTasks?: Task[];
}

const TaskView: React.FC<TaskViewProps> = ({ initialTasks = [] }) => {
  // Demo tasks
  const [tasks, setTasks] = useState<Task[]>(initialTasks.length > 0 ? initialTasks : [
    {
      id: '1',
      title: 'Finalize Lyra AI redesign proposal',
      description: 'Complete the detailed PRD document with all specifications and requirements for the redesign project.',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      status: 'inProgress',
      priority: 'high',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      assignedAgent: 'Lyra',
      agentColor: '#FF5757',
      tags: ['design', 'proposal', 'urgent']
    },
    {
      id: '2',
      title: 'Research emotion recognition algorithms',
      description: 'Find and compare the latest approaches for detecting user emotion from voice patterns.',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      status: 'todo',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignedAgent: 'Scholar',
      agentColor: '#4A7BF7',
      tags: ['research', 'ai']
    },
    {
      id: '3',
      title: 'Draft voice interface guidelines',
      description: 'Create a document outlining best practices and standards for the voice interaction components.',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      status: 'todo',
      priority: 'medium',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      assignedAgent: 'Muse',
      agentColor: '#9747FF',
      tags: ['voice', 'design', 'standards']
    },
    {
      id: '4',
      title: 'Set up development environment',
      description: 'Configure the necessary tools and libraries for the redesign project.',
      status: 'done',
      priority: 'high',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignedAgent: 'Lyra',
      agentColor: '#FF5757',
      tags: ['setup', 'development']
    },
    {
      id: '5',
      title: 'Weekly team sync',
      description: 'Discuss progress and next steps with the AI team.',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      status: 'todo',
      priority: 'high',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignedAgent: 'Lyra',
      agentColor: '#FF5757',
      tags: ['meeting', 'planning'],
      reminderTime: new Date(Date.now() + 22 * 60 * 60 * 1000) // 22 hours from now
    },
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // New task template
  const newTaskTemplate: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium'
  };
  
  // Filter and sort tasks based on current filter settings
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(term) || 
        (task.description && task.description.toLowerCase().includes(term)) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply time-based filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (activeFilter === 'today') {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      });
    } else if (activeFilter === 'upcoming') {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() > today.getTime() && task.status !== 'done';
      });
    } else if (activeFilter === 'completed') {
      filtered = filtered.filter(task => task.status === 'done');
    }
    
    // Apply priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }
    
    // Sort by priority and then by due date
    filtered.sort((a, b) => {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityValues[b.priority] - priorityValues[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return filtered;
  }, [tasks, searchTerm, activeFilter, selectedPriority]);
  
  // Group tasks by status for kanban view
  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      inProgress: filteredTasks.filter(task => task.status === 'inProgress'),
      done: filteredTasks.filter(task => task.status === 'done')
    };
  }, [filteredTasks]);
  
  const handleAddTask = () => {
    setEditingTask({
      ...newTaskTemplate,
      id: Date.now().toString(),
      createdAt: new Date()
    });
    setModalOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask({ ...task });
    setModalOpen(true);
  };
  
  const handleSaveTask = (task: Task) => {
    if (tasks.some(t => t.id === task.id)) {
      // Update existing task
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } else {
      // Add new task
      setTasks(prev => [...prev, task]);
    }
    setModalOpen(false);
    setEditingTask(null);
  };
  
  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };
  
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          status: newStatus,
          completedAt: newStatus === 'done' ? new Date() : undefined
        };
        return updatedTask;
      }
      return task;
    }));
  };
  
  // Priority color mapping
  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300'
  };
  
  // Format due date for display
  const formatDueDate = (date?: Date) => {
    if (!date) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (taskDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return taskDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: taskDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };
  
  // Task card component
  const TaskCard: React.FC<{ 
    task: Task; 
    showActions?: boolean;
    onStatusChange?: (newStatus: Task['status']) => void;
  }> = ({ task, showActions = true, onStatusChange }) => {
    const dueDateText = formatDueDate(task.dueDate);
    const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white rounded-xl p-4 shadow-md border-l-4 ${
          task.status === 'done' 
            ? 'border-l-green-500 opacity-75' 
            : isOverdue
              ? 'border-l-red-500'
              : task.priority === 'high' 
                ? 'border-l-red-500' 
                : task.priority === 'medium' 
                  ? 'border-l-yellow-500' 
                  : 'border-l-green-500'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-medium ${task.status === 'done' ? 'line-through text-charcoal/60' : 'text-charcoal'}`}>
            {task.title}
          </h3>
          <div className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </div>
        </div>
        
        {task.description && (
          <p className="text-sm text-charcoal/70 mb-3 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {task.assignedAgent && (
              <div className="flex items-center gap-1">
                <LyraAvatar size="xs" name={task.assignedAgent[0]} color={task.agentColor} />
                <span className="text-xs text-charcoal/60">{task.assignedAgent}</span>
              </div>
            )}
          </div>
          
          {dueDateText && (
            <div className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-600' : 'text-charcoal/60'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDateText}
            </div>
          )}
        </div>
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-gray-100">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-charcoal/10 text-charcoal/70 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {showActions && (
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
            <div className="flex gap-1">
              <button 
                onClick={() => handleEditTask(task)}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Edit
              </button>
              <span className="text-charcoal/30">•</span>
              <button 
                onClick={() => handleDeleteTask(task.id)}
                className="text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </button>
            </div>
            
            {task.status !== 'done' && (
              <button 
                onClick={() => onStatusChange && onStatusChange('done')}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
              >
                Complete
              </button>
            )}
          </div>
        )}
      </motion.div>
    );
  };
  
  // Task edit modal content
  const TaskEditForm: React.FC<{
    task: Task;
    onSave: (task: Task) => void;
    onCancel: () => void;
  }> = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...task });
    const [tagInput, setTagInput] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData(prev => ({ ...prev, dueDate: value ? new Date(value) : undefined }));
    };
    
    const handleAddTag = () => {
      if (tagInput.trim()) {
        setFormData(prev => ({
          ...prev, 
          tags: [...(prev.tags || []), tagInput.trim()]
        }));
        setTagInput('');
      }
    };
    
    const handleRemoveTag = (tag: string) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags?.filter(t => t !== tag)
      }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-charcoal/80 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-charcoal/80 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-charcoal/80 mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
              className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-charcoal/80 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-charcoal/80 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="assignedAgent" className="block text-sm font-medium text-charcoal/80 mb-1">
            Assigned To
          </label>
          <select
            id="assignedAgent"
            name="assignedAgent"
            value={formData.assignedAgent || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
          >
            <option value="">Unassigned</option>
            <option value="Lyra">Lyra</option>
            <option value="Scholar">Scholar</option>
            <option value="Muse">Muse</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add a tag"
              className="flex-1 px-4 py-2 rounded-lg border border-charcoal/20 focus:border-crimson focus:ring-2 focus:ring-crimson/20 outline-none transition-all"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-charcoal/10 text-charcoal/70 rounded-lg hover:bg-charcoal/20 transition-colors"
            >
              Add
            </button>
          </div>
          
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1 px-2 py-1 bg-charcoal/10 text-charcoal/70 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-charcoal/50 hover:text-red-500 transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-charcoal/20 rounded-lg text-charcoal/70 hover:bg-charcoal/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson/90 transition-colors"
          >
            Save Task
          </button>
        </div>
      </form>
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header with search and filters */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-charcoal">Task Manager</h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson/90 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Task
            </button>
            
            <div className="flex border border-charcoal/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 ${
                  viewMode === 'list' ? 'bg-charcoal/10 text-charcoal' : 'bg-white text-charcoal/60'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 ${
                  viewMode === 'kanban' ? 'bg-charcoal/10 text-charcoal' : 'bg-white text-charcoal/60'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
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
          
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-charcoal/20 bg-white/50 outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/20 transition-all"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'today', 'upcoming', 'completed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-lg ${
                activeFilter === filter
                  ? 'bg-crimson text-white'
                  : 'bg-charcoal/10 text-charcoal/70 hover:bg-charcoal/20'
              } transition-colors`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-4">
        {filteredTasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-charcoal mb-2">No tasks found</h2>
            <p className="text-charcoal/60 max-w-md">
              {searchTerm || activeFilter !== 'all' || selectedPriority !== 'all'
                ? "Try adjusting your search filters to find what you're looking for."
                : "Your task list is empty. Click 'New Task' to create your first task."
              }
            </p>
            {(searchTerm || activeFilter !== 'all' || selectedPriority !== 'all') && (
              <button 
                className="mt-4 px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson/90 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setSelectedPriority('all');
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div>
              <div className="bg-charcoal/5 rounded-lg p-3 mb-3">
                <h3 className="font-medium text-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  To Do
                  <span className="bg-charcoal/20 text-xs rounded-full px-2 py-0.5 ml-1">
                    {tasksByStatus.todo.length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {tasksByStatus.todo.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                  />
                ))}
              </div>
            </div>
            
            {/* In Progress Column */}
            <div>
              <div className="bg-charcoal/5 rounded-lg p-3 mb-3">
                <h3 className="font-medium text-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  In Progress
                  <span className="bg-charcoal/20 text-xs rounded-full px-2 py-0.5 ml-1">
                    {tasksByStatus.inProgress.length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {tasksByStatus.inProgress.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                  />
                ))}
              </div>
            </div>
            
            {/* Done Column */}
            <div>
              <div className="bg-charcoal/5 rounded-lg p-3 mb-3">
                <h3 className="font-medium text-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Done
                  <span className="bg-charcoal/20 text-xs rounded-full px-2 py-0.5 ml-1">
                    {tasksByStatus.done.length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {tasksByStatus.done.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Task edit/create modal */}
      <Modal 
        open={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask && editingTask.title ? `Edit Task: ${editingTask.title}` : 'Create New Task'}
      >
        {editingTask && (
          <TaskEditForm 
            task={editingTask} 
            onSave={handleSaveTask}
            onCancel={() => {
              setModalOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default TaskView;
