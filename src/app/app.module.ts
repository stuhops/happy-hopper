import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.router';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { GameOverComponent } from './game-over/game-over.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PlayComponent, GameOverComponent],
  imports: [AppRoutingModule, BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
