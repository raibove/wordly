import { ComponentProps, useEffect, useState } from 'react';
import { useSetPage } from '../hooks/usePage';
import { cn } from '../utils';
import { HelpModal } from '../components/helpModal';
import { motion } from 'motion/react';
import { GamePhase } from '../types';
import { WordDisplay } from '../components/wordDisplay';
import { useGameState } from '../hooks/useGameState';
// import { useGameState } from '../hooks/useGameState';

export const HomePage = ({ postId }: { postId: string }) => {
  const setPage = useSetPage();
  const [isOpen, setIsOpen] = useState(false);
  const [firstTimeOpen, setFirstTimeOpen] = useState(false);

  const { 
    words, 
    isVisible, 
    timeLeft, 
    gamePhase,
    level,
    score,
    streak,
    isGameOver,
    handleWordSelect,
    resetGame,
    startGame,
  } = useGameState();

  const onClose = ()=>{
    if(firstTimeOpen){
      setFirstTimeOpen(false);
      startGame();
    }
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(true);
    if (!firstTimeOpen) {
      setFirstTimeOpen(true);
    }
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
      <div>
        {/* Header */}
        <div>

        </div>
        {/* Game con */}
        <div>
        <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-center mb-6 text-purple-300"
        >
            Word Memory Game
        </motion.h1>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 text-purple-400 text-sm"
          >
            {gamePhase === 'memorize' && (
              <p>Memorize these words! Time remaining:</p>
            )}

            {gamePhase === 'transition' && (
              <p>Get ready to spot the difference...</p>
            )}

            {gamePhase === 'identify' && (
              <p>Which word has changed? Click to select!</p>
            )}
          </motion.div>
              <WordDisplay
              onWordClick={handleWordSelect}
              gamePhase={gamePhase}
              words={words}
              visible={isVisible}
              />
        </div>
      </div>
      <HelpModal isOpen={isOpen} onClose={onClose}/>
    </div>
  );
};

const MagicButton = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
        props.className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
};
