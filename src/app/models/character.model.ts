import { GameSpriteService } from '../services/game-sprite/game-sprite.service';
import { CanvasContext } from './canvas-context.model';
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
}

export class Character {
  static MOVE_TIMER = 250;
  static DEATH_LENGTH = 2000;

  radius: number;
  position: Position;
  move: Move;
  sprite: Sprite;
  dyingSprite: Sprite;
  guts: ParticleSystem | null = null;
  audio?: HTMLAudioElement;

  dead: boolean = false;
  dyingTimer: number | null;

  initialPosition: Position;

  constructor(params: CharacterParams) {
    this.radius = params.radius;
    this.position = params.position;
    this.initialPosition = new Position({ ...this.position });
    this.audio = params.audio;
    this.move = params.move;
    this.sprite = params.sprite;
    this.dyingSprite = params.dyingSprite;
    this.dead = !!params.dead;
    this.dyingTimer = params.dying ?? null;
  }

  /////////////// Getters and setters ////////////
  get isDying(): boolean {
    return !!(this.dyingTimer && this.dyingTimer > 0);
  }

  get hitCircle(): Circle {
    return {
      center: {
        x: this.position.x,
        y: this.position.y,
      },
      radius: this.radius * 0.75,
    };
  }

  /////////////////  Public //////////////////////
  render(canvas: CanvasContext): void {
    if (this.isDying) {
      this.dyingSprite.render(this.position, this.radius, canvas);
      this.guts?.render(canvas);
    } else if (!this.dead) this.sprite.render(this.position, this.radius, canvas);
  }

  reset(): void {
    this.dead = false;
    this.dyingTimer = null;
    this.move.reset();
    this.position = new Position({ ...this.initialPosition });
  }

  startDying(timer?: number): void {
    this.dyingTimer = timer ?? Character.DEATH_LENGTH;
    this.guts = new ParticleSystem({
      sprite: GameSpriteService.gameSprites.guts,
      center: this.position,
      size: { mean: 20, stdDev: 5 },
      speed: { mean: 0, stdDev: 0.2 },
      lifetime: { mean: 1000, stdDev: 100 },
    });
  }

  setMove(dir: Direction | null): void {
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
    this._startMoveAudio();
  }

  update(elapsedTime: number): void {
    if (this.isDying) this._updateDying(elapsedTime);
    else if (!this.dead) this._move(elapsedTime);
  }

  ////////////////// Private /////////////////////
  private _move(elapsedTime: number): void {
    if (!this.position.nextCenter) throw Error('Character must have a next center pos');

    this.position.x += this.move.drift.x * elapsedTime;
    if (this.move.direction) {
      this.move.timer -= elapsedTime;
      this.sprite.curr =
        this.sprite.sprites -
        Math.floor(this.move.timer / (this.move.baseTimer / this.sprite.sprites));
      if (this.move.timer > 0) {
        if (this.move.direction === 'up')
          this.position.offset({ x: 0, y: -(this.move.ppms * elapsedTime) });
        else if (this.move.direction === 'down')
          this.position.offset({ x: 0, y: this.move.ppms * elapsedTime });
        else if (this.move.direction === 'right')
          this.position.offset({ x: this.move.ppms * elapsedTime, y: 0 });
        else if (this.move.direction === 'left')
          this.position.offset({ x: -(this.move.ppms * elapsedTime), y: 0 });
      } else {
        this.sprite.curr = 0;
        this.move.timer = 0;
        this.move.direction = null;
        this.position.nextCenter.x = this.position.x;
        this.position.y = this.position.nextCenter.y;
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
    if (!this.dyingTimer) return;

    this.dyingTimer -= elapsedTime;
    this.guts?.update(elapsedTime);
    this.position.offset({ x: 0, y: elapsedTime / 100 });

    if (this.dyingTimer > 0) return;

    this.dyingTimer = null;
    this.guts = null;
    this.dead = true;
  }
}
