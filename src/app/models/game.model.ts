export interface GameParams {
  // Required
  levels: number;

  // Optional
  rows?: 14 | number;
  gameClockAmount?: 100000 | number;
  waitTimerAmount?: 1000 | number;

  height?: 1024 | number;
  width?: 1024 | number;

  score?: 100 | number;
  level?: number;
  lives?: 3 | number;
  gameOver?: false | boolean;
  gameClock?: 100000 | number;
  checkCollisions?: true | boolean;
  // obstacles?: Obstacle[];
  // guts?: Guts[];
}

export class Game {
  height: 1024 | number;
  width: 1024 | number;

  levels: number;
  rows: 14 | number;
  gameClockInitAmount: 100000 | number;
  waitTimerAmount: 1000 | number;

  score: 100 | number;
  level: number;
  lives: 3 | number;
  gameOver: false | boolean;
  gameClock: 100000 | number;
  checkCollisions: true | boolean;
  // obstacles: Obstacle[];
  // guts: Guts[];

  constructor(params: GameParams) {
    this.levels = params.levels ?? 2;
    this.rows = params.rows ?? 14;
    this.gameClockInitAmount = params.gameClockAmount ?? 100000;
    this.waitTimerAmount = params.waitTimerAmount ?? 1000;
    this.height = params.height ?? 1024;
    this.width = params.width ?? 1024;
    this.score = params.score ?? 100;
    this.level = params.level ?? 0;
    this.lives = params.lives ?? 3;
    this.gameOver = !!params.gameOver;
    this.gameClock = params.gameClock ?? this.gameClockInitAmount;
    this.checkCollisions = params.checkCollisions ?? true;
    // obstacles: Obstacle[];
    // guts: Guts[];
  }
}
