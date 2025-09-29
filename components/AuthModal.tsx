import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, User, Lock, Loader2, CheckCircle, Music } from 'lucide-react';

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Mock API call
    setTimeout(() => {
        if (mode === 'signup') {
            if (password !== confirmPassword) {
              setError("Passwords do not match.");
              setLoading(false);
              return;
            }
            if (username && email && password) {
                 setSuccess(`Welcome, ${username}! Your account has been created.`);
            } else {
                 setError("Please fill all fields.")
            }
        } else {
            if (email && password) {
                setSuccess("Welcome back! You are now signed in.");
            } else {
                setError("Please enter your email and password.")
            }
        }
        setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow" 
            required
        />
         {placeholder.includes('Password') && (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
          )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#181818] border border-neutral-700/50 rounded-xl shadow-lg p-8 w-full max-w-md relative overflow-hidden">
        
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
          </div>
        )}

         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
            <X size={24} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-gray-300 mb-6">{success}</p>
            <button onClick={onClose} className="w-full bg-green-500 text-black font-bold py-3 rounded-full hover:bg-green-600 transition-colors">
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
                <Music className="w-12 h-12 text-green-500 mx-auto mb-4"/>
                <h2 className="text-3xl font-extrabold text-white">
                    {mode === 'signin' ? 'Sign In to ONDBEAT' : 'Create an Account'}
                </h2>
            </div>

            {error && <p className="bg-red-900/50 text-red-400 border border-red-500/30 p-3 rounded-lg text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'signup' && (
                <InputField icon={User} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              )}
              <InputField icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {mode === 'signup' && (
                  <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-3 rounded-full hover:bg-green-600 transition-colors disabled:bg-neutral-600"
                disabled={loading}
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">
                {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => handleModeChange(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-green-400 hover:text-green-300 font-semibold underline-offset-2 underline"
                >
                  {mode === 'signin' ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
