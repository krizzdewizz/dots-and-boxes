import { Component, OnInit } from '@angular/core';
import { GameState, Game, PlayerIndex } from 'src/shared/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  GameState = GameState;

  constructor(public gameService: GameService) { }

  get game(): Game {
    return this.gameService.game;
  }

  ngOnInit() {
  }

  playerActive(index: PlayerIndex): boolean {
    const { game } = this;
    if (game.state === GameState.ENDED) {
      return game.winners.includes(index);
    }
    return game.currentPlayer === index;
  }
}
