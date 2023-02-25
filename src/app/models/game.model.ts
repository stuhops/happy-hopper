import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { Clock } from './clock.model';
import { GameBoard } from './game-board.model';

export interface GameParams {
  // Required
  levels: number;
  character: Character;
  board: GameBoard;

  // Optional
  waitTimer?: 1000 | number;
  won?: boolean;
  score?: 100 | number;
  level?: number;
  lives?: 3 | number;
  gameOver?: false | boolean;
  gameOverClock?: Clock;
  clock?: Clock;
  // obstacles?: Obstacle[];
}

export class Game {
  static SQR_SIZE = 1024;
  static ROWS = 14;
  static ROW_HEIGHT = Game.SQR_SIZE / Game.ROWS;

  character: Character;

  levels: number;
  waitTimer: Clock;

  _score: BehaviorSubject<number>;
  level: number;
  lives: BehaviorSubject<number>;
  won: boolean;
  gameOver: boolean;
  gameOverClock: Clock;
  clock: Clock;
  board: GameBoard;
  // obstacles: Obstacle[];

  constructor(params: GameParams) {
    this.levels = params.levels ?? 2;
    this.character = params.character;
    this.board = params.board;
    this.waitTimer = new Clock({ timer: 0, initialTime: params.waitTimer ?? 1000 });
    this._score = new BehaviorSubject<number>(params.score ?? 100);
    this.level = params.level ?? 0;
    this.lives = new BehaviorSubject<number>(params.lives ?? 3);
    this.won = !!params.won;
    this.gameOver = !!params.gameOver;
    this.gameOverClock = params.gameOverClock ?? new Clock({ initialTime: 3000 });
    this.clock = params.clock ?? new Clock();
    // obstacles: Obstacle[];
  }

  get score(): number {
    return this._score.getValue();
  }

  set score(next: number) {
    this._score.next(next);
  }
}
