export type GamePhase = 'memorize' | 'transition' | 'identify' | 'cheer' | 'end';

export interface GameStats {
  level: number;
  score: number;
  streak: number;
}

export interface GameState extends GameStats {
  words: string[];
  changedWordIndex: number | null;
  timeLeft: number;
  gamePhase: GamePhase;
  mistakes: number;
  shouldStartGame: boolean;
}
export interface LeaderboardPlayer {
  // id: string;
  username: string;
  // avatar: string;
  score: number;
  // level: number;
  // bestStreak: number;
}