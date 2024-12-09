import React from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
}

export const Timer: React.FC<TimerProps> = ({ seconds }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <motion.div
        animate={{
          scale: seconds <= 3 ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: seconds <= 3 ? Infinity : 0,
        }}
        className="bg-gray-800 shadow-lg rounded-full w-16 h-16 flex items-center justify-center border-2 border-purple-500"
      >
        <span className="text-2xl font-bold text-purple-300">{seconds}</span>
      </motion.div>
    </motion.div>
  );
};