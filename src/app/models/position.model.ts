import { Coords } from './coords.model';

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
