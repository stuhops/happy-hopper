import { Injectable } from '@angular/core';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Collision } from 'src/app/models/collision.model';
import { Game } from 'src/app/models/game.model';
import { Circle } from 'src/app/models/shapes.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { GraphicService } from '../graphic/graphic.service';
import { InputService } from '../input/input.service';

@Injectable({
  providedIn: 'root',
})
export class GameLoopService {
  lastCycle: number = performance.now();
  requestFrame: boolean = true;
  checkCollisions: boolean = true;
  game!: Game;
  statusBar!: StatusBar;
  canvas!: CanvasContext;

  constructor(private _inputService: InputService) {}

  init(game: Game, statusBar: StatusBar, canvas: CanvasContext): void {
    this.game = game;
    this.statusBar = statusBar;
    this.canvas = canvas;
  }

  render(): void {
    GraphicService.clearCanvas(this.canvas);
    this.statusBar.render(this.canvas);
    this.game.board.render(this.canvas);
    this.game.character.render(this.canvas);
  }

  startGameLoop(): void {
    this.game.gameOverClock.reset();
    this.game.clock.reset();
    this.lastCycle = performance.now();
    this.requestFrame = true;
    this._gameLoop(performance.now());
  }

  stopGameLoop(): void {
    this.requestFrame = false;
  }

  update(elapsedTime: number) {
    if (this.game.waitTimer.timer > 0) this.game.waitTimer.update(elapsedTime);
    this.game.board.update(elapsedTime);
    this.game.character.update(elapsedTime);

    if (!this.game.gameOver) {
      if (!this.game.character.dead && !this.game.character.isDying)
        this.game.clock.update(elapsedTime);

      if (this.checkCollisions) {
        // TODO: Look into when we change this
        this._checkCollisions();
        this.statusBar.update(elapsedTime);
        if (this.game.clock.timer <= 0) this._loseALife();
      } else if (this.game.character.dead) {
        if (this.game.lives.getValue()) this._newLife();
        else this._lost();
      }
    } else {
      this.game.gameOverClock.update(elapsedTime);

      if (this.game.gameOverClock.timer > 0) {
        if (!this.game.won) console.warn('TODO: Navigate to the game over (with lose condition)');
      } else {
        if (this.game.level === this.game.levels) {
          console.warn('TODO: Nav to game over (with win condition)');
          return;
        } else if (this.game.won) {
          this.game.level++;
          this.startGameLoop();
          return;
        }
      }
      return;
    }
  }

  private _checkCollisions(): void {
    this.game.character.move.drift = { x: 0, y: 0 };
    const hitCircle: Circle = this.game.character.hitCircle;
    const collision: Collision = this.game.board.getCollision(hitCircle);

    this.game.character.move.drift = collision.drift ?? { x: 0, y: 0 };
    if (collision.points) this.game.score = this.game.score + collision.points;

    if (collision.type === 'win') {
      if (!collision.column) throw Error('Must have a column assigned with a win condition');
      this._success(collision.column);
    } else if (collision.type === 'die') this._loseALife();
  }

  private _gameLoop(time: number) {
    const elapsedTime: number = time - this.lastCycle;
    this.lastCycle = time;

    if (this.game.waitTimer.timer <= 0) this._inputService.processInput(this.game.character);
    this.update(elapsedTime);
    this.render();

    if (this.requestFrame) requestAnimationFrame((time: number) => this._gameLoop(time));
  }

  private _loseALife(): void {
    this.game.lives.next(this.game.lives.getValue() - 1);
    this.game.character.startDying();
    this.checkCollisions = false;
  }

  private _lost(): void {
    this.game.won = false;
    this.game.gameOver = true;
    // TODO: High Scores
  }

  private _newLife(): void {
    this.game.character.reset(); // TODO: new character
    this.checkCollisions = true;
    this.game.clock.reset();
  }

  private _success(column: number): void {
    this.game.board.winRow.setIdxDone(column);
    this.game.waitTimer.reset();
    this._newLife();
    if (this.game.board.winRow.allIdxDone()) {
      this.game.score += 1000;
      this.game.won = true;
      this.game.gameOver = true;
    }
  }
}
