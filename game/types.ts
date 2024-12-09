export type GamePhase = 'memorize' | 'transition' | 'identify' | 'end';

export interface GameStats {
  level: number;
  score: number;
  streak: number;
}

export interface GameState extends GameStats {
  words: string[];
  changedWordIndex: number | null;
  isVisible: boolean;
  timeLeft: number;
  gamePhase: GamePhase;
  mistakes: number;
  isGameOver: boolean;
  shouldStartGame: boolean;
}