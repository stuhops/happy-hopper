import { CanvasContext } from './canvas-context.model';
import { Coords } from './coords.model';
import { Sprite } from './sprite.model';
import { WHSize } from './wh-size.model';

export interface ParticleParams {
  sprite: Sprite;
  center: Coords;
  size: WHSize;
  speed: number;
  direction: Coords;
  lifetime: number;
  rotation?: 0 | number;
  age?: 0 | number;
  fill?: 'rgb(255, 255, 255)' | string;
  stroke?: 'rgb(0, 0, 0)' | string;
}

export class Particle {
  sprite: Sprite;
  center: Coords;
  size: WHSize;
  speed: number;
  direction: Coords;
  lifetime: number;
  rotation: number = 0;
  age: number = 0;
  fill: string = 'rgb(255, 255, 255)';
  stroke: string = 'rgb(0, 0, 0)';

  constructor(params: ParticleParams) {
    this.sprite = params.sprite;
    this.center = params.center;
    this.size = params.size;
    this.speed = params.speed;
    this.direction = params.direction;
    this.lifetime = params.lifetime;
    this.rotation = params.rotation ?? 0;
    this.age = params.age ?? 0;
    this.fill = params.fill ?? 'rgb(255, 255, 255)';
    this.stroke = params.stroke ?? 'rgb(0, 0, 0)';
  }

  render(canvas: CanvasContext): void {
    this.sprite.render(this.center, this.size.width, canvas, this.size);
  }

  update(elapsedTime: number): void {
    this.age += elapsedTime;
    this.center.x += this.speed * this.direction.x * elapsedTime;
    this.center.y += this.speed * this.direction.y * elapsedTime + this.age / 200;
    this.rotation += this.speed * 0.5;
  }

  get expired(): boolean {
    return this.age > this.lifetime;
  }
}
