import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Avatar } from './Avatar';
import type { LeaderboardPlayer } from '../types';

interface LeaderboardEntryProps {
  player: LeaderboardPlayer;
  index: number;
}

const RankIcon = ({ rank }: { rank: number }) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return null;
  }
};

export const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ player, index }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-center gap-4 p-3 rounded-lg ${
        index <= 2 ? 'bg-purple-900/20' : 'hover:bg-purple-900/10'
      } transition-colors`}
    >
      <div className="w-8 flex justify-center">
        <RankIcon rank={index + 1} />
      </div>
      {/* <Avatar src={player.avatar} alt={player.username} rank={index + 1} /> */}
      <div className="flex-1">
        <p className="font-semibold text-purple-100">{player.username}</p>
        <p className="text-sm text-purple-300">{player.score} points</p>
      </div>
      <div className="text-right">
        {/* <p className="text-sm font-medium text-purple-200">Level {player.level}</p> */}
        {/* <p className="text-xs text-purple-400">Best Streak: {player.bestStreak}</p> */}
      </div>
    </motion.div>
  );
};