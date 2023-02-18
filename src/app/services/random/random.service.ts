import { Injectable } from '@angular/core';
import { Coords } from 'src/app/models/coords.model';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  nextDouble(): number {
    return Math.random();
  }

  nextRange(min: number, max: number): number {
    const range = max - min;
    return Math.floor(Math.random() * range + min);
  }

  nextCircleVector(): Coords {
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  nextThrustVector(angle: number): Coords {
    const randomAngle = ((Math.random() * 1) / 3) * Math.PI;
    const nextAngle = randomAngle + angle - (1 / 6) * Math.PI;
    return {
      x: Math.cos(nextAngle),
      y: Math.sin(nextAngle),
    };
  }

  nextGaussianPositive(mean: number, stdDev: number): number {
    const next = nextGaussian(mean, stdDev);
    return Math.abs(next);
  }

  //
  // Generate a normally distributed random number.
  //
  nextGaussian(mean: number, stdDev: number): number {
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2: number | null = null;
    let z = 0;

    if (y2) {
      const next = mean + y2 * stdDev;
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

    return mean + y1 * stdDev;
  }
}
