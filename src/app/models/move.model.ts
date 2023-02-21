import { Clock } from './clock.model';
import { Coords } from './coords.model';
import { Direction } from './directions.model';

export interface MoveParams {
  distance: number;
  drift?: Coords;
  direction?: Direction;
  clock?: Clock;
}

export class Move {
  direction: Direction | null;
  distance: number;
  ppms: number; // Pixels per ms
  clock: Clock;
  drift: Coords;

  constructor(params: MoveParams) {
    this.direction = params.direction ?? null;
    this.clock = params.clock ?? new Clock({ timer: 250 });
    this.distance = params.distance;
    this.ppms = params.distance / this.clock.initialTime;
    this.drift = params.drift ?? { x: 0, y: 0 };
  }

  reset(): void {
    this.direction = null;
    this.clock.timer = 0;
    this.drift = { x: 0, y: 0 };
  }

  update(elapsedTime: number): void {
    this.clock.update(elapsedTime);
  }
}
