import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FuturisticVisualizer from './FuturisticVisualizer';

const WelcomeModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 shadow-2xl shadow-green-500/5 w-full max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-28 h-28 flex items-center justify-center mb-4">
          <FuturisticVisualizer />
        </div>
        
        <h2 className="text-3xl font-bold text-white mt-6">Welcome to the Beat, {user?.displayName || 'Creator'}!</h2>
        <p className="text-neutral-400 mt-2 text-base">Your next masterpiece is waiting. Let's create something extraordinary.</p>
        
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(16, 185, 129, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold py-3 px-6 rounded-full transition-all text-lg shadow-lg"
        >
          Start Creating
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeModal;
