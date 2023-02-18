export interface GameStatsParams {
  gameClock: number;
  score: number;
  // highScore: number;
}

export class GameStats {
  gameClock: number;
  score: number;
  // highScore: number;

  constructor(params: GameStatsParams) {
    this.gameClock = params.gameClock;
    this.score = params.score;
    // this.highScore = params.highScore;
  }
  update(elapsedTime: number): void {
    this.gameClock -= elapsedTime;
    this.score = Math.max(0, this.score - elapsedTime);
    // TODO: update high score
  }
}
