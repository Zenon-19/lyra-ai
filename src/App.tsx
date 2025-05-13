import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import RightPanel from './components/RightPanel';
import Modal from './components/Modal';
import { useChatStore } from './store/chatStore';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const AppContent = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { loadMessages, clearHistory } = useChatStore();
  const { theme, toggleTheme } = useTheme();

  const shortcuts = useKeyboardShortcuts([
    { key: 'k', ctrlKey: true, action: () => setShowShortcuts(true), description: 'Show keyboard shortcuts' },
    { key: ',', ctrlKey: true, action: () => setShowSettings(true), description: 'Open settings' },
    { key: 'd', ctrlKey: true, action: toggleTheme, description: 'Toggle dark mode' },
    { key: 'l', ctrlKey: true, action: clearHistory, description: 'Clear chat history' },
  ]);
  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <div className={`flex h-screen w-screen font-sans ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      
      <div className="relative flex-1 flex flex-col">
        <motion.div 
          className="absolute top-4 left-24 md:left-72 z-10 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="bg-deepred text-offwhite rounded px-3 py-1 text-xs shadow 
              hover:bg-charcoal transition-colors flex items-center gap-2"
            onClick={() => setShowSettings(true)}
            title="Settings (Ctrl+,)"
          >
            <span>⚙️</span>
            Settings
          </button>
          <button
            className="bg-charcoal/10 rounded px-3 py-1 text-xs shadow 
              hover:bg-charcoal/20 transition-colors flex items-center gap-2"
            onClick={toggleTheme}
            title="Toggle theme (Ctrl+D)"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button
            className="bg-charcoal/10 rounded px-3 py-1 text-xs shadow 
              hover:bg-charcoal/20 transition-colors flex items-center gap-2"
            onClick={() => setShowShortcuts(true)}
            title="Keyboard shortcuts (Ctrl+K)"
          >
            ⌨️
          </button>
        </motion.div>

        <MainChat />
      </div>

      <RightPanel />

      <AnimatePresence>
        {showSettings && (
          <Modal open={true} onClose={() => setShowSettings(false)} title="Settings">
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between">
                  <span>Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="bg-charcoal/10 rounded-full p-2 hover:bg-charcoal/20 transition-colors"
                    title="Toggle theme (Ctrl+D)"
                  >
                    {theme === 'dark' ? '🌞' : '🌙'}
                  </button>
                </label>
                <label className="flex items-center justify-between">
                  <span>Notifications</span>
                  <input type="checkbox" className="rounded text-deepred" />
                </label>
                <button
                  className="bg-deepred text-offwhite px-3 py-1 rounded hover:bg-charcoal 
                    transition-colors mt-4"
                  onClick={() => {
                    clearHistory();
                    setShowSettings(false);
                  }}
                  title="Clear history (Ctrl+L)"
                >
                  Clear Chat History
                </button>
              </div>
            </div>
          </Modal>
        )}

        {showShortcuts && (
          <Modal open={true} onClose={() => setShowShortcuts(false)} title="Keyboard Shortcuts">
            <div className="space-y-4">
              {shortcuts.map(({ key, description }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm">{description}</span>
                  <kbd className="px-2 py-1 bg-charcoal/10 rounded text-xs font-mono">{key}</kbd>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
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
