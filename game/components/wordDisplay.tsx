import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordDisplayProps {
  words: string[];
  visible: boolean;
  gamePhase: string;
  onWordClick?: (index: number) => void;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ words, visible, gamePhase, onWordClick }) => {
  if(gamePhase === 'end') return null;

  if (!visible) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-32 text-xl font-bold text-purple-300"
      >
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Get ready to spot the difference...
        </motion.span>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {words.map((word, index) => (
          <motion.div
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => gamePhase === 'identify' && onWordClick?.(index)}
            className={`
              bg-gray-800/60 rounded-lg py-2 px-4 transform transition-all
              ${gamePhase === 'identify' ? 'cursor-pointer hover:bg-gray-700/80' : ''}
              border border-purple-500/10 backdrop-blur-sm
            `}
          >
            <motion.p
              className="text-lg font-medium text-center text-purple-300"
              whileHover={gamePhase === 'identify' ? { scale: 1.02 } : {}}
            >
              {word}
            </motion.p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};