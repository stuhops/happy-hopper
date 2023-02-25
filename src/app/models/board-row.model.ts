import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Collision, CollisionType } from './collision.model';
import { Coords } from './coords.model';
import { Game } from './game.model';
import { Move } from './move.model';
import { Obstacle } from './obstacle.model';
import { Position } from './position.model';
import { Circle } from './shapes.model';
import { Sprite } from './sprite.model';
import { WHSize } from './wh-size.model';

export interface ObstacleTimer {
  obstacles: Obstacle[];
  wait: Clock;
}

export interface BoardRowParams {
  position: Position;
  move: Move;
  background: Sprite | Sprite[];
  size?: WHSize; // Default game row height and width
  defaultSafe?: boolean; // Default false
  obstacles?: ObstacleTimer[];
  obstaclesIdx?: number;
  min?: Coords;
  max?: Coords;
}

export class BoardRow {
  position: Position;
  move: Move;
  background: Sprite | Sprite[];
  size: WHSize;
  defaultSafe: boolean;
  obstacles: Obstacle[] = [];
  nextObstacles: ObstacleTimer[];
  nextObstaclesIdx: number | null;
  min: Coords;
  max: Coords;

  constructor(params: BoardRowParams) {
    this.position = params.position;
    this.move = params.move;
    this.background = params.background;
    this.size = params.size ?? { width: Game.SQR_SIZE, height: Game.ROW_HEIGHT };
    this.defaultSafe = !!params.defaultSafe;
    this.nextObstacles = params.obstacles ?? [];
    this.nextObstaclesIdx = params.obstaclesIdx ?? this.nextObstacles.length ? 0 : null;
    this.min = params.min ?? { x: -Game.SQR_SIZE, y: this.position.y };
    this.max = params.max ?? { x: 2 * Game.SQR_SIZE, y: this.position.y + this.size.height };
  }

  get rowStart(): Position {
    if (this.move.direction === 'left')
      return new Position({
        x: this.position.x + this.size.width,
        y: this.position.y,
      });
    else return this.position.deepCopy();
  }

  getCollision(hitCircle: Circle): Collision | null {
    const collisions: Collision[] = [];
    for (const obstacle of this.obstacles) {
      const collision: Collision | null = obstacle.getCollision(hitCircle);
      if (collision) collisions.push(collision);
    }
    const next: Collision = collisions.reduce(
      (prev: Collision, curr: Collision) => {
        let nextCollisionType: CollisionType | undefined;
        if (prev.type === CollisionType.die || curr.type === CollisionType.die)
          nextCollisionType = CollisionType.die;
        else if (prev.type === CollisionType.win || curr.type === CollisionType.win)
          nextCollisionType = CollisionType.win;

        const nextColumn = Math.max(prev.column ?? -1, curr.column ?? -1); // -1 is undefined

        const next: Collision = {
          drift: {
            x: Math.max(prev.drift.x, curr.drift.x),
            y: Math.max(prev.drift.y, curr.drift.y),
          },
          type: nextCollisionType,
          points: (prev.points ?? 0) + (curr.points ?? 0),
          column: nextColumn !== -1 ? nextColumn : undefined,
        };
        return next;
      },
      { drift: { x: 0, y: 0 } },
    );
    return next;
  }

  render(canvas: CanvasContext): void {
    this._renderBackground(canvas);
    this.obstacles.forEach((o) => o.render(canvas));
  }

  update(elapsedTime: number): void {
    this._updateObstacles(elapsedTime);
    this._updateNextObstacles(elapsedTime);
    // gen new obstacles
    throw Error;
  }

  private _addNextObstacles(): void {
    if (this.nextObstaclesIdx === null) return;
    const obsToAdd: Obstacle[] = this.nextObstacles[this.nextObstaclesIdx].obstacles;
    for (let idx = 0; idx < obsToAdd.length; idx++) {
      const start: Position = this.rowStart;
      if (start.x === 0) start.offset({ x: -obsToAdd[idx].size.width * (1 + idx), y: 0 });
      else start.offset({ x: obsToAdd[idx].size.width * idx, y: 0 });

      const next: Obstacle = obsToAdd[idx].deepCopy({
        position: start,
        move: this.move.deepCopy(),
      });

      this.obstacles.unshift(next);
    }
  }

  private _renderBackground(canvas: CanvasContext): void {
    const blockSize: WHSize = { width: this.size.height, height: this.size.height };
    for (let idx = 0; idx < this.size.width / this.size.height; idx++) {
      const coords: Coords = {
        x: this.position.x + blockSize.width * idx,
        y: this.position.y,
      };
      if (this.background instanceof Array) {
        if (idx < this.background.length) this.background[idx].render(coords, canvas);
        else this.background[this.background.length - 1].render(coords, canvas);
      } else this.background.render(coords, canvas);
    }
  }

  private _updateNextObstacles(elapsedTime: number): void {
    if (this.nextObstaclesIdx === null) return;
    const obstacleTimer: ObstacleTimer = this.nextObstacles[this.nextObstaclesIdx];
    obstacleTimer.wait.update(elapsedTime);
    const extraTime: number = obstacleTimer.wait.timer;
    if (extraTime <= 0) {
      this._addNextObstacles();
      obstacleTimer.wait.reset();
      this.nextObstaclesIdx = (this.nextObstaclesIdx + 1) % this.nextObstacles.length;
      this._updateNextObstacles(extraTime);
    }
  }

  private _updateObstacles(elapsedTime: number): void {
    const toKeep: Obstacle[] = [];
    this.obstacles.forEach((obs) => {
      obs.update(elapsedTime);
      if (obs.position.x > this.min.x && obs.position.x < this.max.x) toKeep.push(obs);
    });
    this.obstacles = toKeep;
  }
}
