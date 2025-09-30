import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock, Mail } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, openAuthModal, login } = useAuth();
  const [email, setEmail] = useState('creator@ondbeat.com'); // Default to creator
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  const setCredentials = (role: 'creator' | 'user') => {
      if(role === 'creator') {
          setEmail('creator@ondbeat.com');
          setPassword('password');
      } else {
          setEmail('user@ondbeat.com');
          setPassword('password');
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-lg shadow-xl p-8 max-w-sm w-full relative">
        <button onClick={closeAuthModal} className="absolute top-3 right-3 text-neutral-500 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-6">{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>

        {/* Demo account switcher */}
        <div className="flex justify-center items-center mb-4 p-2 bg-neutral-800/50 rounded-lg">
            <p className="text-sm text-neutral-400 mr-2">Test as:</p>
            <button onClick={() => setCredentials('creator')} className={`text-sm px-3 py-1 rounded-md transition-colors ${email === 'creator@ondbeat.com' ? 'bg-green-500 text-white' : 'text-neutral-400 hover:bg-neutral-700 hover:text-white'}`}>Creator</button>
            <button onClick={() => setCredentials('user')} className={`text-sm px-3 py-1 rounded-md transition-colors ${email === 'user@ondbeat.com' ? 'bg-green-500 text-white' : 'text-neutral-400 hover:bg-neutral-700 hover:text-white'}`}>User</button>
        </div>

        {error && <p className="bg-red-500/20 text-red-400 text-center p-2 rounded-md mb-4">{error}</p>}

        {authMode === 'signin' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
            <div className="mb-4 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600">Sign In</button>
          </form>
        ) : (
          <form> {/* Signup form can be built out here */}
            <div className="mb-4 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input type="text" placeholder="Username" className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
             <div className="mb-4 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input type="email" placeholder="Email" className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
            <div className="mb-4 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input type="password" placeholder="Password" className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600">Sign Up</button>
          </form>
        )}

        <p className="text-center text-neutral-500 mt-6">
          {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => openAuthModal(authMode === 'signin' ? 'signup' : 'signin')} className="text-green-500 font-bold ml-2 hover:underline">
            {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
