import { ComponentProps, useEffect, useState } from 'react';
import { useSetPage } from '../hooks/usePage';
import { cn } from '../utils';
import { HelpModal } from '../components/helpModal';
import { motion } from 'motion/react';
import { GamePhase } from '../types';
import { WordDisplay } from '../components/wordDisplay';
import { useGameState } from '../hooks/useGameState';
import { HelpButton } from '../components/helpButton';
import { Timer } from '../components/timer';
import { GameStats } from '../components/gameStats';
import { GameOver } from '../components/GameOver';
// import { useGameState } from '../hooks/useGameState';

export const HomePage = ({ initialWords }: { initialWords: string[] }) => {
  const setPage = useSetPage();
  const [isOpen, setIsOpen] = useState(false);
  const [firstTimeOpen, setFirstTimeOpen] = useState(false);

  const {
    words,
    isVisible,
    timeLeft,
    gamePhase,
    score,
    isGameOver,
    handleWordSelect,
    resetGame,
    startGame,
    level
  } = useGameState();

  const onClose = () => {
    if (firstTimeOpen) {
      setFirstTimeOpen(false);
      startGame(initialWords);
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
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900 max-w-4xl m-auto">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
      <div className='z-50'>
        {/* Header */}
        <div className='absolute top-4 left-4 flex justify-between w-[96%] items-center'>
          <HelpButton onClick={() => setIsOpen(true)} />
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-center text-purple-300"
          >
            Word Memory Game
          </motion.h1>
          <div className='flex gap-4 items-center'>
          <GameStats level={level} />
          {gamePhase === 'memorize' && <Timer seconds={timeLeft} />}
          </div>
        </div>
        {/* Game con */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 text-purple-400 text-sm"
          >
            {gamePhase === 'memorize' && (
              <p>Memorize these words! Time remaining:</p>
            )}

            {/* {gamePhase === 'transition' && (
              <p>Get ready to spot the difference...</p>
            )} */}

            {gamePhase === 'identify' && (
              <p>Which word has changed? Click to select!</p>
            )}

            {
              gamePhase === 'end' && (
                <GameOver score={score} onCheckLeadboard={()=>{
                  setPage('leadboard');
                }}/>
                // <div className='flex flex-col items-center'>
                //   <p>Game Over!</p>
                //   <p className='text-purple-300'>Final Score: {score}</p>
                //   <MagicButton onClick={()=>{
                //   }}>Check Leaderboard</MagicButton>
                // </div>
              )
            }
          </motion.div>
          <WordDisplay
            onWordClick={handleWordSelect}
            gamePhase={gamePhase}
            words={words}
            visible={isVisible}
          />
        </div>
      </div>
      <HelpModal isOpen={isOpen} onClose={onClose} isFirstTimeOpen={firstTimeOpen} />
    </div>
  );
};