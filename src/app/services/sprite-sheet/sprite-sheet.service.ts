import { Injectable } from '@angular/core';
import { SpriteSheet } from 'src/app/models/sprite-sheet.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpriteSheetService {
  static ALLIGATOR = new SpriteSheet({
    sheet: `${environment}alligator.png`,
    size: {
      width: 381,
      height: 79,
    },
  });

  static FIRE = new SpriteSheet({
    sheet: `${environment}fire.png`,
    size: {
      width: 256,
      height: 256,
    },
  });

  static MAIN = new SpriteSheet({
    sheet: `${environment}game_sprites.png`,
    size: {
      width: 600,
      height: 561,
    },
  });

  static GUTS = new SpriteSheet({
    sheet: `${environment}guts.png`,
    size: {
      width: 256,
      height: 256,
    },
  });
}
