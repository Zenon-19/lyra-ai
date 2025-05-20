// TaskManager.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Glass from './Glass';
import LyraAvatar from './LyraAvatar';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface TaskManagerProps {
  initialTasks?: Task[];
}

const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks = [] }) => {
  // Demo tasks
  const [tasks, setTasks] = useState<Task[]>(initialTasks.length > 0 ? initialTasks : [
    {
      id: '1',
      title: 'Create project presentation',
      description: 'Prepare slides for the client meeting next week.',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: 'todo',
      priority: 'high',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Check pull requests and provide feedback.',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      status: 'inProgress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Review and update the API documentation.',
      status: 'done',
      priority: 'low',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
  ]);
  
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    done: tasks.filter(task => task.status === 'done'),
  };

  // Calculate how close tasks are to their due date (for color intensity)
  const getUrgencyColor = (task: Task) => {
    if (!task.dueDate) return 'rgba(217, 59, 59, 0.1)'; // Default mild red
    
    const now = new Date();
    const diffTime = task.dueDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays < 0) return 'rgba(217, 59, 59, 0.9)'; // Overdue
    if (diffDays < 1) return 'rgba(217, 59, 59, 0.7)'; // Due today
    if (diffDays < 3) return 'rgba(217, 59, 59, 0.4)'; // Due soon
    return 'rgba(217, 59, 59, 0.1)'; // Due later
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return 'No due date';
    return date.toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', 
    });
  };

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: newTask.status as 'todo' | 'inProgress' | 'done',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      createdAt: new Date(),
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
    });
    setIsAddingTask(false);
  };

  // Update task status
  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setActiveTask(null);
  };

  // Priority labels and colors
  const priorityConfig = {
    low: { label: 'Low', color: 'bg-blue-500' },
    medium: { label: 'Medium', color: 'bg-yellow-500' },
    high: { label: 'High', color: 'bg-crimson' },
  };

  // Status column headers
  const statusHeaders = {
    todo: { icon: '📋', label: 'To Do' },
    inProgress: { icon: '🔄', label: 'In Progress' },
    done: { icon: '✅', label: 'Done' },
  };

  return (
    <div className="flex flex-col h-full p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-charcoal/60 dark:text-offwhite/60">
            Let's organize your work and boost productivity
          </p>
        </div>
        
        <button 
          className="px-4 py-2 bg-crimson text-offwhite rounded-lg shadow-md hover:bg-crimson/90 transition-colors flex items-center gap-2"
          onClick={() => setIsAddingTask(true)}
        >
          <span>+</span> New Task
        </button>
      </motion.div>

      {/* Kanban board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        {(['todo', 'inProgress', 'done'] as const).map(status => (
          <div key={status} className="flex flex-col h-full">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-xl">{statusHeaders[status].icon}</span>
              <h2 className="font-medium">{statusHeaders[status].label}</h2>
              <span className="ml-auto bg-charcoal/10 dark:bg-offwhite/10 text-xs px-2 py-0.5 rounded-full">
                {tasksByStatus[status].length}
              </span>
            </div>
            
            {/* Task list */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2">
              <AnimatePresence>
                {tasksByStatus[status].map(task => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Glass
                      hover
                      className="overflow-hidden"
                      style={{
                        borderLeft: `4px solid ${getUrgencyColor(task)}`,
                      }}
                      onClick={() => setActiveTask(activeTask === task.id ? null : task.id)}
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div 
                            className={`w-2 h-2 rounded-full ${priorityConfig[task.priority].color}`}
                            title={`${priorityConfig[task.priority].label} Priority`}
                          />
                          <span className="text-xs text-charcoal/50 dark:text-offwhite/50">
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1 line-clamp-2">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-charcoal/70 dark:text-offwhite/70 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Expanded actions */}
                      <AnimatePresence>
                        {activeTask === task.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-charcoal/10 dark:border-offwhite/10"
                          >
                            <div className="p-3 flex flex-wrap gap-2">
                              {status !== 'todo' && (
                                <button 
                                  className="px-2 py-1 bg-charcoal/10 dark:bg-offwhite/10 rounded text-xs"
                                  onClick={e => { e.stopPropagation(); handleStatusChange(task.id, 'todo'); }}
                                >
                                  Move to To Do
                                </button>
                              )}
                              
                              {status !== 'inProgress' && (
                                <button 
                                  className="px-2 py-1 bg-charcoal/10 dark:bg-offwhite/10 rounded text-xs"
                                  onClick={e => { e.stopPropagation(); handleStatusChange(task.id, 'inProgress'); }}
                                >
                                  Move to In Progress
                                </button>
                              )}
                              
                              {status !== 'done' && (
                                <button 
                                  className="px-2 py-1 bg-charcoal/10 dark:bg-offwhite/10 rounded text-xs"
                                  onClick={e => { e.stopPropagation(); handleStatusChange(task.id, 'done'); }}
                                >
                                  Move to Done
                                </button>
                              )}
                              
                              <button 
                                className="px-2 py-1 bg-crimson/10 text-crimson rounded text-xs ml-auto"
                                onClick={e => { e.stopPropagation(); handleDeleteTask(task.id); }}
                              >
                                Delete
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Glass>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Empty state */}
              {tasksByStatus[status].length === 0 && (
                <div className="h-32 flex items-center justify-center text-charcoal/40 dark:text-offwhite/40 text-sm italic">
                  <span className="text-3xl mr-2">🦄</span> No tasks yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add task modal */}
      <Modal
        open={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        title="Create New Task"
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Task Name</label>
            <input
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 rounded-lg border border-charcoal/20 dark:border-offwhite/20 bg-offwhite dark:bg-charcoal"
              placeholder="Enter task name"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Description (optional)</label>
            <textarea
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2 rounded-lg border border-charcoal/20 dark:border-offwhite/20 bg-offwhite dark:bg-charcoal"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Due Date (optional)</label>
              <input
                type="date"
                onChange={e => setNewTask({
                  ...newTask,
                  dueDate: e.target.value ? new Date(e.target.value) : undefined
                })}
                className="w-full p-2 rounded-lg border border-charcoal/20 dark:border-offwhite/20 bg-offwhite dark:bg-charcoal"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium">Priority</label>
              <select
                value={newTask.priority}
                onChange={e => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="w-full p-2 rounded-lg border border-charcoal/20 dark:border-offwhite/20 bg-offwhite dark:bg-charcoal"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="pt-2 flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-charcoal/10 dark:bg-offwhite/10 rounded-lg"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-crimson text-offwhite rounded-lg disabled:opacity-50"
              onClick={handleAddTask}
              disabled={!newTask.title}
            >
              Create Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManager;
