import { Coords } from './coords.model';
import { Direction } from './directions.model';

export interface MoveParams {
  distance: number;
  drift?: Coords;
  direction?: Direction;
  timer?: number;
}

export class Move {
  direction: Direction | null;
  baseTimer: number;
  distance: number;
  ppms: number; // Pixels per ms
  timer: number;
  drift: Coords;

  constructor(params: MoveParams) {
    this.direction = params.direction ?? null;
    this.timer = params.timer ?? 0;
    this.baseTimer = this.timer;
    this.distance = params.distance;
    this.ppms = params.distance / this.timer;
    this.drift = params.drift ?? { x: 0, y: 0 };
  }

  reset(): void {
    this.direction = null;
    this.timer = this.baseTimer;
    this.drift = { x: 0, y: 0 };
  }
}
