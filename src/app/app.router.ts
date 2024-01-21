import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { GameOverComponent } from './game-over/game-over.component';

const routes: Routes = [
  { path: 'play', title: 'Play Frogger', component: PlayComponent },
  { path: 'game-over', title: 'Game Over', component: GameOverComponent },
  { path: '', title: 'Frogger Home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
