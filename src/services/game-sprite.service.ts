import { Clock } from 'src/models/clock.model';
import { GameSprite } from 'src/app/models/game-sprite.model';
import { Game } from 'src/models/game.model';
import { Sprite } from 'src/models/sprite.model';
import { SpriteSheetService } from './sprite-sheet.service';

export class GameSpriteService {
  static gameSprites: Record<GameSprite, Sprite> = {
    ///////////////////////// Road Obstacles //////////////////////////
    [GameSprite.carBlue]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      clipSize: {
        width: 130,
        height: 70,
      },
      offset: {
        x: 12,
        y: 483,
      },
      drawSize: {
        width: 150,
        height: Game.ROW_HEIGHT * (9 / 10),
      },
      scale: {
        x: -1,
        y: 1,
      },
    }),

    [GameSprite.carFire]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      clipSize: {
        width: 180,
        height: 80,
      },
      offset: {
        x: 10,
        y: 400,
      },
      drawSize: {
        width: 150,
        height: Game.ROW_HEIGHT * (9 / 10),
      },
    }),

    [GameSprite.carGreen]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      clipSize: {
        width: 135,
        height: 70,
      },
      offset: {
        x: 155,
        y: 483,
      },
      drawSize: {
        width: 150,
        height: Game.ROW_HEIGHT * (9 / 10),
      },
    }),

    [GameSprite.carSemi]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 200,
        y: 400,
      },
      clipSize: {
        width: 290,
        height: 70,
      },
      drawSize: {
        width: 200,
        height: Game.ROW_HEIGHT * (9 / 10),
      },
      scale: {
        x: -1,
        y: 1,
      },
    }),

    [GameSprite.carYellow]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 305,
        y: 483,
      },
      clipSize: {
        width: 135,
        height: 70,
      },
      drawSize: {
        width: 150,
        height: Game.ROW_HEIGHT * (9 / 10),
      },
      scale: {
        x: -1,
        y: 1,
      },
    }),

    ////////////////////// River Obstacles ////////////////////////////
    [GameSprite.logLg]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 12,
        y: 257,
      },
      clipSize: {
        width: 353,
        height: 58,
      },
      drawSize: {
        width: 370,
        height: Game.ROW_HEIGHT * 0.9,
      },
    }),

    [GameSprite.logSm]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 386,
        y: 257,
      },
      clipSize: {
        width: 187,
        height: 58,
      },
      drawSize: {
        width: 200,
        height: Game.ROW_HEIGHT * 0.9,
      },
    }),

    [GameSprite.turtle]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 402,
        y: 6,
      },
      clipSize: {
        width: 74,
        height: 65,
      },
      drawSize: {
        width: 75,
        height: Game.ROW_HEIGHT * 0.9,
      },
      offsetRow2: {
        x: 4,
        y: 84,
        breakPoint: 2,
      },
      sprites: 7,
      scale: {
        x: -1,
        y: 1,
      },
      clock: new Clock({ initialTime: 200 }),
    }),

    [GameSprite.turtleEmerging]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 375,
        y: 83,
      },
      clipSize: {
        width: 72,
        height: 65,
      },
      drawSize: {
        width: 75,
        height: Game.ROW_HEIGHT * 0.9,
      },
      sprites: 4,
      curr: 3,
      reverseUpdate: true,
      scale: {
        x: -1,
        y: 1,
      },
      clock: new Clock({ timer: 200 }),
    }),

    [GameSprite.turtleSink]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 375,
        y: 83,
      },
      clipSize: {
        width: 72,
        height: 65,
      },
      drawSize: {
        width: 75,
        height: Game.ROW_HEIGHT * 0.9,
      },
      sprites: 4,
      scale: {
        x: -1,
        y: 1,
      },
      clock: new Clock({ timer: 200 }),
    }),

    ////////////////////// Extra Obstacles ////////////////////////////
    [GameSprite.fly]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 84,
        y: 172,
      },
      clipSize: {
        width: 42,
        height: 46,
      },
      drawSize: {
        width: Game.ROW_HEIGHT * 0.9,
        height: Game.ROW_HEIGHT * 0.9,
      },
    }),

    [GameSprite.lillyPad]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 137,
        y: 160,
      },
      clipSize: {
        width: 80,
        height: 80,
      },
      drawSize: {
        width: Game.ROW_HEIGHT * 0.8,
        height: Game.ROW_HEIGHT * 0.8,
      },
    }),

    /////////////////////// Other Sprites /////////////////////////////
    [GameSprite.die]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 300,
        y: 300,
      },
      clipSize: {
        width: 70,
        height: 50,
      },
      drawSize: {
        width: Game.ROW_HEIGHT,
        height: Game.ROW_HEIGHT,
      },
    }),

    [GameSprite.grass]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 137,
        y: 160,
      },
      clipSize: {
        width: 80,
        height: 80,
      },
      drawSize: {
        width: Game.ROW_HEIGHT + 1.5,
        height: Game.ROW_HEIGHT + 1.5,
      },
    }),

    [GameSprite.river]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 227,
        y: 160,
      },
      clipSize: {
        width: 80,
        height: 80,
      },
      drawSize: {
        width: Game.ROW_HEIGHT + 1.5,
        height: Game.ROW_HEIGHT + 1.5,
      },
    }),

    [GameSprite.road]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 316,
        y: 160,
      },
      clipSize: {
        width: 80,
        height: 80,
      },
      drawSize: {
        width: Game.ROW_HEIGHT + 5,
        height: Game.ROW_HEIGHT + 1.5,
      },
    }),

    [GameSprite.winBad]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 409,
        y: 161,
      },
      clipSize: {
        width: 78,
        height: 78,
      },
      drawSize: {
        width: Game.ROW_HEIGHT + 1.5,
        height: Game.ROW_HEIGHT + 1.5,
      },
    }),

    [GameSprite.winGood]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      offset: {
        x: 498,
        y: 160,
      },
      clipSize: {
        width: 80,
        height: 80,
      },
      drawSize: {
        width: Game.ROW_HEIGHT + 1.5,
        height: Game.ROW_HEIGHT + 5,
      },
    }),

    [GameSprite.frog]: new Sprite({
      sheet: SpriteSheetService.MAIN,
      clipSize: {
        width: 54,
        height: 70,
      },
      drawSize: {
        width: Game.ROW_HEIGHT * 0.9,
        height: Game.ROW_HEIGHT * 0.9,
      },
    }),

    [GameSprite.alligatorBody]: new Sprite({
      sheet: SpriteSheetService.ALLIGATOR,
      clipSize: {
        width: 155,
        height: 79,
      },
      drawSize: {
        width: 378,
        height: Game.ROW_HEIGHT * 0.9,
      },
    }),

    [GameSprite.alligatorHead]: new Sprite({
      sheet: SpriteSheetService.ALLIGATOR,
      offset: {
        x: 192,
        y: 0,
      },
      offsetRow2: {
        // Using this because there is a gap between the sprites
        x: 307,
        y: 0,
        breakPoint: 1,
      },
      clipSize: {
        width: 155,
        height: 79,
      },
      drawSize: {
        width: 378,
        height: Game.ROW_HEIGHT * 0.9,
      },
      sprites: 2,
    }),

    [GameSprite.guts]: new Sprite({
      sheet: SpriteSheetService.GUTS,
      clipSize: SpriteSheetService.GUTS.size,
      drawSize: { width: 20, height: 20 },
    }),

    [GameSprite.fire]: new Sprite({
      sheet: SpriteSheetService.FIRE,
      clipSize: SpriteSheetService.FIRE.size,
      drawSize: { width: 20, height: 20 },
    }),
  };
}
