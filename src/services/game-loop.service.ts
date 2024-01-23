import { CanvasContext } from 'src/models/canvas-context.model';
import { Collision } from 'src/models/collision.model';
import { Game } from 'src/models/game.model';
import { Circle } from 'src/models/shapes.model';
import { StatusBar } from 'src/models/status-bar.model';
import { GraphicService } from './graphic.service';
import { InputService } from './input.service';
import { GameBoardService } from '../game-board/game-board.service';
import { GameInitService } from './game-init.service';

export class GameLoop {
  private _canvas!: CanvasContext;
  private _game!: Game;
  private _inputService: InputService = new InputService();
  private _lastCycle: number = performance.now();
  private _requestFrame: boolean = true;
  private _shouldCheckCollisions: boolean = true;
  private _statusBar!: StatusBar;

  constructor(
    canvas: CanvasContext,
    options?: {
      game?: Game; // Create's own by default
      statusBar?: StatusBar; // Create's own by default
      start?: boolean; // Defaults true
    },
  ) {
    this._game = options.game ?? GameInitService.game();
    this._statusBar = options.statusBar ?? GameInitService.statusBar(this._game);

    this._game.playing = true;
    this._shouldCheckCollisions = true;
    this._canvas = canvas;
    this._game.startLevel();
    if (options.start ?? true) this.startGameLoop();
  }

  startGameLoop(): void {
    this._game.gameOverClock.reset();
    this._game.clock.reset();
    this._lastCycle = performance.now();
    this._requestFrame = true;
    this._gameLoop(performance.now());
  }

  stopGameLoop(): void {
    console.warn('Game loop stopped');
    this._game.playing = false;
    this._requestFrame = false;
  }

  private _checkCollisions(): void {
    this._game.character.move.drift = { x: 0, y: 0 };
    const hitCircle: Circle = this._game.character.hitCircle;
    const collision: Collision = this._game.board.getCollision(hitCircle);

    this._game.character.move.drift = collision.drift ?? { x: 0, y: 0 };
    if (collision.points) this._game.score = this._game.score + collision.points;

    if (collision.type === 'win') this._success();
    else if (collision.type === 'die') this._loseALife();
  }

  private _gameLoop(time: number) {
    const elapsedTime: number = time - this._lastCycle;
    this._lastCycle = time;

    if (this._game.waitTimer.timer <= 0) this._inputService.processInput(this._game.character);
    this._update(elapsedTime);
    this._render();

    if (this._requestFrame) requestAnimationFrame((time: number) => this._gameLoop(time));
  }

  private _gameOverUpdate(elapsedTime: number): void {
    this._game.gameOverClock.update(elapsedTime);
    if (this._game.gameOverClock.timer <= 0) this._gameOverAction();
  }

  /**
   * @description To be called when the game is over and we want to reset or navigate
   */
  private _gameOverAction(): void {
    this._game.character.shouldRender = false;

    // TODO: Remove once we do overlay screens because this isn't very secure
    sessionStorage.setItem('score', JSON.stringify(this._game.score));
    sessionStorage.setItem('won', JSON.stringify(this._game.won));

    if (this._game.won) this._nextLevel();
    else this._lost();
  }

  private _inProgressUpdate(elapsedTime: number): void {
    if (!this._game.character.hasMoved) return;

    if (this._game.playing && !this._game.character.dead && !this._game.character.isDying) {
      this._game.clock.update(elapsedTime);
      if (this._game.clock.timer <= 0) this._game.character.startDying();
    }

    if (this._shouldCheckCollisions && this._game.playing) {
      this._shouldCheckCollisions();
      this._statusBar.update(elapsedTime);
    } else if (this._game.character.dead) {
      if (this._game.lives.getValue()) this._newLife();
      else {
        this._game.won = false;
        this._game.gameOver = true;
      }
    }
  }

  private _loseALife(): void {
    this._game.lives.next(this._game.lives.getValue() - 1);
    this._game.character.startDying();
    this._shouldCheckCollisions = false;
  }

  private _lost(): void {
    this._game.playing = false;
    this._game.level = 0;

    // TODO: Make a lost screen that overlays the game so it looks like it keeps going
    this.stopGameLoop();
    const event = new CustomEvent('game-over');
    document.dispatchEvent(event);
  }

  private _newLife(): void {
    this._game.character.reset();
    this._shouldCheckCollisions = true;
    this._game.clock.reset();
  }

  private _nextLevel(): void {
    this._game.level++;
    if (this._game.level === this._game.levels) this._won();
    else {
      this._game.board = GameBoardService.generateBoard(this._game.level, this._game.board);
      this._game.startLevel();
    }
  }

  private _render(): void {
    GraphicService.clearCanvas(this._canvas);
    this._game.board.render(this._canvas);
    this._statusBar.render(this._canvas);
    if (!this._game.gameOver || !this._game.won) this._game.character.render(this._canvas);
  }

  private _success(): void {
    this._game.waitTimer.reset();
    this._game.score += 200;
    if (this._game.board.allIdxDone()) {
      this._game.score += 1000 + 500 * this._game.lives.getValue();
      this._game.won = true;
      this._game.gameOver = true;
    } else {
      this._newLife();
    }
  }

  private _update(elapsedTime: number) {
    if (this._game.waitTimer.timer > 0) this._game.waitTimer.update(elapsedTime);
    this._game.board.update(elapsedTime);
    this._game.character.update(elapsedTime);

    if (!this._game.gameOver) this._inProgressUpdate(elapsedTime);
    else if (this._game.playing) this._gameOverUpdate(elapsedTime);
  }

  private _won(): void {
    this._game.playing = false;
    this._game.level = 0;

    // TODO: Make this overlay the game and not an actual navigation
    // TODO: High Scores
    this.stopGameLoop();
    const event = new CustomEvent('game-over');
    document.dispatchEvent(event);
  }
}
