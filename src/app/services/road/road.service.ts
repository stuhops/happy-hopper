import { Injectable } from '@angular/core';
import { BoardRow, ObstacleTimer } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';
import { Move } from '../../models/move.model';
import { Clock } from 'src/app/models/clock.model';
import { Obstacle } from 'src/app/models/obstacle.model';
import { Game } from 'src/app/models/game.model';

@Injectable({
  providedIn: 'root',
})
export class RoadService extends BoardRowService {
  constructor() {
    super();
    this.defaultSprite = GameSpriteService.gameSprites.road;
    this.defaultSafe = true;
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
    const row = this.getDefaultRow(position);

    const obsMove: Move = new Move({ distance: level === 0 ? 10 : 150, direction: 'left' });
    const obsPos: Position = new Position({
      x: row.size.width,
      y: row.position.y,
    });

    const car: Obstacle = new Obstacle({
      position: obsPos,
      move: obsMove,
      spriteDangerArr: [{ sprite: GameSpriteService.gameSprites.carYellow, safe: false }],
      size: { width: 130, height: Game.ROW_HEIGHT * 0.9 },
    });

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: 10000 }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;

    return row;
  }
}
