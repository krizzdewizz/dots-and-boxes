import { Component } from '@angular/core';
import { GameState, Game, PlayerIndex } from '../model/model';
import { HostBinding } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  @HostBinding('class.current-player1') get currentPlayer1Class() {
    return this.currentPlayer === 0;
  }

  @HostBinding('class.current-player2') get currentPlayer2Class() {
    return this.currentPlayer === 1;
  }

  @HostBinding('class.not-my-turn') get notMyTurnClass() {
    return !this.gameService.isMyTurn;
  }

  GameState = GameState;

  constructor(private gameService: GameService) { }

  get game(): Game {
    return this.gameService.game;
  }

  get currentPlayer(): PlayerIndex {
    return this.game ? this.game.currentPlayer : undefined;
  }

  onClickLine({ row, box, line }) {
    this.gameService.click(row, box, line);
  }

  countBoxesOwnedBy(player: PlayerIndex): number {
    return this.gameService.game.countBoxesOwnedBy[player];
  }
}
