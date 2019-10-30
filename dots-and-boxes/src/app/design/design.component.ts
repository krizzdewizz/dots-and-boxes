import { Component, OnInit } from '@angular/core';
import { Board, Line } from '../model/model';
import { DesignService } from '../services/design.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'dab-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  board: Board;

  constructor(private designService: DesignService) { }

  ngOnInit() {
    this.board = this.designService.board;
  }

  onClickLine({ row, box, line }) {
    const lineObj = BoardService.INSTANCE.getLine(this.board, row, box, line);
    lineObj.boundary = !lineObj.boundary;
    this.designService.saveBoard();
  }
}
