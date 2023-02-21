import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Coords } from './coords.model';
import { Position } from './position.model';
import { SpriteSheet } from './sprite-sheet.model';
import { WHSize } from './wh-size.model';

export interface SpriteParams {
  sheet: SpriteSheet;
  clipSize: WHSize;
  drawSize: WHSize;
  clock?: Clock;
  sprites?: number;
  curr?: number;
  offset?: Coords;
  offsetRow2?: { x: number; y: number; breakPoint: number };
  reverseUpdate?: boolean;
}

export class Sprite {
  sheet: SpriteSheet;
  curr: number = 0;
  clipSize: WHSize;
  sprites: number = 1;
  drawSize: WHSize;
  offset: Coords;
  offsetRow2?: { x: number; y: number; breakPoint: number };
  reverseUpdate: boolean;
  clock?: Clock;

  private _originalSprite: number;

  constructor(params: SpriteParams) {
    this.reverseUpdate = !!params.reverseUpdate;
    this.sprites = params.sprites ?? 1;
    this.curr = params.curr ?? (this.reverseUpdate ? 0 : this.sprites - 1);
    this.sheet = params.sheet;
    this.clipSize = params.clipSize;
    this.drawSize = params.drawSize;
    this.offset = params.offset ?? { x: 0, y: 0 };
    this.offsetRow2 = params.offsetRow2;
    this.clock = params.clock;

    this._originalSprite = this.curr;
  }

  deepCopy(): Sprite {
    return new Sprite({
      sheet: this.sheet.deepCopy(),
      clipSize: { ...this.clipSize },
      drawSize: { ...this.drawSize },
      clock: this.clock?.deepCopy(),
      sprites: this.sprites,
      curr: this.curr,
      offset: { ...this.offset },
      offsetRow2: this.offsetRow2 ? { ...this.offsetRow2 } : undefined,
      reverseUpdate: this.reverseUpdate,
    });
  }

  next(): void {
    const next = this.curr + 1 * (this.reverseUpdate ? -1 : 1);
    if (next < 0) this.curr = next + this.sprites;
    else this.curr = next % this.sprites;
  }

  render(
    position: Position | Coords,
    canvas: CanvasContext,
    options?: {
      asCenter?: boolean;
      sizeOverride?: WHSize;
    },
  ): void {
    let _offset: Coords = this.offset;
    let offsetMultiplier: number = this.curr;
    if (this.offsetRow2 && this.offsetRow2.breakPoint <= this.curr) {
      _offset = this.offsetRow2;
      offsetMultiplier = this.curr - this.offsetRow2.breakPoint;
    }
    const size: WHSize = {
      width: options?.sizeOverride?.width ?? this.drawSize.width,
      height: options?.sizeOverride?.height ?? this.drawSize.height,
    };

    canvas.context.save();
    canvas.context.translate(position.x, position.y);
    if (position instanceof Position) canvas.context.rotate(position.angle);
    canvas.context.translate(-position.x, -position.y);
    canvas.context.drawImage(
      // Image
      this.sheet.sheet,
      // Start clipping x and y
      _offset.x + offsetMultiplier * this.clipSize.width,
      _offset.y,
      // Width and height to clip
      this.clipSize.width,
      this.clipSize.height,
      // Start x and y on canvas
      options?.asCenter ? position.x - size.width / 2 : position.x,
      options?.asCenter ? position.y - size.height / 2 : position.y,
      // Size x and y on canvas
      size.width,
      size.height,
    );
    canvas.context.restore();
  }

  reset(): void {
    this.clock?.reset();
    this.curr = this._originalSprite;
  }

  update(elapsedTime: number): void {
    if (this.clock) {
      this.clock?.update(elapsedTime);
      if (this.clock.timer === 0) {
        this.clock.reset();
        this.next();
      }
    }
  }
}
