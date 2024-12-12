import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Zap } from 'lucide-react';

interface GameStatsProps {
  level: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ level }) => {
  const controls = useAnimation();

  // Function to trigger the power-up animation
  const playPowerUpAnimation = async () => {
    await controls.start({
      scale: [1, 1.2, 1],
      // filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    });
  };

  // Trigger animation when level changes
  useEffect(() => {
    playPowerUpAnimation();
  }, [level]);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="translate-x-1/2 flex gap-6"
    >
      <motion.div
        animate={controls}
        className="flex items-center gap-2 bg-purple-500 px-4 py-2 rounded-full transition-shadow duration-300"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Zap size={20} className="text-yellow-400" />
        </motion.div>
        <span className="text-purple-200">{level}</span>
      </motion.div>
    </motion.div>
  );
};
