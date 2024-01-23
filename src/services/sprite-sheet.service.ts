import { SpriteSheet } from '../models/sprite-sheet.model';
import { environment } from 'src/environments/environment';

export class SpriteSheetService {
  static ALLIGATOR = new SpriteSheet({
    src: `${environment.assetPrefix}alligator.png`,
    size: {
      width: 381,
      height: 79,
    },
  });

  static FIRE = new SpriteSheet({
    src: `${environment.assetPrefix}fire.png`,
    size: {
      width: 256,
      height: 256,
    },
  });

  static MAIN = new SpriteSheet({
    src: `${environment.assetPrefix}game_sprites.png`,
    size: {
      width: 600,
      height: 561,
    },
  });

  static GUTS = new SpriteSheet({
    src: `${environment.assetPrefix}guts.png`,
    size: {
      width: 256,
      height: 256,
    },
  });
}
