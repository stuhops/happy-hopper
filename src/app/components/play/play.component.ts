import { Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Game } from 'src/app/models/game.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { GameInitService } from 'src/app/services/game-init/game-init.service';
import { GameLoopService } from 'src/app/services/game-loop/game-loop.service';
import { GraphicService } from 'src/app/services/graphic/graphic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef;
  canvasContext!: CanvasContext;

  game!: Game;
  statusBar!: StatusBar;

  env = environment;
  Game = Game;

  constructor(private _gameInit: GameInitService, private _gameLoop: GameLoopService) {}

  ngAfterViewInit(): void {
    this.refreshCanvasContext();
    this.game = this._gameInit.game();
    this.statusBar = this._gameInit.statusBar(this.game);
    this._gameLoop.init(this.game, this.statusBar, this.canvasContext);
  }

  refreshCanvasContext(): void {
    const context = this.gameCanvas.nativeElement.getContext('2d');
    if (!context) throw Error('Must have 2d context in the play component');
    this.canvasContext = { canvas: this.gameCanvas.nativeElement, context };
    GraphicService.clearCanvas(this.canvasContext);
  }
}
