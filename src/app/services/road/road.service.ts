import { Injectable } from '@angular/core';
import { BoardRow, ObstacleTimer } from 'src/app/models/board-row.model';
import { Position } from 'src/app/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from '../game-sprite/game-sprite.service';
import { Move } from '../../models/move.model';
import { Clock } from 'src/app/models/clock.model';
import { SpriteDanger } from 'src/app/models/obstacle.model';

@Injectable({
  providedIn: 'root',
})
export class RoadService extends BoardRowService {
  constructor() {
    super();
    this.defaultSprite = GameSpriteService.gameSprites.road;
    this.defaultSafe = true;
  }

  newSemiRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [18000];
    const moveDistances: number[] = [15];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'left' });
    const row = this.getDefaultRow(position, { move: rowMove });

    const sprite = GameSpriteService.gameSprites.carSemi;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  newFireRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [17000];
    const moveDistances: number[] = [12];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'right' });
    const row = this.getDefaultRow(position, { move: rowMove });

    const sprite = GameSpriteService.gameSprites.carFire;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  newBlueRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [13000];
    const moveDistances: number[] = [8];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'left' });
    const row = this.getDefaultRow(position, { move: rowMove });

    const sprite = GameSpriteService.gameSprites.carBlue;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  newGreenRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [8000];
    const moveDistances: number[] = [11];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'right' });
    const row = this.getDefaultRow(position, { move: rowMove });

    const sprite = GameSpriteService.gameSprites.carGreen;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  newYellowRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [12000];
    const moveDistances: number[] = [10];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'left' });
    const row = this.getDefaultRow(position, { move: rowMove });

    const sprite = GameSpriteService.gameSprites.carYellow;
    const car: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: false }];

    const obsTimer: ObstacleTimer = {
      obstacles: [car],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }
}
