import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class RoadService extends BoardRowService {
  constructor() {
    super();
    this.defaultSprite = GameSpriteService.gameSprites.road;
  }

  newSemiRow(position: Position, level: number): BoardRow {
    console.warn('Semi row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newFireRow(position: Position, level: number): BoardRow {
    console.warn('Fire row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newBlueRow(position: Position, level: number): BoardRow {
    console.warn('Blue row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newGreenRow(position: Position, level: number): BoardRow {
    console.warn('Green row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }

  newYellowRow(position: Position, level: number): BoardRow {
    console.warn('Yellow row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }
}
