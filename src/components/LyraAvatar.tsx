// LyraAvatar.tsx - Enhanced with emotional awareness
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface LyraAvatarProps {
  mood?: 'neutral' | 'happy' | 'thinking' | 'concerned';
  size?: 'small' | 'medium' | 'large';
  pulseOnActivity?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

const moodColors = {
  neutral: 'var(--color-charcoal)',
  happy: 'var(--color-crimson)',
  thinking: 'var(--color-stealth-blue)',
  concerned: 'var(--color-accent)',
};

const moodGradients = {
  neutral: 'linear-gradient(135deg, rgba(31, 31, 31, 0.9), rgba(31, 31, 31, 0.7))',
  happy: 'linear-gradient(135deg, rgba(217, 59, 59, 0.9), rgba(217, 59, 59, 0.7))',
  thinking: 'linear-gradient(135deg, rgba(0, 122, 255, 0.9), rgba(0, 122, 255, 0.7))',
  concerned: 'linear-gradient(135deg, rgba(255, 149, 0, 0.9), rgba(255, 149, 0, 0.7))',
};

const sizes = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-24 h-24',
};

const fontSizes = {
  small: 'text-sm',
  medium: 'text-lg',
  large: 'text-4xl',
};

const LyraAvatar: React.FC<LyraAvatarProps> = ({ 
  mood = 'neutral', 
  size = 'medium', 
  pulseOnActivity = true,
  interactive = true,
  onClick 
}) => {
  const { theme } = useTheme();
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blinking effect
  useEffect(() => {
    if (!interactive) return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 4000 + 3000); // Random blink between 3-7 seconds
    
    return () => clearInterval(blinkInterval);
  }, [interactive]);

  const eyesVariants = {
    neutral: { 
      scaleY: isBlinking ? 0.1 : 1, 
      borderRadius: "50%" 
    },
    happy: { 
      scaleY: isBlinking ? 0.1 : 0.8, 
      borderRadius: "50%" 
    },
    thinking: { 
      scaleY: isBlinking ? 0.1 : 1, 
      borderRadius: "50%",
      rotate: 10
    },
    concerned: { 
      scaleY: isBlinking ? 0.1 : 0.8, 
      borderRadius: "50%",
      rotate: -5
    }
  };

  const mouthVariants = {
    neutral: { 
      width: size === 'large' ? '40%' : '30%',
      height: size === 'large' ? '5px' : '2px',
      borderRadius: '4px',
      opacity: 0.8
    },
    happy: { 
      width: size === 'large' ? '50%' : '40%',
      height: size === 'large' ? '10px' : '4px',
      borderRadius: '50%',
      opacity: 1
    },
    thinking: { 
      width: size === 'large' ? '30%' : '20%',
      height: size === 'large' ? '5px' : '2px',
      borderRadius: '4px',
      rotate: 10,
      opacity: 0.7,
      left: size === 'large' ? '30%' : '35%'
    },
    concerned: { 
      width: size === 'large' ? '40%' : '30%',
      height: size === 'large' ? '5px' : '2px',
      borderRadius: '4px',
      rotate: -10,
      opacity: 0.9
    }
  };

  return (
    <motion.div
      className={`relative rounded-full ${sizes[size]} overflow-hidden shadow-lg
        flex items-center justify-center cursor-pointer`}
      style={{ 
        background: moodGradients[mood],
        boxShadow: `0 0 15px ${moodColors[mood]}40`
      }}
      whileHover={interactive ? { scale: 1.05 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      animate={pulseOnActivity && mood === 'thinking' ? { 
        boxShadow: ['0 0 5px rgba(0, 122, 255, 0.4)', '0 0 20px rgba(0, 122, 255, 0.6)', '0 0 5px rgba(0, 122, 255, 0.4)']
      } : {}}
      transition={{ duration: 2, repeat: pulseOnActivity ? Infinity : 0 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {size === 'large' && (
        <>
          {/* Eyes */}
          <motion.div 
            className="absolute flex gap-2 sm:gap-3"
            style={{ 
              top: '35%',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <motion.div 
              className="bg-white rounded-full"
              style={{ width: '8px', height: '8px' }}
              animate={eyesVariants[mood]}
              transition={{ duration: 0.1 }}
            />
            <motion.div 
              className="bg-white rounded-full"
              style={{ width: '8px', height: '8px' }}
              animate={eyesVariants[mood]}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
          
          {/* Mouth */}
          <motion.div
            className="absolute bg-white"
            style={{ 
              bottom: '35%',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            animate={mouthVariants[mood]}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      
      {size !== 'large' && (
        <span className={`text-offwhite ${fontSizes[size]} font-bold`}>L</span>
      )}
    </motion.div>
  );
};

export default LyraAvatar;
