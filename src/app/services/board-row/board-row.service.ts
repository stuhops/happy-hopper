import { Injectable } from '@angular/core';
import { BoardRow, BoardRowParams } from 'src/app/models/board-row.model';
import { Move } from 'src/app/models/move.model';
import { Position } from 'src/app/models/position.model';
import { Sprite } from 'src/app/models/sprite.model';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class BoardRowService {
  protected defaultSprite: Sprite = GameSpriteService.gameSprites.grass;
  protected defaultSafe: boolean = false;

  getDefaultRow(position: Position, options?: Partial<BoardRowParams>): BoardRow {
    return new BoardRow({
      position: position,
      move: options?.move ?? new Move({ distance: 0 }),
      background: options?.background ?? this.defaultSprite,
      defaultSafe: options?.defaultSafe ?? this.defaultSafe,

      size: options?.size,
      obstacles: options?.obstacles,
      obstaclesIdx: options?.obstaclesIdx,
      currObstacles: options?.currObstacles,
      min: options?.min,
      max: options?.max,
    });
  }
}
