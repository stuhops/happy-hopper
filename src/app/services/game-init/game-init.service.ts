import { Injectable } from '@angular/core';
import { RecordsService } from '../records/records.service';
import { Game } from 'src/app/models/game.model';
import { HighScore } from 'src/app/models/high-score.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { CharacterService } from '../character/character.service';
import { GameBoardService } from '../game-board/game-board.service';

@Injectable({
  providedIn: 'root',
})
export class GameInitService {
  constructor(
    private _characterService: CharacterService,
    private _gameBoardService: GameBoardService,
  ) {}

  game(): Game {
    const level = 0;
    return new Game({
      level: level,
      levels: 1,
      character: this._characterService.frog(),
      board: this._gameBoardService.generateBoard(level),
    });
  }

  highScores(): HighScore[] {
    return RecordsService.highScores;
  }

  statusBar(game: Game): StatusBar {
    return new StatusBar({
      size: { width: Game.SQR_SIZE, height: Game.ROW_HEIGHT },
      gameLives: game.lives,
      score: game._score,
      gameClock: game.clock,
      position: { x: 0, y: 0 },
    });
  }
}
