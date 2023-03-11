import { BoardRow, BoardRowParams } from './board-row.model';
import { CanvasContext } from './canvas-context.model';
import { Collision, CollisionType } from './collision.model';
import { Coords } from './coords.model';
import { Obstacle } from './obstacle.model';
import { Circle } from './shapes.model';
import { Sprite } from './sprite.model';

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

  protected override deepCopyParams(
    options?: { offset?: Coords | undefined } | undefined,
  ): WinRowParams {
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
        collision = slotCollision;
        this.winSlots[idx].completedSprite = this.completedSprite.deepCopy();
        break;
      }
    }
    return collision ?? next;
  }

  override render(canvas: CanvasContext): void {
    super.renderBackground(canvas);
    this.winSlots.forEach((s) => s.target.deepCopy());
    this.obstacles.forEach((o) => o.render(canvas));
  }
}
