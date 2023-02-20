import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { Clock } from './clock.model';

export interface GameParams {
  // Required
  levels: number;
  character: Character;

  // Optional
  waitTimer?: 1000 | number;
  won?: boolean;
  score?: 100 | number;
  level?: number;
  lives?: 3 | number;
  gameOver?: false | boolean;
  gameOverClock?: Clock;
  clock?: Clock;
  checkCollisions?: true | boolean;
  // obstacles?: Obstacle[];
  // guts?: Guts[];
}

export class Game {
  static SQR_SIZE = 1024;
  static ROWS = 14;

  character: Character;

  levels: number;
  waitTimer: 1000 | number;

  score: BehaviorSubject<number>;
  level: number;
  lives: BehaviorSubject<number>;
  won: boolean;
  gameOver: boolean;
  gameOverClock: Clock;
  clock: Clock;
  checkCollisions: true | boolean;
  board: any; // TODO
  // obstacles: Obstacle[];
  // guts: Guts[];

  constructor(params: GameParams) {
    this.levels = params.levels ?? 2;
    this.character = params.character;
    this.waitTimer = params.waitTimer ?? 1000;
    this.score = new BehaviorSubject<number>(params.score ?? 100);
    this.level = params.level ?? 0;
    this.lives = new BehaviorSubject<number>(params.lives ?? 3);
    this.won = !!params.won;
    this.gameOver = !!params.gameOver;
    this.gameOverClock = params.gameOverClock ?? new Clock({ initialTime: 3000 });
    this.clock = params.clock ?? new Clock();
    this.checkCollisions = params.checkCollisions ?? true;
    // obstacles: Obstacle[];
    // guts: Guts[];
  }
}
