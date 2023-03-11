import { BoardRow } from './board-row.model';
import { CanvasContext } from './canvas-context.model';
import { Collision } from './collision.model';
import { Circle } from './shapes.model';
import { WinRow } from './win-row.model';

export interface GameBoardParams {
  rows: (BoardRow | WinRow)[];
  wonArr?: boolean[];
}

export class GameBoard {
  rows: (BoardRow | WinRow)[];
  wonArr: boolean[];

  constructor(params: GameBoardParams) {
    this.rows = params.rows;
    this.wonArr = params.wonArr ?? [false, false, false, false, false];
  }

  allIdxDone(): boolean {
    return this.wonArr.reduce((prev: boolean, curr: boolean) => prev && curr, true);
  }

  getCollision(hitCircle: Circle): Collision {
    for (const row of this.rows) {
      if (hitCircle.center <= row.max && hitCircle.center >= row.min) {
        const collision = row.getCollision(hitCircle);
        if (collision) return collision;
      }
    }
    // TODO: Add this in once we have the board setup
    console.warn('Fell through collision detection');
    return { drift: { x: 0, y: 0 }, isDefault: true };
  }

  setIdxDone(column: number): void {
    if (column < 0 || column >= this.wonArr.length) throw Error;
    this.wonArr[column] = true;
  }

  render(canvas: CanvasContext): void {
    this.rows.forEach((row: BoardRow) => row.render(canvas));
  }
  update(elapsedTime: number): void {
    this.rows.forEach((row: BoardRow) => row.update(elapsedTime));
  }
}
