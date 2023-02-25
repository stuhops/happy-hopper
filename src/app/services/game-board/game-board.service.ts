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

  generateBoard(level: number): GameBoard {
    return new GameBoard({
      rows: [
        ...this.generateWinRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 0 })), // 1-2
        ...this.generateRiverRows(new Position({ x: 0, y: Game.ROW_HEIGHT * 2 }), level), // 3-7
        this.generateLandRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 7 })), // 8
        ...this.generateRoadRows(new Position({ x: 0, y: Game.ROW_HEIGHT * 8 }), level), // 9-13
        this.generateLandRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 13 })), // 14
      ],
    });
  }

  generateLandRow(position: Position): BoardRow {
    const move: Move = new Move({ distance: 0 });
    const newRow: BoardRow = new BoardRow({
      position: position,
      move: move,
      background: GameSpriteService.gameSprites.grass,
      defaultSafe: true,
    });
    return newRow;
  }

  generateRiverRows(position: Position, level: number): BoardRow[] {
    const newRows: BoardRow[] = [];

    // Long slow row
    const longSlowPos = position.deepCopy();
    longSlowPos.offset({ x: 0, y: Game.ROW_HEIGHT * 0 });
    newRows.push(this._riverService.newLongLogRow(longSlowPos, level));

    // 2x turtle row
    const turtle2Pos = position.deepCopy();
    turtle2Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 1 });
    newRows.push(this._riverService.newTurtle2Row(turtle2Pos, level));

    // Long fast row
    const longFastPos = position.deepCopy();
    longFastPos.offset({ x: 0, y: Game.ROW_HEIGHT * 2 });
    newRows.push(this._riverService.newLongLogRow(longFastPos, level));

    // Short slow row
    const shortLogPos = position.deepCopy();
    shortLogPos.offset({ x: 0, y: Game.ROW_HEIGHT * 3 });
    newRows.push(this._riverService.newShortLogRow(shortLogPos, level));

    // 3x turtle row
    const turtle3Pos = position.deepCopy();
    turtle3Pos.offset({ x: 0, y: Game.ROW_HEIGHT * 4 });
    newRows.push(this._riverService.newTurtle3Row(turtle3Pos, level));

    return newRows;
  }

  generateRoadRows(position: Position, level: number): BoardRow[] {
    const newRows: BoardRow[] = [];

    // Semi row
    newRows.push(this._roadService.newSemiRow(position, level));

    // Fire truck row
    const firePos = position.deepCopy();
    firePos.offset({ x: 0, y: Game.ROW_HEIGHT * 1 });
    newRows.push(this._roadService.newFireRow(firePos, level));

    // Blue car row
    const bluePos = position.deepCopy();
    bluePos.offset({ x: 0, y: Game.ROW_HEIGHT * 2 });
    newRows.push(this._roadService.newBlueRow(bluePos, level));

    // Green car row
    const greenPos = position.deepCopy();
    greenPos.offset({ x: 0, y: Game.ROW_HEIGHT * 3 });
    newRows.push(this._roadService.newGreenRow(greenPos, level));

    // Yellow car row
    const yellowPos = position.deepCopy();
    yellowPos.offset({ x: 0, y: Game.ROW_HEIGHT * 4 });
    newRows.push(this._roadService.newYellowRow(yellowPos, level));

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
