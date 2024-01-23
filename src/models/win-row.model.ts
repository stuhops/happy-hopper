import { BoardRow, BoardRowParams } from './board-row.model';
import { CanvasContext } from './canvas-context.model';
import { Collision, CollisionType } from './collision.model';
import { Coords } from './coords.model';
import { Obstacle, SpriteDanger } from './obstacle.model';
import { Position } from './position.model';
import { Circle } from './shapes.model';
import { Sprite } from './sprite.model';
import { GameSpriteService } from '../services/game-sprite.service';
import { Move } from './move.model';

export interface WinSlot {
  target: Obstacle;
  completedSprite: Sprite | null; // Null if not won
}

export interface WinRowParams extends BoardRowParams {
  completedSprite: Sprite;
  winSlots: WinSlot[];
}

export class WinRow extends BoardRow {
  completedSprite: Sprite;
  winSlots: WinSlot[];

  constructor(params: WinRowParams) {
    super(params);
    this.completedSprite = params.completedSprite;
    this.winSlots = params.winSlots;
  }

  override deepCopy(options?: { offset: Coords } | undefined): WinRow {
    return new WinRow(this.deepCopyParams(options));
  }

  override deepCopyParams(options?: { offset?: Coords | undefined } | undefined): WinRowParams {
    return {
      ...super.deepCopyParams(options),
      completedSprite: this.completedSprite.deepCopy(),
      winSlots: this.winSlots.map((s) => {
        return {
          target: s.target.deepCopy(),
          completedSprite: s.completedSprite?.deepCopy() ?? null,
        };
      }),
    };
  }

  override getCollision(hitCircle: Circle): Collision | null {
    const next = super.getCollision(hitCircle);
    if (next?.type === CollisionType.die && !next.isDefault) return next;

    let collision: Collision | null = null;
    for (let idx = 0; idx < this.winSlots.length; idx++) {
      const slotCollision = this.winSlots[idx].target.getCollision(hitCircle);
      if (slotCollision) {
        if (this.winSlots[idx].completedSprite)
          return { drift: this.move.drift, type: CollisionType.die, isDefault: false };
        collision = slotCollision;
        this.winSlots[idx].completedSprite = this.completedSprite.deepCopy();
        // TODO: Particle system if it just won
        break;
      }
    }
    return collision ?? next;
  }

  override render(canvas: CanvasContext): void {
    super.renderBackground(canvas);
    this.winSlots.forEach((s) => {
      s.target.render(canvas);
      s.completedSprite?.render(s.target.position, canvas);
    });
    this.obstacles.forEach((o) => o.render(canvas));
  }

  override startLevel(): void {
    const lilyBaseOffset: number = this.size.height * 1.5;
    const lilyDistBetween: number = this.size.height * 2.6;

    for (let i = 0; i < 5; i++) {
      const lilyPos: Position = new Position({
        x: this.position.x + lilyBaseOffset + lilyDistBetween * i,
        y: this.position.y,
      });
      const spriteDanger: SpriteDanger = {
        sprite: GameSpriteService.gameSprites.winGood,
        safe: true,
        win: true,
      };

      const lilyPad: WinSlot = {
        target: new Obstacle({
          position: lilyPos,
          move: new Move({ distance: 0 }),
          spriteDangerArr: [spriteDanger],
          size: { width: this.size.height, height: this.size.height },
        }),
        completedSprite: null,
      };
      this.winSlots.push(lilyPad);
    }
  }

  get completed(): boolean {
    return this.winSlots.reduce((prev, curr) => prev && !!curr.completedSprite, true);
  }
}
