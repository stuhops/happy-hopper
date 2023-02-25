import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class RiverService extends BoardRowService {
  constructor() {
    super();
    this.defaultSprite = GameSpriteService.gameSprites.river;
  }

  newLongLogRow(position: Position, level: number): BoardRow {
    console.warn('Long log row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newTurtle2Row(position: Position, level: number): BoardRow {
    console.warn('Turtle 2 row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newTurtle3Row(position: Position, level: number): BoardRow {
    console.warn('Turtle 3 row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newShortLogRow(position: Position, level: number): BoardRow {
    console.warn('Short log row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }
}
