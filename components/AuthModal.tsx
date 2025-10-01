import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock, Mail } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, openAuthModal, login, signUp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(email, password, displayName);
  };

  const toggleMode = () => {
    // Clear fields when switching between sign-in and sign-up
    setEmail('');
    setPassword('');
    setDisplayName('');
    openAuthModal(authMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-lg shadow-xl p-8 max-w-sm w-full relative">
        <button onClick={closeAuthModal} className="absolute top-3 right-3 text-neutral-500 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-6">{
          authMode === 'signin' ? 'Sign In' : 'Create an Account'
        }</h2>

        {authMode === 'signin' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required
              />
            </div>
            <div className="mb-4 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600">Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <div className="mb-4 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20}/>
                <input 
                    type="text" 
                    placeholder="Display Name" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
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
                    placeholder="Password (min. 6 characters)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-800 border-transparent rounded-md pl-10 pr-4 py-3 text-white placeholder-neutral-500" required/>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600">Sign Up</button>
          </form>
        )}

        <p className="text-center text-neutral-500 mt-6">
          {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleMode} className="text-green-500 font-bold ml-2 hover:underline">
            {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
