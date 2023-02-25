import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Game } from 'src/app/models/game.model';
import { Move } from 'src/app/models/move.model';
import { Position } from 'src/app/models/position.model';
import { Sprite } from 'src/app/models/sprite.model';
import { environment } from 'src/environments/environment';
import { GameSpriteService } from '../game-sprite/game-sprite.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  frog(): Character {
    const charRadius = Game.ROW_HEIGHT / 2;
    const frogSprite: Sprite = new Sprite({ ...GameSpriteService.gameSprites.frog });
    const frogDyingSprite: Sprite = new Sprite({ ...GameSpriteService.gameSprites.die });
    const audio = new Audio();
    audio.src = `${environment.assetPrefix}move.mp3`;

    const frog = new Character({
      radius: charRadius,
      position: new Position({
        x: Game.SQR_SIZE / 2,
        y: (Game.ROWS - 0.5) * Game.ROW_HEIGHT,
        angle: Math.PI,
        max: { x: Game.SQR_SIZE, y: Game.SQR_SIZE },
      }),
      move: new Move({ distance: Game.ROW_HEIGHT }),
      sprite: frogSprite,
      dyingSprite: frogDyingSprite,
    });

    return frog;
  }
}
