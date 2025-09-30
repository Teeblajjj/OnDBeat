import { createContext, useState, useContext, ReactNode } from 'react';

// Mock user and creator accounts for development.
const mockUsers = {
  'creator@ondbeat.com': {
    id: 'creator-1',
    name: 'The Creator',
    email: 'creator@ondbeat.com',
    password: 'password',
    isCreator: true,
  },
  'user@ondbeat.com': {
    id: 'user-1',
    name: 'A User',
    email: 'user@ondbeat.com',
    password: 'password',
    isCreator: false,
  },
};

type AuthMode = 'signin' | 'signup';

interface AuthContextType {
  user: typeof mockUsers[keyof typeof mockUsers] | null;
  isAuthModalOpen: boolean;
  authMode: AuthMode;
  openAuthModal: (mode: AuthMode) => void;
  closeAuthModal: () => void;
  toggleView: () => void;
  viewAsCreator: boolean;
  logout: () => void;
  login: (email: string, pass: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [viewAsCreator, setViewAsCreator] = useState(false);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = (email: string, pass: string) => {
    const foundUser = mockUsers[email];
    if (foundUser && foundUser.password === pass) {
      setUser(foundUser);
      setViewAsCreator(foundUser.isCreator);
      closeAuthModal();
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setViewAsCreator(false);
  };

  const toggleView = () => {
    // Allow any logged-in user to toggle the view
    if (user) {
      setViewAsCreator(prev => !prev);
    }
  };

  // The user object exposed by the context will have its isCreator status overridden by the viewAsCreator state for the UI.
  const contextUser = user ? { ...user, isCreator: viewAsCreator } : null;

  return (
    <AuthContext.Provider value={{ user: contextUser, isAuthModalOpen, authMode, openAuthModal, closeAuthModal, toggleView, viewAsCreator, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
