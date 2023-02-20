import { Coords } from './coords.model';

export interface Line {
  point1: Coords;
  point2: Coords;
}

export interface Circle {
  center: Coords;
  radius: number;
}
