import { Component } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  canvasDimensions = {
    height: 1024,
    width: 1024,
  };
}
