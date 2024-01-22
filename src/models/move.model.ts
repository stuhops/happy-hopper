import { Clock } from './clock.model';
import { Coords } from './coords.model';
import { Direction } from './directions.model';

export interface MoveParams {
  distance: number;
  drift?: Coords;
  direction?: Direction | null;
  clock?: Clock;
}

export class Move {
  direction: Direction | null;
  distance: number;
  ppms: number; // Pixels per ms
  clock: Clock;
  drift: Coords;
  private _initDrift: Coords;

  constructor(params: MoveParams) {
    this.direction = params.direction ?? null;
    this.clock = params.clock ?? new Clock({ timer: 250 });
    this.distance = params.distance;
    this.ppms = params.distance / this.clock.initialTime;
    this.drift = params.drift ?? { x: 0, y: 0 };
    this._initDrift = { ...this.drift };
  }

  deepCopy(): Move {
    return new Move({
      distance: this.distance,
      drift: { ...this.drift },
      direction: this.direction,
      clock: this.clock.deepCopy(),
    });
  }

  reset(): void {
    this.direction = null;
    this.clock.timer = 0;
    this.drift = { ...this._initDrift };
  }

  update(elapsedTime: number): void {
    this.clock.update(elapsedTime);
  }
}
