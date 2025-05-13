// LyraAvatar.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface LyraAvatarProps {
  mood?: 'neutral' | 'happy' | 'thinking' | 'concerned';
  size?: 'sm' | 'md' | 'lg';
}

const moodColors = {
  neutral: 'bg-charcoal',
  happy: 'bg-deepred',
  thinking: 'bg-charcoal/80',
  concerned: 'bg-deepred/80',
};

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const LyraAvatar: React.FC<LyraAvatarProps> = ({ mood = 'neutral', size = 'md' }) => {
  return (
    <motion.div
      className={`relative rounded-full ${sizes[size]} ${moodColors[mood]} 
        flex items-center justify-center shadow-lg overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-deepred/20 to-transparent"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <span className="text-offwhite text-xl">L</span>
    </motion.div>
  );
};

export default LyraAvatar;
