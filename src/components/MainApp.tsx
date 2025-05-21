// MainApp.tsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar, { ViewType } from './Sidebar';
import MainChat from './MainChat';
import RightPanel from './RightPanel';
import Modal from './Modal';
import Memory from './Memory';
import Header from './Header';
import Personality from './Personality';
import Skills from './Skills';
import AppDashboard from './AppDashboard';
import Profile from './Profile';
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
  const [currentView, setCurrentView] = useState<ViewType>('appDashboard');
  const { loadMessages, clearHistory } = useChatStore();
  const { theme } = useTheme();
  
  // Initialize theme keyboard shortcuts
  useThemeKeyboardShortcuts();

  const shortcuts = useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, action: () => setShowShortcuts(true), description: 'Show keyboard shortcuts' },
    { key: ',', ctrlKey: true, action: () => setShowSettings(true), description: 'Open settings' },
    { key: 'l', ctrlKey: true, action: clearHistory, description: 'Clear chat history' },
    { key: 'h', ctrlKey: true, action: () => setCurrentView('appDashboard'), description: 'Go to dashboard' },
    { key: 'c', ctrlKey: true, action: () => setCurrentView('chat'), description: 'Go to chat' },
    { key: 'm', ctrlKey: true, action: () => setCurrentView('memory'), description: 'Go to memory' },
    { key: 'p', ctrlKey: true, action: () => setCurrentView('profile'), description: 'Go to profile' },
  ]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onSettingsClick={() => setShowSettings(true)}
          onLogoutClick={onLogout}
        />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentView === 'appDashboard' && (
              <motion.div
                key="appDashboard"
                className="h-full overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AppDashboard />
              </motion.div>
            )}
            
            {currentView === 'chat' && (
              <motion.div
                key="chat"
                className="flex h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MainChat />
                <RightPanel />
              </motion.div>
            )}
            
            {currentView === 'memory' && (
              <motion.div
                key="memory"
                className="h-full overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Memory />
              </motion.div>
            )}
            
            {currentView === 'personality' && (
              <motion.div
                key="personality"
                className="h-full overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Personality />
              </motion.div>
            )}
            
            {currentView === 'profile' && (
              <motion.div
                key="profile"
                className="h-full overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Profile />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Modal onClose={handleSettingsClose}>
          <Settings onClose={handleSettingsClose} />
        </Modal>
      )}
    </div>
  );
};

export default MainApp;
