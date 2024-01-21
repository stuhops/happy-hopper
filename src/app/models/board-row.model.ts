import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Collision, CollisionType } from './collision.model';
import { Coords } from './coords.model';
import { Game } from './game.model';
import { Move } from './move.model';
import { Obstacle, SpriteDanger } from './obstacle.model';
import { Position } from './position.model';
import { Circle } from './shapes.model';
import { Sprite } from './sprite.model';
import { WHSize } from './wh-size.model';

export interface ObstacleTimer {
  obstacles: SpriteDanger[][];
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
  currObstacles?: Obstacle[];
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
    this.obstacles = params.currObstacles ?? [];
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

  deepCopy(options?: { offset?: Coords }): BoardRow {
    return new BoardRow(this.deepCopyParams(options));
  }

  deepCopyParams(options?: { offset?: Coords }): BoardRowParams {
    const position = this.position.deepCopy();
    if (options?.offset) position.offset(options.offset);

    return {
      position: position,
      move: this.move.deepCopy(),
      background: this.background, // TODO: Does this need to be deep copied?
      size: { ...this.size },
      defaultSafe: this.defaultSafe,
      obstacles: this.nextObstacles.map((ot: ObstacleTimer) => {
        return {
          wait: ot.wait,
          obstacles: ot.obstacles.map((sdArr: SpriteDanger[]) =>
            Obstacle.deepCopySpriteDangerArr(sdArr),
          ),
        };
      }),
      currObstacles: this.obstacles?.map((o: Obstacle) => o.deepCopy()),
      min: { ...this.min },
      max: { ...this.max },
    };
  }

  getCollision(hitCircle: Circle): Collision | null {
    if (this.min.y > hitCircle.center.y || this.max.y < hitCircle.center.y) return null;

    const collisions: Collision[] = [];
    for (const obstacle of this.obstacles) {
      const collision: Collision | null = obstacle.getCollision(hitCircle);
      if (collision) collisions.push(collision);
    }
    let next: Collision | null = collisions.reduce((prev: Collision | null, curr: Collision) => {
      let nextCollisionType: CollisionType | undefined;
      if (prev?.type === CollisionType.die || curr.type === CollisionType.die)
        nextCollisionType = CollisionType.die;
      else if (prev?.type === CollisionType.win || curr.type === CollisionType.win)
        nextCollisionType = CollisionType.win;

      const nextColumn = Math.max(prev?.column ?? -1, curr.column ?? -1); // -1 is undefined

      const next: Collision = {
        isDefault: false,
        drift: {
          x:
            Math.abs(prev?.drift.x ?? 0) > Math.abs(curr.drift.x)
              ? prev?.drift.x ?? 0
              : curr.drift.x,
          y:
            Math.abs(prev?.drift.y ?? 0) > Math.abs(curr.drift.y)
              ? prev?.drift.y ?? 0
              : curr.drift.y,
        },
        type: nextCollisionType,
        points: (prev?.points ?? 0) + (curr.points ?? 0),
        column: nextColumn !== -1 ? nextColumn : undefined,
      };
      return next;
    }, null);

    // Default to ground
    if (!next) {
      next = {
        isDefault: true,
        drift: { ...this.move.drift },
        type: this.defaultSafe ? undefined : CollisionType.die,
      };
    }

    return next;
  }

  render(canvas: CanvasContext): void {
    this.renderBackground(canvas);
    this.obstacles.forEach((o) => o.render(canvas));
  }

  startLevel(): void {
    // Nothing to do here
  }

  update(elapsedTime: number): void {
    this._updateObstacles(elapsedTime);
    this._updateNextObstacles(elapsedTime);
  }

  private _addNextObstacles(): void {
    if (this.nextObstaclesIdx === null) return;
    const toAdd: SpriteDanger[][] = this.nextObstacles[this.nextObstaclesIdx].obstacles;
    for (let idx = 0; idx < toAdd.length; idx++) {
      const pos: Position = this.rowStart.deepCopy();
      const firstSprite: Sprite = toAdd[idx][0].sprite;
      const size: WHSize = { ...firstSprite.drawSize };
      if (pos.x === 0) pos.offset({ x: -size.width * (1 + idx), y: 0 });
      else pos.offset({ x: size.width * idx, y: 0 });

      const next: Obstacle = new Obstacle({
        position: pos,
        move: this.move.deepCopy(),
        spriteDangerArr: Obstacle.deepCopySpriteDangerArr(toAdd[idx]),
        size: size,
      });

      this.obstacles.unshift(next);
    }
  }

  protected renderBackground(canvas: CanvasContext): void {
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
