import { RandomService } from '../services/random/random.service';
import { CanvasContext } from './canvas-context.model';
import { Coords } from './coords.model';
import { Particle } from './particle.model';
import { Sprite } from './sprite.model';
import { BasicStats } from './stats.model';

export interface ParticleSystemParams {
  sprite: Sprite;
  center: Coords;
  size: BasicStats;
  speed: BasicStats;
  lifetime: BasicStats;
  particles?: Particle[];
  creationCycles?: 5 | number;
}

export class ParticleSystem {
  sprite: Sprite;
  center: Coords;
  size: BasicStats;
  speed: BasicStats;
  lifetime: BasicStats;
  particles: Particle[];
  creationCycles: number = 5;

  constructor(params: ParticleSystemParams) {
    this.sprite = params.sprite;
    this.center = params.center;
    this.size = params.size;
    this.speed = params.speed;
    this.lifetime = params.lifetime;
    this.particles = params.particles ?? [];
    this.creationCycles = params.creationCycles ?? 5;
  }

  render(canvas: CanvasContext): void {
    for (const particle of this.particles) {
      particle.render(canvas);
    }
  }

  update(elapsedTime: number): void {
    const toKeep = [];
    for (const particle of this.particles) {
      particle.update(elapsedTime);
      if (!particle.expired) toKeep.push(particle);
    }
    this.particles = toKeep;

    if (this.creationCycles) {
      for (let count = 0; count < 15; count++) {
        const size: number = Math.abs(RandomService.nextGaussian(this.size));
        const next: Particle = new Particle({
          sprite: this.sprite,
          center: this.center,
          size: { width: size, height: size },
          rotation: 0,
          speed: RandomService.nextGaussian(this.speed),
          direction: RandomService.nextCircleVector(),
          lifetime: RandomService.nextGaussian(this.lifetime),
        });
        this.particles.unshift(next); // This way the newest particles are rendered underneath old
      }
      this.creationCycles--;
    }
  }
}
