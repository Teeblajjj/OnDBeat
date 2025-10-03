import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const UploadProgressModal = ({ progress, error }) => {
  const status = error ? 'Error' : progress < 100 ? 'Uploading...' : 'Success!';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-neutral-900 bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center z-50"
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-neutral-800"
              strokeWidth="10"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-green-500"
              strokeWidth="10"
              fill="transparent"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ pathLength: progress / 100 }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          </motion.svg>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div key="error" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                <AlertTriangle size={60} className="text-red-500" />
              </motion.div>
            ) : progress < 100 ? (
              <motion.span key="progress" className="text-4xl font-bold text-white">
                {Math.round(progress)}%
              </motion.span>
            ) : (
              <motion.div key="success" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
                <CheckCircle size={60} className="text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.p 
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-neutral-300 mt-8"
        >
          {status}
        </motion.p>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadProgressModal;
