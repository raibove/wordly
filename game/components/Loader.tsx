import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  label?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

const colorMap = {
  primary: 'border-purple-500 border-t-purple-200',
  secondary: 'border-purple-300 border-t-purple-100',
  white: 'border-white/30 border-t-white'
};

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'primary',
  label
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`
          ${sizeMap[size]}
          ${colorMap[color]}
          border-4
          rounded-full
          animate-spin
        `}
      />
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-purple-300"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};