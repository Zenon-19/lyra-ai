import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import MainApp from './components/MainApp';
import Dashboard from './components/Dashboard';
import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can log error to an error reporting service here
    // console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, color: '#b91c1c', background: '#fff0f1', fontFamily: 'monospace' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
