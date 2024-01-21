import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { Clock } from './clock.model';
import { GameBoard } from './game-board.model';

export interface GameParams {
  // Required
  levels: number;
  board: GameBoard;
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
  playing?: boolean;
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
  playing: boolean;

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
    this.playing = !!params.playing;
  }

  startLevel(): void {
    this.character.reset();
    this.waitTimer.reset();
    this.lives.next(3);
    this.won = false;
    this.gameOver = false;
    this.clock.reset();
    this.board.startLevel();
    this.playing = true;
  }

  get score(): number {
    return this._score.getValue();
  }

  set score(next: number) {
    this._score.next(next);
  }
}
