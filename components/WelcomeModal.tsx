import React from 'react';
import { motion } from 'framer-motion';
import { X, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WelcomeModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg w-full max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/30"
        >
          <Music size={48} className="text-green-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mt-6">Welcome, {user?.displayName || 'Music Lover'}!</h2>
        <p className="text-neutral-400 mt-2">We're glad to see you. Let's make some noise.</p>
        
        <button
          onClick={onClose}
          className="mt-8 w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-full transition-colors text-lg"
        >
          Start Exploring
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeModal;
