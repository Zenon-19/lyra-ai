import React from 'react';
import { motion } from 'framer-motion';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  as?: React.ElementType;
  transition?: boolean;
}

const Glass: React.FC<GlassProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  onClick,
  interactive = true,
  as: Component = motion.div,
  transition = true
}) => {
  const classes = [
    'glass',
    hover && 'hover-lift',
    glow && 'animate-glow',
    onClick && 'cursor-pointer pulse-on-click',
    className
  ].filter(Boolean).join(' ');

  const motionProps = interactive ? {
    whileHover: hover ? { y: -3, boxShadow: "var(--shadow-hover)" } : {},
    whileTap: onClick ? { scale: 0.98 } : {},
    initial: transition ? { opacity: 0, y: 10 } : {},
    animate: transition ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component 
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Glass;
