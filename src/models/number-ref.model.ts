/**
 * Number Ref
 * @description A class that stores a number as a reference so that it can be passed around.
 * Created to remove rxjs behavior subject to reduce complexity so some of the methods are there
 * solely to mimic Behavior Subjects
 *
 */
export class NumberRef {
  num: number = 0;

  constructor(num: number) {
    this.num = num;
  }

  next(num: number): void {
    this.num = num;
  }

  getValue(): number {
    return this.num;
  }
}
