import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { GameState } from '@shared/model';

@Component({
  selector: 'dab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dots-and-boxes';
  playerName: string = location.search && location.search.substring(1);

  GameState = GameState;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.onGame.subscribe(e => {
      console.log('eeee', e);
    });

    this.gameService.init();

    (window as any).q = () => this.gameService.game;
  }

  get gameState(): GameState {
    const { game } = this.gameService;
    return game ? game.state : GameState.WAITING_FOR_PLAYERS;
  }

  restart() {
    this.gameService.restart();
  }

  join() {
    this.gameService.join({ name: this.playerName });
  }

  start() {
    this.gameService.start();
  }

}
