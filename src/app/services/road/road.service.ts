import { Injectable } from '@angular/core';
import { BoardRow, ObstacleTimer } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';
import { Move } from '../../models/move.model';
import { Clock } from 'src/app/models/clock.model';
import { Obstacle, SpriteDanger } from 'src/app/models/obstacle.model';
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
    const initialTimesByLevel: number[] = [10000, 1200];
    const moveDistanceByLevel: number[] = [10, 15];

    const rowMove: Move = new Move({ distance: moveDistanceByLevel[level], direction: 'left' });

    const row = this.getDefaultRow(position, { move: rowMove });
    const sprite = GameSpriteService.gameSprites.carYellow;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimesByLevel[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;

    return row;
  }
}
