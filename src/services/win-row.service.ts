import { BoardRow } from '../models/board-row.model';
import { Position } from '../models/position.model';
import { WinRow } from '../models/win-row.model';
import { BoardRowService } from './board-row.service';
import { GameSpriteService } from './game-sprite.service';

export class WinRowService extends BoardRowService {
  static newLilyPadRow(position: Position): WinRow {
    const row: WinRow = new WinRow({
      ...WinRowService.getDefaultRowParams(position, {
        background: GameSpriteService.gameSprites.winBad,
      }),
      completedSprite: GameSpriteService.gameSprites.frog,
      winSlots: [],
    });

    return row;
  }

  static newBlankRow(position: Position): BoardRow {
    const row = WinRowService.getDefaultRow(position, {
      background: GameSpriteService.gameSprites.winBad,
    });
    return row;
  }
}
