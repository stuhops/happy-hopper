import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Game } from 'src/app/models/game.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { GameInitService } from 'happy-hopper/services/game-init/game-init.service';
import { GameLoopService } from 'happy-hopper/services/game-loop/game-loop.service';
import { GraphicService } from 'happy-hopper/services/graphic/graphic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef;
  gameLoopService = new GameLoopService();
  canvasContext!: CanvasContext;

  game!: Game;
  statusBar!: StatusBar;

  env = environment;
  Game = Game;

  constructor(private _router: Router) {}

  ngAfterViewInit(): void {
    this.refreshCanvasContext();
    this.game = GameInitService.game();
    this.statusBar = GameInitService.statusBar(this.game);
    this.gameLoopService.init(this.game, this.statusBar, this.canvasContext);

    document.addEventListener('game-over', () => {
      this._router.navigate(['game-over']);
    });
  }

  refreshCanvasContext(): void {
    const context = this.gameCanvas.nativeElement.getContext('2d');
    if (!context) throw Error('Must have 2d context in the play component');
    this.canvasContext = { canvas: this.gameCanvas.nativeElement, context };
    GraphicService.clearCanvas(this.canvasContext);
  }
}
