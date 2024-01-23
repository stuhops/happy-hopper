import { Coords } from '../models/coords.model';
import { BasicStats } from '../models/stats.model';

export class RandomService {
  static nextDouble(): number {
    return Math.random();
  }

  static nextRange(min: number, max: number): number {
    const range = max - min;
    return Math.floor(Math.random() * range + min);
  }

  static nextCircleVector(): Coords {
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  static nextThrustVector(angle: number): Coords {
    const randomAngle = ((Math.random() * 1) / 3) * Math.PI;
    const nextAngle = randomAngle + angle - (1 / 6) * Math.PI;
    return {
      x: Math.cos(nextAngle),
      y: Math.sin(nextAngle),
    };
  }

  static nextGaussianPositive(stats: BasicStats): number {
    const next = RandomService.nextGaussian(stats);
    return Math.abs(next);
  }

  //
  // Generate a normally distributed random number.
  //
  static nextGaussian(stats: BasicStats): number {
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2: number | null = null;
    let z = 0;

    if (y2) {
      const next = stats.mean + y2 * stats.stdDev;
      y2 = null;
      return next;
    }

    do {
      x1 = 2 * Math.random() - 1;
      x2 = 2 * Math.random() - 1;
      z = x1 * x1 + x2 * x2;
    } while (z >= 1);

    z = Math.sqrt((-2 * Math.log(z)) / z);
    y1 = x1 * z;
    y2 = x2 * z;

    return stats.mean + y1 * stats.stdDev;
  }
}
