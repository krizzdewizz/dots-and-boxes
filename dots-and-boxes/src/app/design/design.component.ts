import { Component, OnInit } from '@angular/core';
import { Board } from '../model/model';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'dab-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  board: Board;
  private boardService = new BoardService();

  constructor() { }

  ngOnInit() {
    this.board = this.boardService.newBoard(4);
  }

}
