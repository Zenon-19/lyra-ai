// MainApp.tsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import RightPanel from './RightPanel';
import Modal from './Modal';
import Dashboard from './Dashboard';
import Memory from './Memory';
import Header from './Header';
import Personality from './Personality';
import Skills from './Skills';
import AppDashboard from './AppDashboard';
import MemoryView from './MemoryView';
import TaskView from './TaskView';
import VoiceInterface from './VoiceInterface';
import Settings from './Settings';
import { useChatStore } from '../store/chatStore';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import useThemeKeyboardShortcuts from '../hooks/useThemeKeyboardShortcuts';

interface MainAppProps {
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [currentView, setCurrentView] = useState<'appDashboard' | 'chat' | 'memory' | 'personality' | 'skills' | 'tasks' | 'voice'>('appDashboard');
  const { loadMessages, clearHistory } = useChatStore();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  
  // Initialize theme keyboard shortcuts
  useThemeKeyboardShortcuts();

  const shortcuts = useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, action: () => setShowShortcuts(true), description: 'Show keyboard shortcuts' },
    { key: ',', ctrlKey: true, action: () => setShowSettings(true), description: 'Open settings' },
    { key: 'l', ctrlKey: true, action: clearHistory, description: 'Clear chat history' },
    { key: 'h', ctrlKey: true, action: () => setCurrentView('appDashboard'), description: 'Go to dashboard' },
    { key: 'c', ctrlKey: true, action: () => setCurrentView('chat'), description: 'Go to chat' },
    { key: 'm', ctrlKey: true, action: () => setCurrentView('memory'), description: 'Go to memory' },
    { key: 't', ctrlKey: true, action: () => setCurrentView('tasks'), description: 'Go to tasks' },
    { key: 'v', ctrlKey: true, action: () => setCurrentView('voice'), description: 'Go to voice interface' },
  ]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Handle settings closing
  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div className={`flex h-screen w-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}
         style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <Sidebar 
        onSelectView={(view) => {
          // Map old view names to new ones if needed
          if (view === 'dashboard') setCurrentView('appDashboard');
          else if (view === 'tasks') setCurrentView('tasks');
          else if (view === 'voice') setCurrentView('voice');
          else setCurrentView(view as any);
        }} 
        currentView={
          currentView === 'appDashboard' ? 'dashboard' : 
          currentView === 'tasks' ? 'tasks' :
          currentView === 'voice' ? 'voice' :
          currentView
        } 
      />
      
      <div className="relative flex-1 flex flex-col">
        <Header 
          title={
            currentView === 'appDashboard' ? 'Home' : 
            currentView === 'chat' ? 'Chat' : 
            currentView === 'memory' ? 'Memory' : 
            currentView === 'personality' ? 'Personality' :
            currentView === 'skills' ? 'Skills' :
            currentView === 'tasks' ? 'Tasks' :
            currentView === 'voice' ? 'Voice' : 'Lyra'
          }
          onThemeToggle={() => {}} // Let the Header's internal theme toggle work
          onSettingsClick={() => setShowSettings(true)}
          onLogoutClick={onLogout}
        />
        
        <AnimatePresence mode="wait">
          {currentView === 'appDashboard' ? (
            <motion.div
              key="appDashboard"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AppDashboard />
            </motion.div>
          ) : currentView === 'chat' ? (
            <motion.div
              key="chat"
              className="flex-1 flex overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MainChat />
              <RightPanel />
            </motion.div>
          ) : currentView === 'memory' ? (
            <motion.div
              key="memory"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MemoryView />
            </motion.div>
          ) : currentView === 'personality' ? (
            <motion.div
              key="personality"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Personality />
            </motion.div>
          ) : currentView === 'skills' ? (
            <motion.div
              key="skills"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Skills />
            </motion.div>
          ) : currentView === 'tasks' ? (
            <motion.div
              key="tasks"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskView />
            </motion.div>
          ) : currentView === 'voice' ? (
            <motion.div
              key="voice"
              className="flex-1 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VoiceInterface />
            </motion.div>
          ) : (
            <motion.div
              key="default"
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AppDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <Modal open={showSettings} onClose={handleSettingsClose} title="Settings">
        <Settings onClose={handleSettingsClose} />
      </Modal>

      {/* Keyboard Shortcuts Modal */}
      <Modal open={showShortcuts} onClose={() => setShowShortcuts(false)} title="Keyboard Shortcuts">
        <div className="p-4">
          <dl className="space-y-2">
            {shortcuts.map((shortcut, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-charcoal/10 last:border-0">
                <dt className="font-mono bg-charcoal/10 dark:bg-offwhite/10 px-2 rounded">
                  {shortcut.key}
                </dt>
                <dd className="text-charcoal/70 dark:text-offwhite/70">{shortcut.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Modal>
    </div>
  );
};

export default MainApp;
