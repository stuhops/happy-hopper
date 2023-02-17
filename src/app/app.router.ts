import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';

const routes: Routes = [
  { path: 'play', title: 'Play Frogger', component: PlayComponent },
  { path: '', title: 'Frogger Home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
