import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { GameBoard } from 'src/app/models/game-board.model';
import { Game } from 'src/app/models/game.model';
import { Move } from 'src/app/models/move.model';
import { Position } from 'src/app/models/position.model';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  generateBoard(): GameBoard {
    return new GameBoard({
      rows: [this.generateLandRow(new Position({ x: 0, y: Game.ROW_HEIGHT * 14 }))],
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

  generateRiverRows(): BoardRow[] {
    const newRows: BoardRow[] = [];
    return newRows;
  }

  generateRoadRows(): BoardRow[] {
    const newRows: BoardRow[] = [];
    return newRows;
  }

  generateWinRow(): BoardRow[] {
    const newRows: BoardRow[] = [];
    return newRows;
  }
}
