import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface HelpButtonProps {
  onClick: () => void;
}

export const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-purple-600 p-3 rounded-full shadow-lg text-white hover:bg-purple-700 transition-colors"
      onClick={onClick}
    >
      <HelpCircle size={24} />
    </motion.button>
  );
};