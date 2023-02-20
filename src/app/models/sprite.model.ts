import { CanvasContext } from './canvas-context.model';
import { Coords } from './coords.model';
import { Position } from './position.model';
import { SpriteSheet } from './sprite-sheet.model';
import { WHSize } from './wh-size.model';

export interface SpriteParams {
  sheet: SpriteSheet;
  clipSize: WHSize;
  drawSize: WHSize;
  sprites: number;
  curr?: number;
  offset?: Coords;
}

export class Sprite {
  sheet: SpriteSheet;
  curr: number = 0;
  clipSize: WHSize;
  sprites: number;
  drawSize: WHSize;
  offset: Coords;

  constructor(params: SpriteParams) {
    this.sheet = params.sheet;
    this.curr = params.curr ?? 0;
    this.clipSize = params.clipSize;
    this.sprites = params.sprites;
    this.drawSize = params.drawSize;
    this.offset = params.offset ?? { x: 0, y: 0 };
  }

  next(): void {
    this.curr = (this.curr + 1) % this.sprites;
  }

  render(position: Position, characterRadius: number, canvas: CanvasContext): void {
    canvas.context.save();
    canvas.context.translate(position.x, position.y);
    canvas.context.rotate(position.angle);
    canvas.context.translate(-position.x, -position.y);
    canvas.context.drawImage(
      // Image
      this.sheet.sheet,
      // Start clipping x and y
      this.offset.x + this.curr * this.clipSize.width,
      this.offset.y,
      // Width and height to clip
      this.clipSize.width,
      this.clipSize.height,
      // Start x and y on canvas
      position.x - characterRadius,
      position.y - characterRadius,
      // Size x and y on canvas
      this.drawSize.width,
      this.drawSize.height,
    );
    canvas.context.restore();
  }
}
