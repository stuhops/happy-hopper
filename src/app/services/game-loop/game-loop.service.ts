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
  game!: Game;
  statusBar!: StatusBar;

  constructor(private _inputService: InputService) {}

  init(game: Game, statusBar: StatusBar): void {
    this.game = game;
    this.statusBar = statusBar;
  }

  render(canvas: CanvasContext): void {
    GraphicService.clearCanvas(canvas);
    this.statusBar.render(canvas);
    this.game.board.render(canvas);
    this.game.character.render(canvas);
  }

  startGameLoop(canvas: CanvasContext): void {
    this.game.gameOverClock.reset();
    this.lastCycle = performance.now();
    this.requestFrame = true;
    this._gameLoop(performance.now(), canvas);
  }

  update(elapsedTime: number) {
    if (this.game.waitTimer > 0) this.game.waitTimer -= elapsedTime;
    if (!this.game.character.dead && !this.game.character.isDying)
      this.game.clock.update(elapsedTime);

    this.game.character.update(elapsedTime);
    this.game.board.update(elapsedTime);

    if (this.game.checkCollisions) {
      // TODO: Look into when we change this
      this._checkCollisions();
      this.statusBar.update(elapsedTime);
      if (this.game.clock.timer <= 0) this._loseALife(this.game.character.hitCircle);
    } else if (this.game.character.dead) {
      if (this.game.lives.getValue()) this._newLife();
      else this._lost();
    }
  }

  private _checkCollisions(): void {
    this.game.character.move.drift = { x: 0, y: 0 };
    const hitCircle: Circle = this.game.character.hitCircle;
    const collision: Collision = this.game.board.getCollision(hitCircle);

    this.game.character.move.drift = collision.drift ?? { x: 0, y: 0 };
    if (collision.points) this.game.score.next(this.game.score.getValue() + collision.points);

    if (collision.type === 'win') this._success(hitCircle);
    else if (collision.type === 'die') this._loseALife(hitCircle);
  }

  private _gameLoop(time: number, canvas: CanvasContext) {
    const elapsedTime: number = time - this.lastCycle;
    this.lastCycle = time;

    if (this.game.waitTimer <= 0) this._inputService.processInput(this.game.character);
    this.update(elapsedTime);
    this.render(canvas);

    if (!this.game.gameOver && this.requestFrame)
      requestAnimationFrame((time: number) => this._gameLoop(time, canvas));
    else if (this.requestFrame) requestAnimationFrame((time: number) => this._gameOver(time));
  }

  private _gameOver(time: number): void {
    throw Error;
  }

  private _loseALife(hitCircle: Circle): void {
    throw Error;
  }

  private _lost(): void {
    this.game.won = false;
    this.game.gameOver = true;
    throw Error;
  }

  private _newLife(): void {
    throw Error;
  }

  private _success(hitCircle: Circle): void {
    throw Error;
  }
}

//   function stopGameLoop() {
//     requestFrame = false;
//   }

//   // ---------------------------------------- Private -------------------------------------------
//   function startGameOver_() {
//     game.char.setDead();
//     game.gameOverTimer = 2000;
//     manageHighScores(game.score);
//     game.gameOver = true;
//   }

//   function gameOver_(time) {
//     let elapsedTime = time - lastCycle;
//     lastCycle = time

//     game.gameOverTimer -= elapsedTime;
//     updateItems_(elapsedTime);
//     renderItems_();

//     if(game.gameOverTimer < 0) {
//       if(game.level == game.levels) {
//         navigate('game-over');
//         return;
//       }
//       else if(game.won) {
//           game.level++;
//           navigate('game-play')
//           return;
//       }
//     }
//     else if(!game.won) {
//       navigate('game-over');
//       return;
//     }
//     else {
//       requestAnimationFrame(gameOver_);
//     }
//   }

//   function newLife_() {
//     game.char.setAlive();
//     game.char.setPos();
//     game.checkCollisions = true;
//     game.timer = game.baseTimer;
//   }

//   function loseALife_(hitCircle) {
//     game.lives--;
//     game.winRow.getCollisionType(hitCircle);
//     game.char.setDying();
//     game.checkCollisions = false;

//     // -------------- Create Guts ---------------
//     if(game.char.getCenter().y > parseInt(game.rows / 2 + 1) * (game.gameHeight / game.rows)) {
//       let newVis = ParticleSystemCircularGravity(game.graphics, {
//         image: game.assets.guts,
//         center: game.char.getCenter(),
//         size: {mean: 20, stdev: 5},
//         speed: { mean: 0, stdev: 0.2},
//         lifetime: { mean: 1000, stdev: 100}
//       });
//       game.guts.push({
//         vis: newVis,
//         pauseTimer: 300,
//         timer: 2000,
//       });
//     }
//   }

//   function success_(winIndex) {
//     game.winRow.setIdxDone(winIndex);
//     game.waitTimer = 1000;
//     newLife_();
//     if(game.winRow.allIdxDone()) {
//       game.score += 1000;
//       game.won = true;
//       startGameOver_();
//     }
//   }

//   return {
//     start: startGameLoop,
//     stop: stopGameLoop,
//   }
// }();
