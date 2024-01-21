import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent implements OnInit {
  score: number = 0;
  won: boolean = false;

  ngOnInit(): void {
    this.score = JSON.parse(sessionStorage.getItem('score') ?? '0');
    this.won = JSON.parse(sessionStorage.getItem('won') ?? 'false');
  }
}
