import { BoardRow, ObstacleTimer } from 'src/app/models/board-row.model';
import { Clock } from 'src/models/clock.model';
import { Move } from 'src/models/move.model';
import { Obstacle, SpriteDanger } from 'src/models/obstacle.model';
import { Position } from 'src/models/position.model';
import { BoardRowService } from '../board-row/board-row.service';
import { GameSpriteService } from './game-sprite.service';

export class RiverService extends BoardRowService {
  static newLongSlowLogRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [10000];
    const moveDistances: number[] = [15];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'right' });
    rowMove.drift = { x: rowMove.ppms, y: 0 };
    const row = RiverService.getDefaultRow(position, {
      move: rowMove,
      background: GameSpriteService.gameSprites.river,
    });

    const sprite = GameSpriteService.gameSprites.logLg;
    const log: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: true }];

    const obsTimer: ObstacleTimer = {
      obstacles: [log],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  static newLongFastLogRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [8000];
    const moveDistances: number[] = [25];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'right' });
    rowMove.drift = { x: rowMove.ppms, y: 0 };
    const row = RiverService.getDefaultRow(position, {
      move: rowMove,
      background: GameSpriteService.gameSprites.river,
    });

    const sprite = GameSpriteService.gameSprites.logLg;
    const log: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: true }];

    const obsTimer: ObstacleTimer = {
      obstacles: [log],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  static newTurtle2Row(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [4000];
    const moveDistances: number[] = [25];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'left' });
    rowMove.drift = { x: -rowMove.ppms, y: 0 };
    const row = RiverService.getDefaultRow(position, {
      move: rowMove,
      background: GameSpriteService.gameSprites.river,
    });

    const sprite = GameSpriteService.gameSprites.turtle;
    const turtle: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: true }];

    const obsTimer: ObstacleTimer = {
      obstacles: [turtle, turtle],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  static newTurtle3Row(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [11000];
    const moveDistances: number[] = [10];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'left' });
    rowMove.drift = { x: -rowMove.ppms, y: 0 };
    const row = RiverService.getDefaultRow(position, {
      move: rowMove,
      background: GameSpriteService.gameSprites.river,
    });

    const swimmingSprite = GameSpriteService.gameSprites.turtle;
    const turtleSwimming: SpriteDanger = {
      sprite: swimmingSprite.deepCopy(),
      safe: true,
      clock: new Clock({ initialTime: swimmingSprite.duration }),
    };

    const sinkingSprite = GameSpriteService.gameSprites.turtleSink;
    const turtleSinking: SpriteDanger = {
      sprite: sinkingSprite.deepCopy(),
      safe: true,
      clock: new Clock({ timer: 0, initialTime: sinkingSprite.duration }),
    };

    const submergedSprite = GameSpriteService.gameSprites.turtleSink.deepCopy({
      curr: 3,
      clock: new Clock({ initialTime: 100000000000 }),
    });
    const submerged: SpriteDanger = {
      sprite: submergedSprite,
      safe: false,
      clock: new Clock({ timer: 0, initialTime: 300 }),
    };

    const emergingSprite = GameSpriteService.gameSprites.turtleEmerging;
    const turtleEmerging: SpriteDanger = {
      sprite: emergingSprite.deepCopy(),
      safe: true,
      clock: new Clock({ timer: 0, initialTime: emergingSprite.duration }),
    };

    const turtleDanger: SpriteDanger[] = [
      turtleSwimming,
      turtleSwimming,
      turtleSinking,
      submerged,
      turtleEmerging,
    ];
    const turtleTimer: ObstacleTimer = {
      obstacles: [
        Obstacle.deepCopySpriteDangerArr(turtleDanger),
        Obstacle.deepCopySpriteDangerArr(turtleDanger),
        Obstacle.deepCopySpriteDangerArr(turtleDanger),
      ],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [turtleTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }

  static newShortLogRow(position: Position, level: number, from?: BoardRow): BoardRow {
    if (level > 0) throw Error('level not accepted');
    const initialTimes: number[] = [8000];
    const moveDistances: number[] = [10];

    const rowMove: Move = new Move({ distance: moveDistances[level], direction: 'right' });
    rowMove.drift = { x: rowMove.ppms, y: 0 };
    const row = RiverService.getDefaultRow(position, {
      move: rowMove,
      background: GameSpriteService.gameSprites.river,
    });

    const sprite = GameSpriteService.gameSprites.logSm;
    const log: SpriteDanger[] = [{ sprite: sprite.deepCopy(), safe: true }];

    const obsTimer: ObstacleTimer = {
      obstacles: [log],
      wait: new Clock({ timer: 0, initialTime: initialTimes[level] }),
    };

    row.nextObstacles = [obsTimer];
    row.nextObstaclesIdx = 0;
    row.obstacles = from?.obstacles ?? [];

    return row;
  }
}
