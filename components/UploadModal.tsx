import React from 'react';
import { X, Music, Folder, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const UploadModal = ({ isOpen, onClose }) => {
  const options = [
    { title: 'Upload Track', href: '/creator/upload', icon: <Music size={28} className="text-green-500" />, description: 'Upload a single beat to the marketplace.' },
    { title: 'Create a Collection', href: '/creator/collection', icon: <Folder size={28} className="text-green-500" />, description: 'Group multiple tracks into an album or EP.' },
    { title: 'Upload Sound Kit', href: '/creator/soundkit', icon: <Package size={28} className="text-green-500" />, description: 'Sell your sample packs and drum kits.' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">What would you like to upload?</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {options.map((option, index) => (
              <Link href={option.href} key={option.title} passHref legacyBehavior>
                <motion.a
                  onClick={onClose}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/80 border border-transparent hover:border-green-500 transition-all duration-200 cursor-pointer"
                >
                  {option.icon}
                  <div>
                    <p className="font-bold text-white">{option.title}</p>
                    <p className="text-sm text-neutral-400">{option.description}</p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;
