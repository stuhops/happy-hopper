import { Component, ViewChild } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameInitService } from 'src/app/services/game-init/game-init.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  @ViewChild('gameCanvas') gameCanvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  game!: Game;
  env = environment;
  inputBuffer: Record<string, string> = {};
  lastCycle: number = performance.now();
  requestFrame: boolean = true;
  Game = Game;

  constructor(public gameInitService: GameInitService) {}

  ngAfterViewInit(): void {
    this.watchForInput();
    this.gameInitService.init();
    this.refreshContext();
  }

  processInput(): void {
    for (const input in this.inputBuffer) {
      if (!this.game.character.dead && !this.game.character.isDying && this.game.waitTimer <= 0) {
        if (input === this.game.controls.up) this.game.character.setMove('up');
        else if (input === this.game.controls.down) this.game.character.setMove('down');
        else if (input === this.game.controls.right) this.game.character.setMove('right');
        else if (input === this.game.controls.left) this.game.character.setMove('left');
      }
    }
  }

  refreshContext(): void {
    const context = this.gameCanvas.getContext('2d');
    if (!context) throw Error('Must have 2d context in the play component');
    this.context = context;
  }

  watchForInput(): void {
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
