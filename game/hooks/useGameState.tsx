import { useState, useEffect, useCallback } from 'react';
import { replaceRandomWord } from '../data/words';
import type { GameState } from '../types';
import { sendToDevvit } from '../utils';

const INITIAL_TIME = 10;
const MAX_MISTAKES = 1;
const TIME_FOR_SUBSEQUENT_ROUNDS = 7;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    words: [],
    changedWordIndex: null,
    timeLeft: INITIAL_TIME,
    gamePhase: 'memorize',
    level: 1,
    score: 0,
    streak: 0,
    mistakes: 0,
    shouldStartGame: false,
  });

  const startNewRound = useCallback(() => {
    const initialWords: string[]=[];
    setGameState(prev => ({
      ...prev,
      words: initialWords,
      changedWordIndex: null,
      timeLeft: Math.max(INITIAL_TIME, 5),
      gamePhase: 'memorize'
    }));
  }, []);

  const moveToNextRound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      changedWordIndex: null,
      timeLeft: Math.max(TIME_FOR_SUBSEQUENT_ROUNDS, 5),
      gamePhase: 'memorize'
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      words: [],
      changedWordIndex: null,
      timeLeft: INITIAL_TIME,
      gamePhase: 'memorize',
      level: 1,
      score: 0,
      streak: 0,
      mistakes: 0,
      shouldStartGame: true,
    });
  }, []);

  const startGame = (initialWords: string[]) => {
    setGameState(prev => ({ ...prev, shouldStartGame: true, words: initialWords }));
  };

  const handleWordSelect = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === gameState.changedWordIndex;
    if(isCorrect){
      sendToDevvit({ type: 'UPDATE_SCORE', value: gameState.score + (isCorrect ? 10  : 0)});
    }
    setGameState(prev => {
      const newMistakes = isCorrect ? prev.mistakes : prev.mistakes + 1;
      const isGameOver = newMistakes >= MAX_MISTAKES;
      return {
        ...prev,
        score: prev.score + (isCorrect ? 10  : 0),
        streak: isCorrect ? prev.streak + 1 : 1,
        level: isCorrect ? prev.level + 1 : prev.level,
        mistakes: newMistakes,
        gamePhase: isGameOver ? 'end' :  'cheer',
      };
    });

    if (!isCorrect && gameState.mistakes + 1 >= MAX_MISTAKES) {
      return false;
    }

    // Show result briefly before starting new round
    setTimeout(() => {
      moveToNextRound();
    }, 1500);

    return isCorrect;
  }, [gameState.changedWordIndex, gameState.mistakes, moveToNextRound]);

  useEffect(() => {
    console.log(gameState.shouldStartGame)
    if (gameState.words.length === 0 && gameState.gamePhase !== 'end' && gameState.shouldStartGame) {
      startNewRound();
    }
  }, [startNewRound, gameState.gamePhase, gameState.shouldStartGame]);

  useEffect(() => {
    if(!gameState.shouldStartGame) return;
    if (gameState.timeLeft === 0 && gameState.gamePhase === 'memorize') {
      setGameState(prev => ({
        ...prev,
        gamePhase: 'transition'
      }));

      setTimeout(() => {
        const { newWords, replacedIndex } = replaceRandomWord(gameState.words);
        setGameState(prev => ({
          ...prev,
          words: newWords,
          changedWordIndex: replacedIndex,
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
  }, [gameState.timeLeft, gameState.gamePhase, gameState.words, gameState.shouldStartGame]);

  return {
    startGame,
    ...gameState,
    handleWordSelect,
    resetGame
  };
};