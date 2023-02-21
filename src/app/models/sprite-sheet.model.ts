import { WHSize } from './wh-size.model';

export interface SpriteSheetParams {
  sheet: any;
  size: WHSize;
}

export class SpriteSheet {
  sheet: any; // TODO: Type this image
  size: WHSize;

  constructor(params: SpriteSheetParams) {
    this.sheet = params.sheet;
    this.size = params.size;
  }

  deepCopy(): SpriteSheet {
    return new SpriteSheet({
      sheet: this.sheet,
      size: { ...this.size },
    });
  }
}
