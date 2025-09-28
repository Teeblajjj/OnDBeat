
import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Mail, User, Lock, Loader2, CheckCircle } from "lucide-react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      // Reset fields when modal opens
      setError(null);
      setSuccess(null);
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
    }
  }, [isOpen, initialMode]);

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    // Let animation finish before closing
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: user.email,
          role: "artist",
        });
        setSuccess(`Welcome, ${username}! Your account has been created.`);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else { // signin mode
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Welcome back! You are now signed in.");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-md relative">
        
        {loading && (
          <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Success!</h2>
            <p className="text-lg text-gray-300 mb-6">{success}</p>
            <button
              onClick={handleClose}
              className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && <p className="bg-red-500/20 text-red-500 border border-red-500/30 p-3 rounded-lg text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-400 transition-colors"
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-400">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => handleModeChange(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-green-500 hover:text-green-400 font-medium"
                >
                  {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
