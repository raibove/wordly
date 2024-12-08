import { useState, useEffect, useCallback } from 'react';
import { getRandomWords, replaceRandomWord } from '../data/words';
import type { GameState, GamePhase } from '../types';

const INITIAL_TIME = 10;
const WORDS_PER_LEVEL = 5;
const MAX_MISTAKES = 3;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    words: [],
    changedWordIndex: null,
    isVisible: true,
    timeLeft: INITIAL_TIME,
    gamePhase: 'memorize',
    level: 1,
    score: 0,
    streak: 0,
    mistakes: 0,
    isGameOver: false,
    shouldStartGame: false,
  });

  const startNewRound = useCallback(() => {
    const initialWords = getRandomWords(WORDS_PER_LEVEL);
    setGameState(prev => ({
      ...prev,
      words: initialWords,
      changedWordIndex: null,
      isVisible: true,
      timeLeft: Math.max(INITIAL_TIME - Math.floor(prev.level / 3), 5),
      gamePhase: 'memorize'
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      words: [],
      changedWordIndex: null,
      isVisible: true,
      timeLeft: INITIAL_TIME,
      gamePhase: 'memorize',
      level: 1,
      score: 0,
      streak: 0,
      mistakes: 0,
      isGameOver: false,
      shouldStartGame: true,
    });
  }, []);

  const startGame = () => {
    setGameState(prev => ({ ...prev, shouldStartGame: true }));
  };

  const handleWordSelect = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === gameState.changedWordIndex;
    
    setGameState(prev => {
      const newMistakes = isCorrect ? prev.mistakes : prev.mistakes + 1;
      const isGameOver = newMistakes >= MAX_MISTAKES;

      return {
        ...prev,
        score: prev.score + (isCorrect ? 10 * prev.streak : 0),
        streak: isCorrect ? prev.streak + 1 : 1,
        level: isCorrect ? prev.level + 1 : prev.level,
        mistakes: newMistakes,
        isGameOver
      };
    });

    if (!isCorrect && gameState.mistakes + 1 >= MAX_MISTAKES) {
      return false;
    }

    // Show result briefly before starting new round
    setTimeout(() => {
      startNewRound();
    }, 1500);

    return isCorrect;
  }, [gameState.changedWordIndex, gameState.mistakes, startNewRound]);

  useEffect(() => {
    console.log(gameState.shouldStartGame)
    if (gameState.words.length === 0 && !gameState.isGameOver && gameState.shouldStartGame) {
      console.log('Starting new round');
      startNewRound();
    }
  }, [startNewRound, gameState.isGameOver, gameState.shouldStartGame]);

  useEffect(() => {
    if (gameState.timeLeft === 0 && gameState.gamePhase === 'memorize') {
      setGameState(prev => ({
        ...prev,
        isVisible: false,
        gamePhase: 'transition'
      }));

      setTimeout(() => {
        const { newWords, replacedIndex } = replaceRandomWord(gameState.words);
        console.log('New words:', newWords, gameState.words);
        setGameState(prev => ({
          ...prev,
          words: newWords,
          changedWordIndex: replacedIndex,
          isVisible: true,
          gamePhase: 'identify'
        }));
      }, 2000);
      return;
    }

    if (gameState.timeLeft > 0 && gameState.gamePhase === 'memorize') {
      const timer = setTimeout(
        () => setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 })),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [gameState.timeLeft, gameState.gamePhase, gameState.words]);

  return {
    startGame,
    ...gameState,
    handleWordSelect,
    resetGame
  };
};