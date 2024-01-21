import { Injectable } from '@angular/core';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Collision } from 'src/app/models/collision.model';
import { Game } from 'src/app/models/game.model';
import { Circle } from 'src/app/models/shapes.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { GraphicService } from '../graphic/graphic.service';
import { InputService } from '../input/input.service';
import { Router } from '@angular/router';

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

  constructor(private _inputService: InputService, private _router: Router) {}

  init(game: Game, statusBar: StatusBar, canvas: CanvasContext, start: boolean = true): void {
    this.game = game;
    this.game.playing = true;
    this.checkCollisions = true;
    this.statusBar = statusBar;
    this.canvas = canvas;
    this.game.startLevel();
    if (start) this.startGameLoop();
  }

  render(): void {
    GraphicService.clearCanvas(this.canvas);
    this.game.board.render(this.canvas);
    this.statusBar.render(this.canvas);
    if (!this.game.gameOver || !this.game.won) this.game.character.render(this.canvas);
  }

  startGameLoop(): void {
    this.game.gameOverClock.reset();
    this.game.clock.reset();
    this.lastCycle = performance.now();
    this.requestFrame = true;
    this._gameLoop(performance.now());
  }

  stopGameLoop(): void {
    console.warn('Game loop stopped');
    this.game.playing = false;
    this.requestFrame = false;
  }

  update(elapsedTime: number) {
    if (this.game.waitTimer.timer > 0) this.game.waitTimer.update(elapsedTime);
    this.game.board.update(elapsedTime);
    this.game.character.update(elapsedTime);

    if (!this.game.gameOver) this._inProgressUpdate(elapsedTime);
    else if (this.game.playing) this._gameOverUpdate(elapsedTime);
  }

  private _checkCollisions(): void {
    this.game.character.move.drift = { x: 0, y: 0 };
    const hitCircle: Circle = this.game.character.hitCircle;
    const collision: Collision = this.game.board.getCollision(hitCircle);

    this.game.character.move.drift = collision.drift ?? { x: 0, y: 0 };
    if (collision.points) this.game.score = this.game.score + collision.points;

    if (collision.type === 'win') this._success();
    else if (collision.type === 'die') this._loseALife();
  }

  private _gameLoop(time: number) {
    const elapsedTime: number = time - this.lastCycle;
    this.lastCycle = time;

    if (this.game.waitTimer.timer <= 0) this._inputService.processInput(this.game.character);
    this.update(elapsedTime);
    this.render();

    if (this.requestFrame) requestAnimationFrame((time: number) => this._gameLoop(time));
  }

  private _gameOverUpdate(elapsedTime: number): void {
    this.game.gameOverClock.update(elapsedTime);
    if (this.game.gameOverClock.timer <= 0) this._gameOverAction();
  }

  /**
   * @description To be called when the game is over and we want to reset or navigate
   */
  private _gameOverAction(): void {
    this.game.character.shouldRender = false;

    // TODO: Remove once we do overlay screens because this isn't very secure
    sessionStorage.setItem('score', JSON.stringify(this.game.score));
    sessionStorage.setItem('won', JSON.stringify(this.game.won));

    if (this.game.won) this._nextLevel();
    else this._lost();
  }

  private _inProgressUpdate(elapsedTime: number): void {
    if (!this.game.character.hasMoved) return;

    if (this.game.playing && !this.game.character.dead && !this.game.character.isDying) {
      this.game.clock.update(elapsedTime);
      if (this.game.clock.timer <= 0) this.game.character.startDying();
    }

    if (this.checkCollisions && this.game.playing) {
      this._checkCollisions();
      this.statusBar.update(elapsedTime);
    } else if (this.game.character.dead) {
      if (this.game.lives.getValue()) this._newLife();
      else {
        this.game.won = false;
        this.game.gameOver = true;
      }
    }
  }

  private _loseALife(): void {
    this.game.lives.next(this.game.lives.getValue() - 1);
    this.game.character.startDying();
    this.checkCollisions = false;
  }

  private _lost(): void {
    this.game.playing = false;
    this.game.level = 0;

    // TODO: Make a lost screen that overlays the game so it looks like it keeps going
    this.stopGameLoop();
    this._router.navigate(['game-over']);
  }

  private _newLife(): void {
    this.game.character.reset();
    this.checkCollisions = true;
    this.game.clock.reset();
  }

  private _nextLevel(): void {
    this.game.level++;
    if (this.game.level === this.game.levels) this._won();
    else this.game.startLevel();
  }

  private _success(): void {
    this.game.waitTimer.reset();
    this.game.score += 200;
    if (this.game.board.allIdxDone()) {
      this.game.score += 1000 + 500 * this.game.lives.getValue();
      this.game.won = true;
      this.game.gameOver = true;
    } else {
      this._newLife();
    }
  }

  private _won(): void {
    this.game.playing = false;
    this.game.level = 0;

    // TODO: Make this overlay the game and not an actual navigation
    // TODO: High Scores
    this.stopGameLoop();
    this._router.navigate(['game-over']);
  }
}
