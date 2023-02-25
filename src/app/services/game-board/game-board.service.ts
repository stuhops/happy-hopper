import { Injectable } from '@angular/core';
import { GameBoard } from 'src/app/models/game-board.model';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  generateBoard(): GameBoard {
    return new GameBoard({ rows: [] });
  }
}
