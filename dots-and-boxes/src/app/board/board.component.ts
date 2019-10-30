import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Board, Box, Line } from '../model/model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'dab-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @HostBinding('class.active') get active(): boolean {
    return this.gameService.isMyTurn;
  }

  @HostBinding('class.current-player1') get currentPlayer1Class(): boolean {
    return this.gameService.isMyTurn && this.gameService.game.currentPlayer === 0;
  }

  @HostBinding('class.current-player2') get currentPlayer2Class(): boolean {
    return this.gameService.isMyTurn && this.gameService.game.currentPlayer === 1;
  }

  @HostBinding('class.not-my-turn') get notMyTurnClass() {
    return !this.gameService.isMyTurn;
  }

  @Input() board: Board;

  @Output() clickLine = new EventEmitter();

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    // const board = this.boardService.newBoard(2)
    // this.gameService.startGame(0)
  }

  lines(box: Box) {
    return [
      { name: 'top', ...box.top },
      { name: 'left', ...box.left },
      { name: 'bottom', ...box.bottom },
      { name: 'right', ...box.right }
    ];
  }

  onClickLine(row: number, box: number, line: string) {
    this.clickLine.emit({ row, box, line });
  }
}
