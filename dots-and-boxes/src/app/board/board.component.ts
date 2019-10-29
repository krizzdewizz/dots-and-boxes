import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Board, Box } from '../model/model';

@Component({
  selector: 'dab-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  @Output() clickLine = new EventEmitter();

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

  _clickLine(row: number, box: number, line: string) {

  }
}
