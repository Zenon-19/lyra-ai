// AuthPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from './Login';
import Register from './Register';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f5f5f5] to-[#ffe0ef] p-4">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-crimson/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <img src="/vite.svg" alt="Lyra Logo" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-2 text-charcoal">Lyra AI</h1>
          <p className="text-charcoal/60">Your personal AI team with emotional intelligence</p>
        </div>

        <motion.div
          key={authMode}
          initial={{ opacity: 0, x: authMode === 'login' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: authMode === 'login' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {authMode === 'login' ? (
            <Login 
              onGoToRegister={() => setAuthMode('register')} 
              onLoginSuccess={onAuthSuccess} 
            />
          ) : (
            <Register 
              onGoToLogin={() => setAuthMode('login')} 
              onRegisterSuccess={() => {
                // After registration, usually we'd want to log them in directly
                onAuthSuccess();
              }} 
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
