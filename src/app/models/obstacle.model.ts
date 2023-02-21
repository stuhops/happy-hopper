import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Game } from './game.model';
import { HitBox } from './hit-box.model';
import { Move } from './move.model';
import { Position } from './position.model';
import { Sprite } from './sprite.model';
import { WHSize } from './wh-size.model';

export interface SpriteDanger {
  sprite: Sprite;
  safe: boolean;
  clock?: Clock;
}

export interface ObstacleParams {
  position: Position;
  move: Move;
  spriteDangerArr: SpriteDanger[];
  spriteIdx?: number;
  size?: WHSize;
}

export class Obstacle {
  position: Position;
  move: Move;
  spriteDangerArr: SpriteDanger[];
  spriteIdx: number;
  size: WHSize;

  constructor(params: ObstacleParams) {
    this.position = params.position;
    this.move = params.move;
    this.spriteDangerArr = params.spriteDangerArr;
    this.spriteIdx = params.spriteIdx ?? 0;
    this.size = params.size ?? { width: Game.ROW_HEIGHT, height: Game.ROW_HEIGHT };
  }

  get safe(): boolean {
    return !!this.spriteDangerArr[this.spriteIdx].safe;
  }

  get hitBox(): HitBox {
    return {
      x: this.position.x + 5,
      y: this.position.y + Game.ROW_HEIGHT / 4,
      width: this.size.width - 10,
      height: this.size.height - Game.ROW_HEIGHT / 2,
    };
  }

  render(canvas: CanvasContext): void {
    this.spriteDangerArr[this.spriteIdx].sprite.render(this.position, this.size.width / 2, canvas);
  }

  update(elapsedTime: number): void {
    this.move.update(elapsedTime);
    this.position.update(elapsedTime, this.move);
    this._updateSpriteDangerArr(elapsedTime);
  }

  private _updateSpriteDangerArr(elapsedTime: number): void {
    const spriteDanger: SpriteDanger = this.spriteDangerArr[this.spriteIdx];
    spriteDanger.clock?.update(elapsedTime);
    spriteDanger.sprite.update(elapsedTime);
    if (spriteDanger.clock?.timer === 0) {
      spriteDanger.clock?.reset();
      spriteDanger.sprite.reset();
      this.spriteIdx = (this.spriteIdx + 1) % this.spriteDangerArr?.length;
    }
  }
}
