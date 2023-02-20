import { GraphicService } from '../services/graphic/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Position } from './position.model';
import { WHSize } from './wh-size.model';

export interface TimerDisplayParams {
  size: WHSize;
  position: Position;
  clock: Clock;
  // audio: any; // TODO
  initialTimer?: number;
}

export class TimerDisplay {
  size: WHSize;
  position: Position;
  clock: Clock;
  // audio: any; // TODO
  private _audioPlaying: boolean = false;

  constructor(params: TimerDisplayParams) {
    this.size = params.size;
    this.position = params.position;
    this.clock = params.clock;
    // this.audio = params.audio; // TODO
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
        width: this.size.width * (this.clock.timer / this.clock.initialTime),
        height: this.size.height,
      },
      strokeStyle: 'black',
      lineWidth: 6,
    });
  }

  reset(): void {
    this.clock.reset();
    this._audioPlaying = false;
    // this.audio.stop; // TODO
  }

  update(elapsedTime: number): void {
    // if (this.timer / this.initialTimer < .3 && !this._audioPlaying) this.audio.play; // TODO
  }
}
