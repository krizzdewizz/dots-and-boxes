import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Board, Box, Line } from '../model/model';
import { GameService } from '../services/game.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  @HostBinding('attr.style') get styleAttr() {
    // const boxSize = 50;
    // const boxLineSize = 8;
    const boxSize = 80;
    const boxLineSize = 12;
    // const boxSize = 150;
    // const boxLineSize = 16;
    return this.sanitizer.bypassSecurityTrustStyle(`--box-size: ${boxSize}px; --box-line-size: ${boxLineSize}px;`);
  }

  @Input() board: Board;

  @Output() clickLine = new EventEmitter();

  constructor(private gameService: GameService, private sanitizer: DomSanitizer) {
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
