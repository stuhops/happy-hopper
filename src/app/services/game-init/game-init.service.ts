import { Injectable } from '@angular/core';
import { RecordsService } from '../records/records.service';
import { Character } from 'src/app/models/character.model';
import { Game } from 'src/app/models/game.model';
import { HighScore } from 'src/app/models/high-score.model';
import { StatusBar } from 'src/app/models/status-bar.model';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root',
})
export class GameInitService {
  constructor(private _characterService: CharacterService) {}

  frog(): Character {
    return this._characterService.frog();
  }

  game(): Game {
    return new Game({
      level: 0,
      levels: 2,
      character: this.frog(),
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

// game.loader = (function() {
//     let scriptOrder = [
//             scripts: ['obstacle', 'road', 'river', 'land', 'winRow', 'character', 'initialize'],
//             message: 'Game Board loaded',
//             onComplete: null
//         }];
//     let assetOrder = [{
//             key: 'game_sprites',
//             source: '/assets/game_sprites.png'
//         }, {
//             key: 'alligator_sprites',
//             source: '/assets/alligator.png'
//         }, {
//             key: 'fire',
//             source: '/assets/fire.png'
//         }, {
//             key: 'guts',
//             source: '/assets/guts.png'
//         },];

//     //------------------------------------------------------------------
//     //
//     // Helper function used to load scripts in the order specified by the
//     // 'scripts' parameter.  'scripts' expects an array of objects with
//     // the following format...
//     //    {
//     //        scripts: [script1, script2, ...],
//     //        message: 'Console message displayed after loading is complete',
//     //        onComplete: function to call when loading is complete, may be null
//     //    }
//     //
//     //------------------------------------------------------------------
//     function loadScripts(scripts, onComplete) {
//         //
//         // When we run out of things to load, that is when we call onComplete.
//         if (scripts.length > 0) {
//             let entry = scripts[0];
//             require(entry.scripts, function() {
//                 console.log(entry.message);
//                 if (entry.onComplete) {
//                     entry.onComplete();
//                 }
//                 scripts.shift();    // Alternatively: scripts.splice(0, 1);
//                 loadScripts(scripts, onComplete);
//             });
//         } else {
//             onComplete();
//         }
//     }

//     //------------------------------------------------------------------
//     //
//     // Helper function used to load assets in the order specified by the
//     // 'assets' parameter.  'assets' expects an array of objects with
//     // the following format...
//     //    {
//     //        key: 'asset-1',
//     //        source: 'asset/.../asset.png'
//     //    }
//     //
//     // onSuccess is invoked per asset as: onSuccess(key, asset)
//     // onError is invoked per asset as: onError(error)
//     // onComplete is invoked once per 'assets' array as: onComplete()
//     //
//     //------------------------------------------------------------------
//     function loadAssets(assets, onSuccess, onError, onComplete) {
//         //
//         // When we run out of things to load, that is when we call onComplete.
//         if (assets.length > 0) {
//             let entry = assets[0];
//             loadAsset(entry.source,
//                 function(asset) {
//                     onSuccess(entry, asset);
//                     assets.shift();    // Alternatively: assets.splice(0, 1);
//                     loadAssets(assets, onSuccess, onError, onComplete);
//                 },
//                 function(error) {
//                     onError(error);
//                     assets.shift();    // Alternatively: assets.splice(0, 1);
//                     loadAssets(assets, onSuccess, onError, onComplete);
//                 });
//         } else {
//             onComplete();
//         }
//     }

//     //------------------------------------------------------------------
//     //
//     // This function is used to asynchronously load image and audio assets.
//     // On success the asset is provided through the onSuccess callback.
//     // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
//     //
//     //------------------------------------------------------------------
//     function loadAsset(source, onSuccess, onError) {
//         let xhr = new XMLHttpRequest();
//         let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

//         if (fileExtension) {
//             xhr.open('GET', source, true);
//             xhr.responseType = 'blob';

//             xhr.onload = function() {
//                 let asset = null;
//                 if (xhr.status === 200) {
//                     if (fileExtension === 'png' || fileExtension === 'jpg') {
//                         asset = new Image();
//                     } else if (fileExtension === 'mp3') {
//                         asset = new Audio();
//                     } else {
//                         if (onError) { onError('Unknown file extension: ' + fileExtension); }
//                     }
//                     asset.onload = function() {
//                         window.URL.revokeObjectURL(asset.src);
//                     };
//                     asset.src = window.URL.createObjectURL(xhr.response);
//                     if (onSuccess) { onSuccess(asset); }
//                 } else {
//                     if (onError) { onError('Failed to retrieve: ' + source); }
//                 }
//             };
//         } else {
//             if (onError) { onError('Unknown file extension: ' + fileExtension); }
//         }

//         xhr.send();
//     }

//     //------------------------------------------------------------------
//     //
//     // Called when all the scripts are loaded, it kicks off the demo app.
//     //
//     //------------------------------------------------------------------
//     function mainComplete() {
//         console.log('It is all loaded up');
//     }

//     //
//     // Start with loading the assets, then the scripts.
//     console.log('Starting to dynamically load project assets');
//     loadAssets(assetOrder,
//         function(source, asset) {    // Store it on success
//             game.assets[source.key] = asset;
//         },
//         function(error) {
//             console.log(error);
//         },
//         function() {
//             console.log('All game assets loaded');
//             console.log('Starting to dynamically load project scripts');
//             loadScripts(scriptOrder, mainComplete);
//         }
//     );

// }());
// function newGame() {
//   game.winRow = game.createWinRow(
//     0,  // x
//     0,  // y
//     game.gameWidth,  // width
//     game.gameHeight / game.rows * 2 // height
//     // fillImgSrc
//     // obstacleImgSrcArr
//   );
//   game.river = game.createRiver(
//     0,  // x
//     2 * (game.gameHeight / game.rows),  // y
//     game.gameWidth,  // width
//     game.gameHeight / game.rows * 5 // height
//   );
//   game.middleLand = game.createLand(
//     0,  // x
//     parseInt(game.rows / 2) * (game.gameHeight / game.rows),  // y
//     game.gameWidth,  // width
//     game.gameHeight / game.rows * 1 // height
//   );
//   game.road = game.createRoad(
//     0,  // x
//     parseInt(game.rows / 2 + 1) * (game.gameHeight / game.rows),  // y
//     game.gameWidth,  // width
//     game.gameHeight / game.rows * 5 // height
//   );
//   game.startLand = game.createLand(
//     0,  // x
//     parseInt(game.rows - 1) * (game.gameHeight / game.rows),  // y
//     game.gameWidth,  // width
//     game.gameHeight / game.rows * 1 // height
//   );

//   game.statusBar = game.createStatusBar(
//     game.gameWidth,
//     game.gameHeight / game.rows,
//     0,
//     0,
//     // parseInt(game.rows - 1) * (game.gameHeight / game.rows),  // y
//   )

//   document.getElementById('background-music').play();

//   game.gameLoop.start();
// }
