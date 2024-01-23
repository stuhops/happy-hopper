import { environment } from '../environments/environment';

export interface ControlsParams {
  up?: 'ArrowUp' | string;
  down?: 'ArrowDown' | string;
  left?: 'ArrowLeft' | string;
  right?: 'ArrowRight' | string;
}

export class Controls {
  up: 'ArrowUp' | string = 'ArrowUp';
  down: 'ArrowDown' | string = 'ArrowDown';
  left: 'ArrowLeft' | string = 'ArrowLeft';
  right: 'ArrowRight' | string = 'ArrowRight';

  constructor(params?: ControlsParams) {
    this.up = params?.up ?? this.up;
    this.down = params?.down ?? this.down;
    this.left = params?.left ?? this.left;
    this.right = params?.right ?? this.right;
  }

  static FromLocalStorage(): Controls {
    const localControlsJSON: string | null = localStorage.getItem(environment.controlsKey);
    const params = localControlsJSON ? JSON.parse(localControlsJSON) : {};
    return new Controls(params);
  }

  toLocalStorage(): void {
    const data: ControlsParams = { ...this };
    const json: string = JSON.stringify(data);
    localStorage.setItem(environment.controlsKey, json);
  }
}
