import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap } from 'lucide-react';

interface GameStatsProps {
  level: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ level }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className=" translate-x-1/2 flex gap-6"
    >
      <div className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full">
        <Trophy size={20} className="text-yellow-400" />
        <span className="text-purple-200">Level {level}</span>
      </div>
      {/* <div className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full">
        <Zap size={20} className="text-yellow-400" />
        <span className="text-purple-200">{score}</span>
      </div> */}
      {/* {streak > 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full"
        >
          <ArrowUp size={20} className="text-red-400" />
          <span className="text-purple-200">x{streak}</span>
        </motion.div>
      )} */}
    </motion.div>
  );
};