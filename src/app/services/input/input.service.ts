import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Controls } from 'src/app/models/controls.model';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  inputBuffer: Record<string, string> = {};
  controls: Controls = Controls.FromLocalStorage();

  constructor() {
    this._watchForInput();
  }

  processInput(character: Character): void {
    if (character.dead || character.isDying) return;

    for (const input in this.inputBuffer) {
      if (input === this.controls.up) character.setMove('up');
      else if (input === this.controls.down) character.setMove('down');
      else if (input === this.controls.right) character.setMove('right');
      else if (input === this.controls.left) character.setMove('left');
    }
  }

  private _watchForInput(): void {
    window.addEventListener(
      'keydown',
      (event: { key: string }) => (this.inputBuffer[event.key] = event.key),
    );
    window.addEventListener(
      'keyup',
      (event: { key: string }) => delete this.inputBuffer[event.key],
    );
  }
}
