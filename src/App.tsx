import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import MainApp from './components/MainApp';
import Dashboard from './components/Dashboard';

const AppContent = () => {
  // Get authentication state from context
  const { isAuthenticated, logout } = useAuth();
  // Check if user wants to see the marketing page (unauthenticated users)
  const [showMarketingPage, setShowMarketingPage] = useState(true);

  // Handle login/registration success
  const handleAuthSuccess = () => {
    setShowMarketingPage(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    setShowMarketingPage(true);
  };
  
  // Handle entering the app from marketing page
  const handleEnterApp = () => {
    setShowMarketingPage(false);
  };
  
  // Handle going back to marketing page
  const handleGoToMarketing = () => {
    setShowMarketingPage(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        // Unauthenticated state
        showMarketingPage ? (
          // Marketing landing page
          <motion.div
            key="marketing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard onGetStarted={handleEnterApp} />
          </motion.div>
        ) : (
          // Auth page (login/register)
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          </motion.div>
        )
      ) : (
        // Authenticated state - Main application
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MainApp onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
