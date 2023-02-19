import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { Controls } from './controls.model';

export interface GameParams {
  // Required
  levels: number;
  character: Character;

  // Optional
  gameClockAmount?: 100000 | number;
  waitTimer?: 1000 | number;

  score?: 100 | number;
  level?: number;
  lives?: 3 | number;
  gameOver?: false | boolean;
  gameClock?: 100000 | number;
  checkCollisions?: true | boolean;
  // obstacles?: Obstacle[];
  // guts?: Guts[];

  controls?: Controls;
}

export class Game {
  static SQR_SIZE = 1024;
  static ROWS = 14;

  character: Character;

  levels: number;
  gameClockInitAmount: 100000 | number;
  waitTimer: 1000 | number;

  score: BehaviorSubject<number>;
  level: number;
  lives: BehaviorSubject<number>;
  gameOver: BehaviorSubject<boolean>;
  gameClock: BehaviorSubject<number>;
  checkCollisions: true | boolean;
  // obstacles: Obstacle[];
  // guts: Guts[];

  controls: Controls;

  constructor(params: GameParams) {
    this.levels = params.levels ?? 2;
    this.character = params.character;
    this.gameClockInitAmount = params.gameClockAmount ?? 100000;
    this.waitTimer = params.waitTimer ?? 1000;
    this.score = new BehaviorSubject<number>(params.score ?? 100);
    this.level = params.level ?? 0;
    this.lives = new BehaviorSubject<number>(params.lives ?? 3);
    this.gameOver = new BehaviorSubject<boolean>(!!params.gameOver);
    this.gameClock = new BehaviorSubject<number>(params.gameClock ?? this.gameClockInitAmount);
    this.checkCollisions = params.checkCollisions ?? true;
    // obstacles: Obstacle[];
    // guts: Guts[];
    this.controls = params.controls ?? new Controls();
  }
}
