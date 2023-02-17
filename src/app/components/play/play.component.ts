import { Component, Input } from '@angular/core';
import { Controls } from 'src/app/models/controls.model';
import { Game } from 'src/app/models/game.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  @Input() controls: Controls = new Controls();
  @Input() game: Game = new Game({ level: 0, levels: 2 });
  env = environment;
}
