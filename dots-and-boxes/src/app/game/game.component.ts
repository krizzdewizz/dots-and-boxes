import { Component } from '@angular/core';
import { GameState, Game, PlayerIndex } from '@shared/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerName: string;

  GameState = GameState;

  constructor(public gameService: GameService) { }

  get game(): Game {
    return this.gameService.game;
  }

  get notJoined(): boolean {
    return !this.gameService.playerId;
  }

  get currentPlayer(): PlayerIndex {
    return this.game ? this.game.currentPlayer : undefined;
  }

  onClickLine({ row, box, line }) {
    this.gameService.click(row, box, line);
  }

  get boardDisabled(): boolean {
    return !this.gameService.isMyTurn;
  }

  playerTurn(index: PlayerIndex): boolean {
    return this.gameService.isPlayerTurn(index);
  }

  join() {
    this.gameService.join({ name: this.playerName });
  }

  restart() {
    this.gameService.restart();
  }

  start() {
    this.gameService.start();
  }
}
