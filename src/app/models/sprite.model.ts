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
  scale?: Coords;
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
  scale: Coords;

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
    this.scale = params.scale ?? { x: 1, y: 1 };

    this._originalSprite = this.curr;
  }

  deepCopy(overrides?: Partial<SpriteParams>): Sprite {
    return new Sprite({
      sheet: overrides?.sheet ?? this.sheet.deepCopy(),
      clipSize: overrides?.clipSize ?? { ...this.clipSize },
      drawSize: overrides?.drawSize ?? { ...this.drawSize },
      clock: overrides?.clock ?? this.clock?.deepCopy(),
      sprites: overrides?.sprites ?? this.sprites,
      curr: overrides?.curr ?? this.curr,
      offset: overrides?.offset ?? { ...this.offset },
      offsetRow2: overrides?.offsetRow2 ?? (this.offsetRow2 ? { ...this.offsetRow2 } : undefined),
      reverseUpdate: overrides?.reverseUpdate ?? this.reverseUpdate,
      scale: overrides?.scale ?? { ...this.scale },
    });
  }

  get duration(): number {
    return (this.clock?.initialTime ?? 0) * this.sprites;
  }

  next(): void {
    const next = this.curr + 1 * (this.reverseUpdate ? -1 : 1) + this.sprites;
    this.curr = next % this.sprites;
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

    const translation: Coords = {
      x: options?.asCenter ? position.x : position.x + size.width / 2,
      y: options?.asCenter ? position.y : position.y + size.height / 2,
    };

    canvas.context.save();
    canvas.context.translate(translation.x, translation.y);
    canvas.context.scale(this.scale.x, this.scale.y);
    if (position instanceof Position) canvas.context.rotate(position.angle);
    canvas.context.translate(-translation.x, -translation.y);
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
      if (this.clock.timer <= 0) {
        this.clock.reset();
        this.next();
      }
    }
  }
}
