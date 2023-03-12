import { BoardRow } from './board-row.model';
import { CanvasContext } from './canvas-context.model';
import { Collision } from './collision.model';
import { Circle } from './shapes.model';
import { WinRow } from './win-row.model';

export interface GameBoardParams {
  rows: (BoardRow | WinRow)[];
}

export class GameBoard {
  rows: (BoardRow | WinRow)[];

  constructor(params: GameBoardParams) {
    this.rows = params.rows;
  }

  allIdxDone(): boolean {
    for (const row of this.rows) {
      if (row instanceof WinRow) {
        if (!row.completed) return false;
      }
    }
    return true;
  }

  getCollision(hitCircle: Circle): Collision {
    for (const row of this.rows) {
      if (hitCircle.center <= row.max && hitCircle.center >= row.min) {
        const collision = row.getCollision(hitCircle);
        if (collision) return collision;
      }
    }
    throw Error();
  }

  render(canvas: CanvasContext): void {
    this.rows.forEach((row: BoardRow) => row.render(canvas));
  }
  update(elapsedTime: number): void {
    this.rows.forEach((row: BoardRow) => row.update(elapsedTime));
  }
}
