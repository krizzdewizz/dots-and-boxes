import { Component, OnInit } from '@angular/core';
import { Board } from '@shared/model';
import { DesignService } from '../services/design.service';
import * as boardService from '@shared/board.service';

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
    const lineObj = boardService.getLine(this.board, row, box, line);
    lineObj.b = lineObj.b ? 0 : 1; // invert
    this.designService.saveBoard();
  }
}
