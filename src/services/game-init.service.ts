import { RecordsService } from './records.service';
import { Game } from '../models/game.model';
import { HighScore } from '../models/high-score.model';
import { StatusBar } from '../models/status-bar.model';
import { CharacterService } from './character.service';
import { GameBoardService } from './game-board.service';

export class GameInitService {
  static game(): Game {
    const level = 0;
    return new Game({
      level: level,
      levels: 1,
      character: CharacterService.frog(),
      board: GameBoardService.generateBoard(level),
    });
  }

  static highScores(): HighScore[] {
    return RecordsService.highScores;
  }

  static statusBar(game: Game): StatusBar {
    return new StatusBar({
      size: { width: Game.SQR_SIZE, height: Game.ROW_HEIGHT },
      gameLives: game.lives,
      score: game._score,
      gameClock: game.clock,
      position: { x: 0, y: 0 },
    });
  }
}
