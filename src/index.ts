import { GameLoop } from './services/game-loop.service';
import { Game } from './models/game.model';
import { environment } from './environments/environment';
const CANVAS_SIZE = Game.SQR_SIZE;
const BACKGROUND_MUSIC_URL = `${environment.assetPrefix}background.mp3`;

export { GameLoop, CANVAS_SIZE, BACKGROUND_MUSIC_URL };
