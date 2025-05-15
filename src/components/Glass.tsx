import React from 'react';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Glass: React.FC<GlassProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false 
}) => {
  const classes = [
    'glass',
    hover && 'hover-lift',
    glow && 'animate-glow',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Glass;
