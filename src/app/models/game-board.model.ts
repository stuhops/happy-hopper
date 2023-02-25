import { BoardRow } from './board-row.model';
import { CanvasContext } from './canvas-context.model';
import { Collision } from './collision.model';
import { Circle } from './shapes.model';

export interface GameBoardParams {
  rows: BoardRow[];
}

export class GameBoard {
  rows: BoardRow[];
  constructor(params: GameBoardParams) {
    this.rows = params.rows;
  }

  allIdxDone(): boolean {
    console.warn('TODO: All idx done is not implemented');
    return false;
  }

  getCollision(hitCircle: Circle): Collision {
    console.warn('TODO: Get collision is not implemented');
    return { drift: { x: 0, y: 0 } };
  }

  setIdxDone(column: number): void {
    console.error('TODO: Set idx done is not implemented');
  }

  render(canvas: CanvasContext): void {
    this.rows.forEach((row) => row.render(canvas));
  }
  update(elapsedTime: number): void {
    this.rows.forEach((row) => row.update(elapsedTime));
  }
}
