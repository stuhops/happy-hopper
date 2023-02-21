import { BehaviorSubject } from 'rxjs';

export interface ClockParams {
  timer?: 100000 | number;
  initialTime?: 100000 | number;
}

export class Clock {
  initialTime: number;
  private _timer: BehaviorSubject<number>;

  constructor(params?: ClockParams) {
    this.initialTime = params?.initialTime ?? params?.timer ?? 100000;
    this._timer = new BehaviorSubject<number>(params?.timer ?? this.initialTime);
  }

  deepCopy(): Clock {
    return new Clock({
      timer: this.timer,
      initialTime: this.initialTime,
    });
  }

  reset(): void {
    this.timer = this.initialTime;
  }

  update(elapsedTime: number): void {
    const next = Math.max(this.timer - elapsedTime, 0);
    this.timer = next;
  }

  get timer(): number {
    return this._timer.getValue();
  }

  set timer(next: number) {
    this._timer.next(next);
  }
}
