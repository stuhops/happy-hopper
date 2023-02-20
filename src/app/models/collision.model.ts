import { Coords } from './coords.model';

export enum CollisionType {
  'win' = 'win',
  'die' = 'die',
}

export interface Collision {
  type?: CollisionType;
  drift?: Coords;
  points?: number;
}
