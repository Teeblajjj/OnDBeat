import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

type AuthMode = 'signin' | 'signup';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    isCreator: boolean;
    photoURL?: string;
    bio?: string;
    socials?: { 
        twitter?: string;
        instagram?: string;
        soundcloud?: string;
    };
    followers: number;
    following: number;
    createdAt: number;
}

interface AuthContextType {
  user: (User & Partial<UserProfile>) | null;
  isAuthModalOpen: boolean;
  authMode: AuthMode;
  openAuthModal: (mode: AuthMode) => void;
  closeAuthModal: () => void;
  toggleView: () => void;
  viewAsCreator: boolean;
  logout: () => Promise<void>;
  login: (email: string, pass: string) => Promise<boolean>;
  signUp: (email: string, pass: string, displayName: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [viewAsCreator, setViewAsCreator] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userProfile = userDoc.data() as UserProfile;
          setUser({ ...firebaseUser, ...userProfile });
          setViewAsCreator(userProfile.isCreator);
        } else {
          setUser(firebaseUser); 
        }
      } else {
        setUser(null);
        setViewAsCreator(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (email: string, pass: string) => {
    const toastId = toast.loading('Signing in...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      const displayName = userDoc.exists() ? userDoc.data().displayName : 'User';

      toast.success(`Welcome back, ${displayName}!`, { id: toastId });
      closeAuthModal();
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Invalid credentials. Please try again.', { id: toastId });
      return false;
    }
  };

  const signUp = async (email: string, pass: string, displayName: string) => {
    const toastId = toast.loading('Creating account...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const { uid } = userCredential.user;

      const newUserProfile: UserProfile = {
        uid,
        email,
        displayName,
        isCreator: false,
        createdAt: Date.now(),
        photoURL: '',
        bio: 'Welcome to my Ondbeat profile!', // Default bio
        socials: {},
        followers: 0,
        following: 0,
      };

      await setDoc(doc(db, 'users', uid), newUserProfile);

      toast.success(`Welcome, ${displayName}! Your account is ready.`, { id: toastId });
      closeAuthModal();
      return true;
    } catch (error) {
      console.error(error);
      const message = error.code === 'auth/email-already-in-use'
        ? 'This email is already in use.'
        : 'Could not create account. Please try again.';
      toast.error(message, { id: toastId });
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast.success('You have been logged out.');
  };

  const toggleView = () => {
    if (user?.isCreator) {
      setViewAsCreator(prev => !prev);
    }
  };

  const contextUser = user ? { ...user, isCreator: viewAsCreator } : null;

  return (
    <AuthContext.Provider value={{ user: contextUser, isAuthModalOpen, authMode, openAuthModal, closeAuthModal, toggleView, viewAsCreator, logout, login, signUp }}>
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
