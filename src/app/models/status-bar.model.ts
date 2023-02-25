import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GraphicService } from '../services/graphic/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Coords } from './coords.model';
import { Position } from './position.model';
import { SpriteSheet } from './sprite-sheet.model';
import { Sprite } from './sprite.model';
import { StatusBarSpriteElement } from './status-bar-sprite-element.model';
import { TimerDisplay } from './timer-display.model';
import { WHSize } from './wh-size.model';

export interface StatusBarParams {
  size: WHSize;
  gameLives: BehaviorSubject<number>;
  score: BehaviorSubject<number>;
  gameClock: Clock;
  position?: { x: 0; y: 0 } | Coords;
}

export class StatusBar {
  static LIVES_OFFSET: Coords = { x: 80, y: 0 };
  size: WHSize;
  position: Coords = { x: 0, y: 0 };
  gameLives: BehaviorSubject<number>;
  lives: StatusBarSpriteElement[] = [];
  _score: BehaviorSubject<number>;
  timerDisplay!: TimerDisplay;

  constructor(params: StatusBarParams) {
    this.size = params.size;
    this.position = params.position ?? { x: 0, y: 0 };
    this._score = params.score;
    this.gameLives = params.gameLives;
    this._initLives(params.gameLives.getValue());
    this._initTimerDisplay(params.gameClock);
  }

  render(canvas: CanvasContext): void {
    this.lives.forEach((life) => life.render(canvas));
    this._renderScore(canvas);
    this.timerDisplay.render(canvas);
  }

  update(elapsedTime: number): void {
    const outOfTime: boolean = this._updateGameClock(elapsedTime);
    if (outOfTime) {
      this.lives.pop();
      if (this.lives.length) this.timerDisplay.reset();
      // TODO: What if we are out of lives
    }
    if (this.gameLives.getValue() !== this.lives.length) this._initLives(this.gameLives.getValue());
    this._updateScore(elapsedTime);
  }

  get score(): number {
    return this._score.getValue();
  }

  set score(next: number) {
    this._score.next(next);
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
          src: `${environment.assetPrefix}game_sprites.png`,
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

  private _initTimerDisplay(gameClock: Clock): void {
    this.timerDisplay = new TimerDisplay({
      size: { width: this.size.width * 0.3 * 0.85, height: this.size.height / 2 }, // TODO: give a better explanation for these calcs
      position: new Position({
        x: this.size.width * 0.7,
        y: this.position.y + this.size.height / 4,
      }),
      clock: gameClock,
      // audio: null, // TODO
    });
  }

  private _renderScore(canvas: CanvasContext): void {
    GraphicService.drawText(canvas, {
      text: `Score: ${this.score}`,
      lineWidth: 1,
      font: '32px Arial',
      fillStyle: '#3bffff',
      position: { ...this.position },
    });
  }

  private _updateGameClock(elapsedTime: number): boolean {
    this.timerDisplay.update(elapsedTime);
    return !(this.timerDisplay.clock.timer > 0);
  }

  private _updateScore(elapsedTime: number): void {
    this.score = Math.max(this.score - elapsedTime, 0);
  }
}
