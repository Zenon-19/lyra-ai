// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user properties needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  guestLogin: () => void;
  loading: boolean;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  registerUser: async () => false,
  logout: () => {},
  guestLogin: () => {},
  loading: true
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('[AuthProvider] Initializing...');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    console.log('[AuthProvider] Checking authentication state...');
    
    const checkAuth = async () => {
      try {
        // Try to get authentication data from local storage
        const authToken = localStorage.getItem('lyra_auth_token');
        const userData = localStorage.getItem('lyra_user');
        
        console.log('[AuthProvider] Auth state:', { 
          hasToken: !!authToken, 
          hasUserData: !!userData 
        });
        
        if (authToken && userData) {
          const parsedUser = JSON.parse(userData);
          console.log('[AuthProvider] Restoring authenticated session for:', parsedUser.email);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          console.log('[AuthProvider] No stored authentication found');
        }
      } catch (error) {
        console.error('[AuthProvider] Authentication check failed:', error);
        // Clear any potentially corrupted auth data
        localStorage.removeItem('lyra_auth_token');
        localStorage.removeItem('lyra_user');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function - in a real app, this would communicate with a backend API
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll simulate a successful login with mock user data
      // In a real app, make an API call to authenticate
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password) {
        const mockUser: User = {
          id: 'user-123',
          name: email.split('@')[0],
          email
        };
        
        // Store auth data in local storage
        localStorage.setItem('lyra_auth_token', 'example_token');
        localStorage.setItem('lyra_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function - would normally create a new user on the backend
  const registerUser = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const mockUser: User = {
          id: 'user-' + Math.random().toString(36).substring(7),
          name,
          email
        };
        
        // Store auth data in local storage
        localStorage.setItem('lyra_auth_token', 'example_token');
        localStorage.setItem('lyra_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Guest login function
  const guestLogin = () => {
    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substring(7),
      name: 'Guest User',
      email: 'guest@example.com'
    };
    
    localStorage.setItem('lyra_auth_token', 'guest_token');
    localStorage.setItem('lyra_user', JSON.stringify(guestUser));
    
    setUser(guestUser);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('lyra_auth_token');
    localStorage.removeItem('lyra_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    registerUser,
    logout,
    guestLogin,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
