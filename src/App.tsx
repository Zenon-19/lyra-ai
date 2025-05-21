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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 32,
          background: '#fff0f1',
          color: '#b91c1c',
          fontFamily: 'monospace',
          overflow: 'auto',
          zIndex: 9999
        }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error?.toString()}</pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '8px 16px',
              background: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent = () => {
  console.log('[AppContent] Initializing component');
  
  try {
    // Get authentication state from context
    const { isAuthenticated, logout } = useAuth();
    console.log('[AppContent] Auth state:', { isAuthenticated });

    // Always start with marketing page
    const [showMarketingPage, setShowMarketingPage] = useState(() => {
      // If user is authenticated, we should still show the marketing page initially
      // but allow them to proceed to the app without re-authentication
      return true;
    });

    // Handle login/registration success
    const handleAuthSuccess = () => {
      // Don't automatically hide marketing page on auth success
      console.log('[AppContent] Authentication successful');
    };
    
    // Handle logout
    const handleLogout = () => {
      console.log('[AppContent] Logout requested');
      try {
        logout();
        setShowMarketingPage(true);
      } catch (error) {
        console.error('[AppContent] Logout error:', error);
      }
    };
    
    // Handle entering the app from marketing page
    const handleEnterApp = () => {
      // Only proceed to auth page if not authenticated
      if (!isAuthenticated) {
        setShowMarketingPage(false);
      } else {
        // If already authenticated, go directly to main app
        setShowMarketingPage(false);
      }
    };
    
    console.log('[AppContent] Rendering with auth state:', isAuthenticated, 'showing marketing:', showMarketingPage);
    return (
      <AnimatePresence mode="wait">
        {showMarketingPage ? (
          // Marketing landing page - shown first regardless of auth state
          <motion.div
            key="marketing"
            className="h-screen overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard onGetStarted={handleEnterApp} />
          </motion.div>
        ) : !isAuthenticated ? (
          // Auth page if not authenticated
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          </motion.div>
        ) : (
          // Main app if authenticated
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
  } catch (error) {
    console.error('[AppContent] Render error:', error);
    return <div className="p-4 text-red-600">Error: Application failed to initialize. Please refresh the page.</div>;
  }
};

function App() {
  console.log('[App] Initializing root component');
  
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
