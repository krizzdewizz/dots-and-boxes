import { Component } from '@angular/core';
import { GameState, Game, PlayerIndex } from '../model/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

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
