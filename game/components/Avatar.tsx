import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  src: string;
  alt: string;
  rank: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, rank }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: rank * 0.1 }}
      className="relative"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {rank <= 3 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
          {rank}
        </div>
      )}
    </motion.div>
  );
};