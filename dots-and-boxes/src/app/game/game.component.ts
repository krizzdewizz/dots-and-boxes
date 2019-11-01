import { Component, OnInit } from '@angular/core';
import { GameState, Game, PlayerIndex } from '@shared/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerName: string;

  GameState = GameState;

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.sendNextBoard();
  }

  get game(): Game {
    return this.gameService.game;
  }

  get joined(): boolean {
    return Boolean(this.gameService.playerId);
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

  playerActive(index: PlayerIndex): boolean {
    const { game } = this;
    if (game.state === GameState.ENDED) {
      return game.winners.includes(index);
    }
    return game.currentPlayer === index;
  }

  join() {
    const { playerName: name } = this;
    if (name) {
      this.gameService.join({ name });
    }
  }

  leave() {
    this.gameService.leave();
  }

  restart() {
    this.gameService.restart();
  }

  start() {
    this.gameService.start();
  }

  addBot() {
    this.gameService.addBot();
  }
}
