import { GameSpriteService } from '../services/game-sprite.service';
import { GraphicService } from '../services/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Direction } from './directions.model';
import { Move } from './move.model';
import { ParticleSystem } from './particle-system.model';
import { Position } from './position.model';
import { Circle } from './shapes.model';
import { Sprite } from './sprite.model';

export interface CharacterParams {
  radius: number;
  position: Position;
  sprite: Sprite;
  dyingSprite: Sprite;
  move: Move;
  audio?: HTMLAudioElement;
  dead?: false | boolean;
  dying?: number;
  hasMoved?: boolean;
  shouldRender?: true | boolean;
}

export class Character {
  static MOVE_TIMER = 250;
  static DEATH_LENGTH = 2000;

  radius: number;
  position: Position; // Use center
  move: Move;
  sprite: Sprite;
  dyingSprite: Sprite;
  guts: ParticleSystem | null = null;
  audio?: HTMLAudioElement;
  hasMoved: boolean;
  shouldRender: boolean;

  dead: boolean = false;
  dyingTimer: Clock;

  initialPosition: Position;

  constructor(params: CharacterParams) {
    this.radius = params.radius;
    this.position = params.position;
    this.initialPosition = params.position.deepCopy();
    this.audio = params.audio;
    this.hasMoved = !!params.hasMoved;
    this.move = params.move;
    this.sprite = params.sprite;
    this.dyingSprite = params.dyingSprite;
    this.dead = !!params.dead;
    this.dyingTimer = new Clock({ timer: 0, initialTime: Character.DEATH_LENGTH });
    this.shouldRender = params.shouldRender ?? true;
  }

  /////////////// Getters and setters ////////////
  get isDying(): boolean {
    return this.dyingTimer.timer > 0;
  }

  get hitCircle(): Circle {
    return {
      center: {
        x: this.position.x,
        y: this.position.y,
      },
      radius: this.radius * 0.5,
    };
  }

  /////////////////  Public //////////////////////
  render(canvas: CanvasContext): void {
    if (!this.shouldRender) return;
    if (this.isDying) {
      this.dyingSprite.render(this.position, canvas, { asCenter: true });
      this.guts?.render(canvas);
    } else if (!this.dead) this.sprite.render(this.position, canvas, { asCenter: true });
    // this._drawHitCircle(canvas); // For debugging the hit circle
  }

  reset(): void {
    this.shouldRender = true;
    this.dead = false;
    this.hasMoved = false;
    this.dyingTimer.timer = 0;
    this.move.reset();
    this.position = this.initialPosition.deepCopy();
  }

  startDying(): void {
    this.dyingTimer.reset();
    this.guts = new ParticleSystem({
      sprite: GameSpriteService.gameSprites.guts,
      center: this.position,
      size: { mean: 20, stdDev: 5 },
      speed: { mean: 0, stdDev: 0.2 },
      lifetime: { mean: 1000, stdDev: 100 },
    });
  }

  setMove(dir: Direction | null): void {
    if (this.move.direction) return;
    if (dir === 'up' && this.position.setNextMoveCenter({ x: 0, y: -1 }, this.move.distance))
      this.position.angle = Math.PI;
    else if (dir === 'down' && this.position.setNextMoveCenter({ x: 0, y: 1 }, this.move.distance))
      this.position.angle = 0;
    else if (dir === 'right' && this.position.setNextMoveCenter({ x: 1, y: 0 }, this.move.distance))
      this.position.angle = 1.5 * Math.PI;
    else if (dir === 'left' && this.position.setNextMoveCenter({ x: -1, y: 0 }, this.move.distance))
      this.position.angle = 0.5 * Math.PI;
    else if (dir) return;

    this.move.direction = dir;
    this.move.clock.reset();
    this._startMoveAudio();
    this.hasMoved = true;
  }

  update(elapsedTime: number): void {
    if (this.isDying) this._updateDying(elapsedTime);
    else if (!this.dead) this._move(elapsedTime);
  }

  ////////////////// Private /////////////////////
  /**
   * @description for debugging purposes
   */
  private _drawHitCircle(canvas: CanvasContext): void {
    GraphicService.drawCircle(canvas, {
      circle: this.hitCircle,
      fillStyle: 'orange',
    });
  }

  private _move(elapsedTime: number): void {
    if (!this.position.nextCenter) throw Error('Character must have a next center pos');

    this.position.x += this.move.drift.x * elapsedTime;
    this.position.nextCenter.x += this.move.drift.x * elapsedTime;
    if (this.move.direction) {
      this.move.update(elapsedTime);
      this.sprite.curr =
        this.sprite.sprites -
        Math.floor(this.move.clock.timer / (this.move.clock.initialTime / this.sprite.sprites));
      if (this.move.clock.timer > 0) this.position.update(elapsedTime, this.move);
      else {
        this.sprite.reset();
        this.position.x = this.position.nextCenter.x;
        this.position.y = this.position.nextCenter.y;
        this.position.startCenter = this.position;
        this.position.setNextMoveCenter(this.position, 0);
        this.move.reset();
      }
    }
  }

  private _startMoveAudio(): void {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }

  private _updateDying(elapsedTime: number) {
    this.dyingTimer.update(elapsedTime);
    this.guts?.update(elapsedTime);
    this.position.offset({ x: 0, y: elapsedTime / 1000 });

    if (this.dyingTimer.timer > 0) return;

    this.dyingTimer.timer = 0;
    this.guts = null;
    this.dead = true;
  }
}
