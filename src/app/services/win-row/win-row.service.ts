import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { WinRow } from 'src/app/models/win-row.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class WinRowService extends BoardRowService {
  constructor() {
    super();
    this.defaultSprite = GameSpriteService.gameSprites.winBad;
    this.defaultSafe = false;
  }

  newLilyPadRow(position: Position): WinRow {
    const row: WinRow = new WinRow({
      ...this.getDefaultRowParams(position),
      completedSprite: GameSpriteService.gameSprites.frog,
      winSlots: [],
    });

    return row;
  }

  newBlankRow(position: Position): BoardRow {
    console.warn('Blank row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }
}
