import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { GameBoard } from 'src/app/models/game-board.model';
import { Game } from 'src/app/models/game.model';
import { Move } from 'src/app/models/move.model';
import { Position } from 'src/app/models/position.model';
import { GameSpriteService } from '../game-sprite/game-sprite.service';
import { RiverService } from '../river/river.service';
import { RoadService } from '../road/road.service';
import { WinRowService } from '../win-row/win-row.service';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  constructor(
    private _riverService: RiverService,
    private _roadService: RoadService,
    private _winRowService: WinRowService,
  ) {}

  generateBoard(level: number, from?: GameBoard): GameBoard {
    return new GameBoard({
      rows: [
        ...this.generateRiverRows(
          new Position({ x: 0, y: Game.ROW_HEIGHT * 2 }),
          level,
          from?.rows.slice(3, 7),
        ), // 3-7
        // Render win row after the river so that the lilly pads show well
        // (Contains one extra to overlap textures well)
        ...this.generateWinRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 0 })), // 0-2
        this.generateLandRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 7 }), from?.rows[8]), // 8
        ...this.generateRoadRows(
          new Position({ x: 0, y: Game.ROW_HEIGHT * 8 }),
          level,
          from?.rows.slice(9, 13),
        ), // 9-13
        this.generateLandRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 13 }), from?.rows[14]), // 14
      ],
    });
  }

  generateLandRow(position: Position, from?: BoardRow): BoardRow {
    const move: Move = new Move({ distance: 0 });
    const newRow: BoardRow = new BoardRow({
      position: position,
      move: move,
      background: GameSpriteService.gameSprites.grass,
      defaultSafe: true,
      currObstacles: from?.obstacles,
    });
    return newRow;
  }

  generateRiverRows(position: Position, level: number, from?: BoardRow[]): BoardRow[] {
    const newRows: BoardRow[] = [];

    // Long slow row
    const longSlowPos = position.deepCopy();
    longSlowPos.offset({ x: 0, y: Game.ROW_HEIGHT * 0 });
    newRows.push(this._riverService.newLongSlowLogRow(longSlowPos, level, from?.[0]));

    // 2x turtle row
    const turtle2Pos = position.deepCopy();
    turtle2Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 1 });
    newRows.push(this._riverService.newTurtle2Row(turtle2Pos, level, from?.[1]));

    // Long fast row
    const longFastPos = position.deepCopy();
    longFastPos.offset({ x: 0, y: Game.ROW_HEIGHT * 2 });
    newRows.push(this._riverService.newLongFastLogRow(longFastPos, level, from?.[2]));

    // Short slow row
    const shortLogPos = position.deepCopy();
    shortLogPos.offset({ x: 0, y: Game.ROW_HEIGHT * 3 });
    newRows.push(this._riverService.newShortLogRow(shortLogPos, level, from?.[3]));

    // 3x turtle row
    const turtle3Pos = position.deepCopy();
    turtle3Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 4 });
    newRows.push(this._riverService.newTurtle3Row(turtle3Pos, level, from?.[4]));

    return newRows;
  }

  generateRoadRows(position: Position, level: number, from?: BoardRow[]): BoardRow[] {
    const newRows: BoardRow[] = [];

    // Semi row
    newRows.push(this._roadService.newSemiRow(position, level, from?.[0]));

    // Fire truck row
    const firePos = position.deepCopy();
    firePos.offset({ x: 0, y: Game.ROW_HEIGHT * 1 });
    newRows.push(this._roadService.newFireRow(firePos, level, from?.[1]));

    // Blue car row
    const bluePos = position.deepCopy();
    bluePos.offset({ x: 0, y: Game.ROW_HEIGHT * 2 });
    newRows.push(this._roadService.newBlueRow(bluePos, level, from?.[2]));

    // Green car row
    const greenPos = position.deepCopy();
    greenPos.offset({ x: 0, y: Game.ROW_HEIGHT * 3 });
    newRows.push(this._roadService.newGreenRow(greenPos, level, from?.[3]));

    // Yellow car row
    const yellowPos = position.deepCopy();
    yellowPos.offset({ x: 0, y: Game.ROW_HEIGHT * 4 });
    newRows.push(this._roadService.newYellowRow(yellowPos, level, from?.[4]));

    return newRows;
  }

  generateWinRow(position: Position): BoardRow[] {
    const newRows: BoardRow[] = [];

    // Blank row
    const blank1Pos = position.deepCopy();
    blank1Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 0 });
    newRows.push(this._winRowService.newBlankRow(blank1Pos));

    // Blank row
    const blank2Pos = position.deepCopy();
    blank2Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 0.5 });
    newRows.push(this._winRowService.newBlankRow(blank2Pos));

    // Lilly pad row
    const lillyPadPos = position.deepCopy();
    lillyPadPos.offset({ x: 0, y: Game.ROW_HEIGHT * 1 });
    newRows.push(this._winRowService.newLilyPadRow(lillyPadPos));

    return newRows;
  }
}
