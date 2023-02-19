import { CanvasContext } from './canvas-context.model';
import { Position } from './position.model';
import { Sprite } from './sprite.model';
import { WHSize } from './wh-size.model';

export interface StatusBarSpriteElementParams {
  position: Position;
  size: WHSize;
  sprite: Sprite;
}

export class StatusBarSpriteElement {
  position: Position;
  size: WHSize;
  sprite: Sprite;

  constructor(params: StatusBarSpriteElementParams) {
    this.position = params.position;
    this.size = params.size;
    this.sprite = params.sprite;
  }

  render(context: CanvasContext): void {
    this.sprite.render(this.position, this.size.width / 2, context.context);
  }
}
