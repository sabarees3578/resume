import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'blue' | 'purple' | 'white';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'white'
}) => {
  const variantStyles = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    white: 'bg-white'
  };

  return (
    <div
      className={`${variantStyles[variant]} border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 ${className}`}
    >
      {children}
    </div>
  );
};
