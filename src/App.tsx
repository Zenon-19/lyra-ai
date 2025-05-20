import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import RightPanel from './components/RightPanel';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import Memory from './components/Memory';
import Header from './components/Header';
import Personality from './components/Personality';
import Skills from './components/Skills';
import { useChatStore } from './store/chatStore';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import useThemeKeyboardShortcuts from './hooks/useThemeKeyboardShortcuts';

const AppContent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'memory' | 'personality' | 'skills'>('dashboard');
  const { loadMessages, clearHistory } = useChatStore();
  const { theme, setTheme } = useTheme();
  
  // Initialize theme keyboard shortcuts
  useThemeKeyboardShortcuts();

  const shortcuts = useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, action: () => setShowShortcuts(true), description: 'Show keyboard shortcuts' },
    { key: ',', ctrlKey: true, action: () => setShowSettings(true), description: 'Open settings' },
    { key: 'l', ctrlKey: true, action: clearHistory, description: 'Clear chat history' },
    { key: 'h', ctrlKey: true, action: () => setCurrentView('dashboard'), description: 'Go to dashboard' },
    { key: 'c', ctrlKey: true, action: () => setCurrentView('chat'), description: 'Go to chat' },
    { key: 'm', ctrlKey: true, action: () => setCurrentView('memory'), description: 'Go to memory' },
  ]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <div className={`flex h-screen w-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}
         style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <Sidebar onSelectView={(view) => setCurrentView(view)} currentView={currentView} />
      
      <div className="relative flex-1 flex flex-col">
        <Header 
          title={
            currentView === 'dashboard' ? 'Dashboard' : 
            currentView === 'chat' ? 'Chat' : 
            currentView === 'memory' ? 'Memory' : 'Lyra'
          }
          onSettingsClick={() => setShowSettings(true)}
          onThemeToggle={() => {}} // Let the Header's internal theme toggle work
        />
        
        {/* Hidden for now as we have header component */}
        <motion.div 
          className="hidden absolute top-4 left-24 md:left-72 z-10 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="bg-crimson text-offwhite rounded-lg px-4 py-1.5 text-xs shadow-md 
              hover:shadow-lg transition-all flex items-center gap-2"
            onClick={() => setShowSettings(true)}
            title="Settings (Ctrl+,)"
          >
            <span>⚙️</span>
            Settings
          </button>
          <button
            className="bg-charcoal/10 dark:bg-offwhite/10 rounded-lg px-4 py-1.5 text-xs shadow-md 
              hover:bg-charcoal/20 dark:hover:bg-offwhite/20 transition-all flex items-center gap-2"
            title="Theme toggle"
          >
            <span>{theme === 'light' ? '🌙' : theme === 'dark' ? '☀️' : '🧘'}</span>
            {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
          </button>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' ? (
            <motion.div
              key="dashboard"
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard username="User" />
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
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Memory />
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
          ) : (
            <motion.div
              key="default"
              className="flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard username="User" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <Modal open={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-3">Appearance</h3>
            <div className="flex gap-3">
              {(['light', 'dark', 'zen'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    theme === themeOption 
                      ? 'border-crimson bg-crimson/10 text-crimson' 
                      : 'border-charcoal/20 hover:border-charcoal/50'
                  }`}
                  onClick={() => setTheme(themeOption)}
                >
                  {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '🧘'} 
                  {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Account</h3>
            {/* Account settings would go here */}
            <p className="text-charcoal/60 dark:text-offwhite/60 italic">Coming soon</p>
          </div>
        </div>
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
