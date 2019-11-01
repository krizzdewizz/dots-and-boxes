import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as boardService from '@shared/board.service';
import { Board } from '@shared/model';
import { DesignService } from '../services/design.service';
import { GameService } from '../services/game.service';
import { copyObj } from '../../shared/util';


@Component({
  selector: 'dab-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {

  sizes = [3, 4, 5, 8];

  constructor(
    private designService: DesignService,
    private router: Router,
    private gameService: GameService) { }

  get board(): Board {
    return this.designService.board;
  }

  onClickLine({ row, box, line }) {
    const lineObj = boardService.getLine(this.board, row, box, line);
    lineObj.b = lineObj.b ? 0 : 1; // invert
    this.designService.saveBoard();
  }

  newBoard(size: number) {
    this.designService.board = boardService.newBoard(size);
    this.designService.saveBoard();
  }

  sizeWidth(incr: boolean) {
    this.designService.sizeWidth(incr);
    this.designService.saveBoard();
  }

  sizeHeight(incr: boolean) {
    this.designService.sizeHeight(incr);
    this.designService.saveBoard();
  }

  startGame() {
    this.gameService.nextBoard = copyObj(this.board);
    this.router.navigate(['']);
  }
}
