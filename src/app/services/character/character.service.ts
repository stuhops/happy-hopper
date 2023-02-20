import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Game } from 'src/app/models/game.model';
import { Move } from 'src/app/models/move.model';
import { Position } from 'src/app/models/position.model';
import { SpriteSheet } from 'src/app/models/sprite-sheet.model';
import { Sprite } from 'src/app/models/sprite.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  defaultFrog(): Character {
    const charRadius = Game.SQR_SIZE / Game.ROWS / 2;

    const gameSpritesSheet = new SpriteSheet({
      sheet: `${environment.assetPrefix}game_sprites.png`,
      size: {
        width: 600,
        height: 561,
      },
    });

    const frogSprite: Sprite = new Sprite({
      sheet: gameSpritesSheet,
      clipSize: {
        width: 54,
        height: gameSpritesSheet.size.height / 8,
      },
      drawSize: {
        width: 2 * charRadius,
        height: 2 * charRadius,
      },
      sprites: 6,
    });

    const frogDyingSprite: Sprite = new Sprite({
      sheet: gameSpritesSheet,
      clipSize: {
        width: 70,
        height: 50,
      },
      offset: {
        x: 300,
        y: 330,
      },
      drawSize: {
        width: charRadius * 3,
        height: charRadius * 3,
      },
      sprites: 1,
    });

    const frog = new Character({
      radius: charRadius,
      position: new Position({
        x: Game.SQR_SIZE / 2,
        y: ((Game.ROWS - 0.5) * Game.SQR_SIZE) / Game.ROWS,
        angle: 0,
        max: { x: Game.SQR_SIZE, y: Game.SQR_SIZE },
      }),
      move: new Move({ distance: Game.SQR_SIZE / Game.ROWS }),
      sprite: frogSprite,
      dyingSprite: frogDyingSprite,
    });

    return frog;
  }

}
