// AppDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LyraAvatar from './LyraAvatar';

interface RecentSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  agentName: string;
  agentColor: string;
}

interface Task {
  id: string;
  title: string;
  status: 'new' | 'in-progress' | 'completed';
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Memory {
  id: string;
  type: 'text' | 'image' | 'link';
  content: string;
  timestamp: string;
  tags: string[];
}

const AppDashboard: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('User');
  
  // Example data - in a real app, this would come from API calls
  const recentSessions: RecentSession[] = [
    {
      id: '1',
      title: 'Weekly planning session',
      preview: 'We discussed your goals for the week and created a plan.',
      timestamp: '2 hours ago',
      agentName: 'Lyra',
      agentColor: '#FF5757'
    },
    {
      id: '2',
      title: 'Research on quantum computing',
      preview: 'We explored recent developments in quantum computing.',
      timestamp: '1 day ago',
      agentName: 'Scholar',
      agentColor: '#4A7BF7'
    },
    {
      id: '3',
      title: 'Creative writing session',
      preview: 'We worked on your short story about time travel.',
      timestamp: '3 days ago',
      agentName: 'Muse',
      agentColor: '#9747FF'
    }
  ];

  const upcomingTasks: Task[] = [
    {
      id: '1',
      title: 'Prepare presentation for meeting',
      status: 'in-progress',
      dueDate: 'Tomorrow',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Review quarterly reports',
      status: 'new',
      dueDate: 'In 3 days',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Schedule team building event',
      status: 'new',
      dueDate: 'Next week',
      priority: 'low'
    }
  ];

  const recentMemories: Memory[] = [
    {
      id: '1',
      type: 'text',
      content: 'Your goal is to finish the project proposal by Friday',
      timestamp: '1 day ago',
      tags: ['work', 'goals']
    },
    {
      id: '2',
      type: 'image',
      content: '/memories/whiteboard-session.jpg',
      timestamp: '3 days ago',
      tags: ['brainstorming', 'project']
    },
    {
      id: '3',
      type: 'link',
      content: 'https://example.com/interesting-article',
      timestamp: '5 days ago',
      tags: ['research', 'reading']
    }
  ];

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header greeting */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-2">
          {greeting}, {userName}
        </h1>
        <p className="text-primary/60">
          Here's what's happening with your AI team today
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions column */}
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-background hover:shadow-md border border-transparent hover:border-gray-100">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-primary">New Chat</div>
                  <div className="text-sm text-primary/60">Start a conversation with Lyra</div>
                </div>
              </button>

              <button className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-background hover:shadow-md border border-transparent hover:border-gray-100">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-primary">New Task</div>
                  <div className="text-sm text-primary/60">Create a task for your AI team</div>
                </div>
              </button>

              <button className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-background hover:shadow-md border border-transparent hover:border-gray-100">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-primary">Voice Session</div>
                  <div className="text-sm text-primary/60">Talk directly with your AI team</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold mb-4 text-primary">Your AI Team</h2>            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-gray-100">
                <LyraAvatar size="md" color="#8AB9CE" />
                <div>
                  <div className="font-medium text-primary">Lyra</div>
                  <div className="text-sm text-primary/60">Personal Assistant</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                <LyraAvatar size="md" color="#8AB9CE" name="S" />
                <div>
                  <div className="font-medium text-primary">Scholar</div>
                  <div className="text-sm text-primary/60">Research Expert</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                <LyraAvatar size="md" color="#8AB9CE" name="M" />
                <div>
                  <div className="font-medium text-primary">Muse</div>
                  <div className="text-sm text-primary/60">Creative Partner</div>
                </div>
              </div>
              
              <button className="mt-2 text-sm text-accent font-medium hover:text-accent/80 transition-colors flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Agent
              </button>
            </div>
          </div>
        </motion.div>        {/* Recent sessions and tasks column */}
        <motion.div 
          className="col-span-1 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Recent Sessions</h2>
              <button className="text-sm text-accent font-medium hover:text-accent/80 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentSessions.map(session => (
                <div 
                  key={session.id}
                  className="p-4 rounded-xl border border-gray-100 hover:bg-background hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="flex gap-3">
                    <LyraAvatar size="sm" color="#8AB9CE" name={session.agentName[0]} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium truncate text-primary">{session.title}</h3>
                        <span className="text-xs text-primary/50">{session.timestamp}</span>
                      </div>
                      <p className="text-sm text-primary/70 truncate">{session.preview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Upcoming Tasks</h2>
                <button className="text-sm text-accent font-medium hover:text-accent/80 transition-colors">
                  View All
                </button>
              </div>
                <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-xl border border-gray-100 hover:bg-background hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input 
                          type="checkbox"
                          className="w-5 h-5 border-2 rounded-md border-primary/30 checked:border-accent checked:bg-accent focus:ring-accent focus:ring-offset-0"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate text-primary">{task.title}</h3>
                        {task.dueDate && (
                          <div className="flex items-center gap-1 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-primary/50">{task.dueDate}</span>
                          </div>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Recent Memories</h2>
                <button className="text-sm text-accent font-medium hover:text-accent/80 transition-colors">
                  View All
                </button>
              </div>
                <div className="space-y-3">
                {recentMemories.map(memory => (
                  <div 
                    key={memory.id}
                    className="p-3 rounded-xl border border-gray-100 hover:bg-background hover:border-gray-200 transition-all"
                  >
                    {memory.type === 'text' ? (
                      <div className="text-sm text-primary/80">{memory.content}</div>
                    ) : memory.type === 'image' ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                          <img src={memory.content} alt="Memory" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-sm text-primary/80">Image saved</div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <div className="text-sm text-primary/80 truncate">
                          <a href={memory.content} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            {memory.content.replace('https://', '')}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex gap-1">
                        {memory.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-background text-primary/70 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-primary/50">{memory.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppDashboard;
