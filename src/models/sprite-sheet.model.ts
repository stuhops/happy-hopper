import { WHSize } from './wh-size.model';

export interface SpriteSheetParams {
  src: string;
  size: WHSize;
}

export class SpriteSheet {
  sheet: HTMLImageElement;
  size: WHSize;

  constructor(params: SpriteSheetParams) {
    this.sheet = new Image();
    this.sheet.src = params.src;
    this.size = params.size;
  }

  deepCopy(): SpriteSheet {
    return new SpriteSheet({
      src: this.sheet.src,
      size: { ...this.size },
    });
  }
}
