import { Coords } from './coords.model';
import { Move } from './move.model';

export interface PositionParams extends Coords {
  angle?: number; // In radians
  max?: Coords;
  min?: Coords;
  nextCenter?: Coords;
  startCenter?: Coords;
}

export class Position {
  x: number;
  y: number;
  angle: number; // In Radians
  min?: Coords;
  max?: Coords;
  nextCenter?: Coords;
  startCenter?: Coords;

  constructor(params: PositionParams) {
    this.x = params.x;
    this.y = params.y;
    this.angle = params.angle ?? 0;
    this.min = params.min ?? { x: 0, y: 0 };
    this.max = params.max;
    this.startCenter = { x: this.x, y: this.y };
    this.nextCenter = this.startCenter;
  }

  deepCopy(): Position {
    return new Position({
      x: this.x,
      y: this.y,
      angle: this.angle,
      min: this.min ? { ...this.min } : undefined,
      max: this.max ? { ...this.max } : undefined,
      nextCenter: this.nextCenter ? { ...this.nextCenter } : undefined,
      startCenter: this.startCenter ? { ...this.startCenter } : undefined,
    });
  }

  update(elapsedTime: number, move: Move): void {
    if (move.direction === 'up') this.offset({ x: 0, y: -(move.ppms * elapsedTime) });
    else if (move.direction === 'down') this.offset({ x: 0, y: move.ppms * elapsedTime });
    else if (move.direction === 'right') this.offset({ x: move.ppms * elapsedTime, y: 0 });
    else if (move.direction === 'left') this.offset({ x: -(move.ppms * elapsedTime), y: 0 });
  }

  offset(dif: Coords): void {
    this.x += dif.x;
    this.y += dif.y;
  }

  setNextMoveCenter(signs: Coords, distance: number): boolean {
    const next: Coords = {
      x: this.x + signs.x * distance,
      y: this.y + signs.y * distance,
    };

    if (this._inBounds(next)) {
      this.nextCenter = next;
      return true;
    } else return false;
  }

  private _inBounds(coords: Coords): boolean {
    const inMin: boolean = !!(!this.min || (coords.x >= this.min.x && coords.y >= this.min.y));
    const inMax: boolean = !!(!this.max || (coords.x <= this.max.x && coords.y <= this.max.y));
    return inMin && inMax;
  }
}
