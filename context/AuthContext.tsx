import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { useModal } from './ModalContext';

// Define the user profile structure
interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    isCreator: boolean;
    photoURL?: string;
    socials?: { 
        twitter?: string;
        instagram?: string;
        soundcloud?: string;
    };
    followers: number;
    following: number;
    createdAt: number;
    firstName?: string;
    lastName?: string;
    pro?: string;
    ipi?: string;
    location?: string;
    biography?: string;
}

// Combine Firebase user with our custom profile
type AppUser = FirebaseUser & UserProfile;

type AuthMode = 'signin' | 'signup';

interface AuthContextType {
  user: AppUser | null;
  isAuthMdalOpen: boolean;
  authMode: AuthMode;
  openAuthModal: (mode: AuthMode) => void;
  closeModal: () => void;
  toggleView: () => void;
  viewAsCreator: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signUp: (email: string, pass: string, displayName: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [viewAsCreator, setViewAsCreator] = useState(false);
  const { openModal, closeModal: closeAuthModal } = useModal();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userProfile = userDoc.data() as UserProfile;
          setUser({ ...firebaseUser, ...userProfile });
          if (userProfile.isCreator) {
            setViewAsCreator(true);
          }
        } else {
          // Fallback if firestore doc is missing
          setUser(firebaseUser as AppUser); 
        }
      } else {
        setUser(null);
        setViewAsCreator(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: AuthMode) => {
    openModal('auth', { initialMode: mode });
  };

  const login = async (email: string, pass: string) => {
    const toastId = toast.loading('Signing in...');
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success('Logged in successfully!', { id: toastId });
      closeAuthModal();
      openModal('welcome');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Could not sign in. Please check your credentials.', { id: toastId });
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
        socials: {},
        followers: 0,
        following: 0,
        firstName: '',
        lastName: '',
        pro: '',
        ipi: '',
        location: '',
        biography: 'Welcome to my Ondbeat profile!',
      };

      await setDoc(doc(db, 'users', uid), newUserProfile);

      toast.success(`Welcome, ${displayName}! Your account is ready.`, { id: toastId });
      closeAuthModal();
      openModal('welcome');
      return true;
    } catch (error: any) {
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
    if (user && user.isCreator) {
      setViewAsCreator(prev => !prev);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthModalOpen, authMode, openAuthModal, closeModal: closeAuthModal, toggleView, viewAsCreator, logout, login, signUp }}>
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
