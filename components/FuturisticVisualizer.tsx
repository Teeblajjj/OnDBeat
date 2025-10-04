import React from 'react';
import { motion } from 'framer-motion';

const FuturisticVisualizer = ({ size = 28 }) => {
  const numBars = 36;
  return (
    <div className={`relative w-${size} h-${size}`}>
      <div className="absolute inset-0 rounded-full bg-green-500/10 blur-xl"></div>
      {[...Array(numBars)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom"
          style={{ transform: `rotate(${i * 10}deg)` }}
        >
          <motion.div
            className="h-full w-full bg-green-400 rounded-full"
            style={{ transformOrigin: 'bottom' }}
            animate={{ scaleY: [0.2, 0.8, 0.2, 0.5, 0.2] }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.05,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FuturisticVisualizer;
