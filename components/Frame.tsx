
import React from 'react';

interface FrameProps {
  children: React.ReactNode;
  className?: string;
}

const Frame: React.FC<FrameProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative bg-neutral-900/60 rounded-md overflow-hidden border border-neutral-800/80 ${className}`}
    >
      {children}
    </div>
  );
};

export default Frame;
