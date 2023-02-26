import { Injectable } from '@angular/core';
import { BoardRow } from 'src/app/models/board-row.model';
import { Move } from 'src/app/models/move.model';
import { Obstacle, SpriteDanger } from 'src/app/models/obstacle.model';
import { Position } from 'src/app/models/position.model';
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

  newLilyPadRow(position: Position): BoardRow {
    console.warn('Lily pad row not implemented');
    const row = this.getDefaultRow(position);

    const lilyBaseOffset: number = row.size.height * 1.5;
    const lilyDistBetween: number = row.size.height * 2.6;

    for (let i = 0; i < 5; i++) {
      const lilyPos: Position = new Position({
        x: position.x + lilyBaseOffset + lilyDistBetween * i,
        y: position.y,
      });
      const spriteDanger: SpriteDanger = {
        sprite: GameSpriteService.gameSprites.winGood,
        safe: true,
        win: true,
      };

      const lilyPad: Obstacle = new Obstacle({
        position: lilyPos,
        move: new Move({ distance: 0 }),
        spriteDangerArr: [spriteDanger],
        size: { width: row.size.height, height: row.size.height },
      });

      row.obstacles.push(lilyPad);
    }
    return row;
  }

  newBlankRow(position: Position): BoardRow {
    console.warn('Blank row not implemented');
    const row = this.getDefaultRow(position);
    return row;
  }
}
