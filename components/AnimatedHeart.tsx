import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const heartVariants = {
  initial: {
    opacity: 1,
    scale: 0.5,
    x: 0,
    y: 0,
  },
  animate: {
    opacity: 0,
    scale: 1.5,
    y: -80 - Math.random() * 50,      // Move up with randomness
    x: (Math.random() - 0.5) * 100,   // Spread out left and right
    transition: {
      duration: 0.8 + Math.random() * 0.4, // Vary duration
      ease: 'easeOut',
    },
  },
};

export const AnimatedHeart = ({ id, onAnimationComplete }) => {
  return (
    <motion.div
      variants={heartVariants}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => onAnimationComplete(id)}
      style={{ position: 'absolute', bottom: 0, left: '50%' }}
    >
      <Heart size={20} className="text-green-400" fill="currentColor" />
    </motion.div>
  );
};
