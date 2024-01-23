import { GraphicService } from '../services/graphic.service';
import { CanvasContext } from './canvas-context.model';
import { Clock } from './clock.model';
import { Position } from './position.model';
import { WHSize } from './wh-size.model';

export interface TimerDisplayParams {
  size: WHSize;
  position: Position;
  clock: Clock;
  audio: HTMLAudioElement;
  initialTimer?: number;
}

export class TimerDisplay {
  size: WHSize;
  position: Position;
  clock: Clock;
  audio: HTMLAudioElement;
  private _audioPlaying: boolean = false;

  constructor(params: TimerDisplayParams) {
    this.size = params.size;
    this.position = params.position;
    this.clock = params.clock;
    this.audio = params.audio;
    this.update(0); // To know whether to play the audio
  }

  render(canvas: CanvasContext): void {
    GraphicService.drawBox(canvas, {
      position: { ...this.position },
      lineWidth: 6,
      fillStyle: '#3bffff',
      size: {
        width: this.size.width * (this.clock.timer / this.clock.initialTime),
        height: this.size.height,
      },
    });
    GraphicService.drawBox(canvas, {
      position: { ...this.position },
      strokeStyle: 'black',
      lineWidth: 6,
      size: this.size,
    });
  }

  reset(): void {
    this.clock.reset();
    this._audioPlaying = false;
    this.audio.pause;
    this.audio.currentTime = 0;
  }

  update(elapsedTime: number): void {
    this.clock.update(elapsedTime);
    if (this.clock.timer / this.clock.initialTime < 0.3 && !this._audioPlaying) this.audio.play; // TODO: Not playing
  }
}
