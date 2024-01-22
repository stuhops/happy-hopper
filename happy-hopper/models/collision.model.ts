import { Coords } from './coords.model';

export enum CollisionType {
  'win' = 'win',
  'die' = 'die',
}

export interface Collision {
  drift: Coords; // Where the ground is moving
  isDefault: boolean;
  type?: CollisionType;
  points?: number; // When you get points from touching something
  column?: number; // For use with win condition
}
