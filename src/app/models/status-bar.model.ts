import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GraphicService } from '../services/graphic/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Coords } from './coords.model';
import { Position } from './position.model';
import { SpriteSheet } from './sprite-sheet.model';
import { Sprite } from './sprite.model';
import { StatusBarSpriteElement } from './status-bar-sprite-element.model';
import { TimerDisplay } from './timer-display.model';
import { WHSize } from './wh-size.model';

interface GameClockParams {
  clock: BehaviorSubject<number>;
  clockInit: number;
}

export interface StatusBarParams {
  size: WHSize;
  position?: { x: 0; y: 0 } | Coords;
  lives?: 3 | number;
  score: BehaviorSubject<number>;
  gameClock: GameClockParams;
}

export class StatusBar {
  static LIVES_OFFSET: Coords = { x: 80, y: 0 };
  size: WHSize;
  position: Coords = { x: 0, y: 0 };
  lives: StatusBarSpriteElement[] = [];
  score: BehaviorSubject<number>;
  gameClock!: TimerDisplay;

  constructor(params: StatusBarParams) {
    this.size = params.size;
    this.position = params.position ?? { x: 0, y: 0 };
    this.score = params.score;
    this._initLives(params.lives ?? 3);
    this._initGameClock(params.gameClock);
  }

  render(canvas: CanvasContext): void {
    this.lives.forEach((life) => life.render(canvas));
    this._renderScore(canvas);
    this.gameClock.render(canvas);
  }

  update(elapsedTime: number): void {
    const outOfTime: boolean = this._updateGameClock(elapsedTime);
    if (outOfTime) {
      this.lives.pop();
      if (this.lives.length) this.gameClock.reset();
      // TODO: What if we are out of lives
    }
    this._updateScore(elapsedTime);
  }

  private _initLives(amount: number): void {
    const lives: StatusBarSpriteElement[] = [];
    for (let i = 0; i < amount; i++) {
      const size: WHSize = { width: this.size.height, height: this.size.height };

      const position: Position = new Position({
        angle: 0,
        x: this.position.x + 80 + size.width * i,
        y: this.position.y,
      });

      const sprite: Sprite = new Sprite({
        sheet: new SpriteSheet({
          sheet: `${environment.assetPrefix}game_sprites.png`,
          size: { width: 600, height: 561 },
        }),
        clipSize: { width: 54, height: 70 },
        drawSize: size,
        sprites: 1,
      });

      const element: StatusBarSpriteElement = new StatusBarSpriteElement({
        position: position,
        size: size,
        sprite: sprite,
      });

      lives.push(element);
    }

    this.lives = lives;
  }

  private _initGameClock(params: GameClockParams): void {
    this.gameClock = new TimerDisplay({
      size: { width: this.size.width * 0.3 * 0.85, height: this.size.height / 2 }, // TODO: give a better explanation for these calcs
      position: new Position({
        x: this.size.width * 0.7,
        y: this.position.y + this.size.height / 4,
      }),
      timer: params.clock,
      initialTimer: params.clockInit,
      // audio: null, // TODO
    });
  }

  private _renderScore(canvas: CanvasContext): void {
    GraphicService.drawText(canvas, {
      text: `Score: ${this.score.getValue()}`,
      lineWidth: 1,
      font: '32px Arial',
      fillStyle: '#3bffff',
      position: { ...this.position },
    });
  }

  private _updateGameClock(elapsedTime: number): boolean {
    this.gameClock.update(elapsedTime);
    return !(this.gameClock.timer.getValue() > 0);
  }

  private _updateScore(elapsedTime: number): void {
    const next: number = Math.max(this.score.getValue() - elapsedTime, 0);
    this.score.next(next);
  }
}
