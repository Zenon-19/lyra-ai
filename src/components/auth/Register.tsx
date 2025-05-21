// Register.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Glass from '../Glass';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  onGoToLogin: () => void;
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onGoToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const success = await registerUser(name, email, password);
      if (success) {
        onRegisterSuccess();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (    <Glass className="max-w-md w-full mx-auto p-8 rounded-2xl bg-white border border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="flex justify-center mb-4">
          <img src="/lyra-logo.png" alt="Lyra Logo" className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-primary">Create your account</h2>
        <p className="text-primary/60">Join thousands of users powered by AI</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-primary mb-1">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-xl font-medium ${
            isLoading 
              ? 'bg-cta/70 cursor-not-allowed' 
              : 'bg-cta hover:opacity-90'
          } text-white transition-all shadow-lg flex justify-center items-center`}
        >
          {isLoading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Create Account'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-primary/60">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-primary/60">or continue with</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" />
            Apple
          </button>
        </div>
      </form>
    </Glass>
  );
};

export default Register;
