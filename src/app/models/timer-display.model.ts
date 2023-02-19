import { BehaviorSubject } from 'rxjs';
import { GraphicService } from '../services/graphic/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Position } from './position.model';
import { WHSize } from './wh-size.model';

export interface TimerDisplayParams {
  size: WHSize;
  position: Position;
  timer: BehaviorSubject<number>;
  // audio: any; // TODO
  initialTimer?: number;
}

export class TimerDisplay {
  size: WHSize;
  position: Position;
  timer: BehaviorSubject<number>;
  initialTimer: number;
  // audio: any; // TODO
  private _audioPlaying: boolean = false;

  constructor(params: TimerDisplayParams) {
    this.size = params.size;
    this.position = params.position;
    this.timer = params.timer;
    // this.audio = params.audio; // TODO
    this.initialTimer = params.initialTimer ?? params.timer.getValue();
    this.update(0); // To know whether to play the audio
  }

  render(canvas: CanvasContext): void {
    GraphicService.drawBox(canvas, {
      position: { ...this.position },
      size: this.size,
      lineWidth: 6,
      fillStyle: '#3bffff',
    });
    GraphicService.drawBox(canvas, {
      position: { ...this.position },
      size: {
        width: this.size.width * (this.timer.getValue() / this.initialTimer),
        height: this.size.height,
      },
      strokeStyle: 'black',
      lineWidth: 6,
    });
  }

  reset(): void {
    this.timer.next(this.initialTimer);
    this._audioPlaying = false;
    // this.audio.stop; // TODO
  }

  update(elapsedTime: number): void {
    this.timer.next(this.timer.getValue() - elapsedTime);
    if (this.timer.getValue() < 0) this.timer.next(0);
    // if (this.timer / this.initialTimer < .3 && !this._audioPlaying) this.audio.play; // TODO
  }
}
