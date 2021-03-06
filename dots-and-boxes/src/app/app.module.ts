import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { DesignComponent } from './design/design.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DesignComponent,
    GameComponent,
    ChatComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
