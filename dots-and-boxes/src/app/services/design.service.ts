import { Injectable } from '@angular/core';
import * as boardService from '@shared/board.service';
import { Board, Row } from '@shared/model';

const BOARD_KEY = 'dab-design-board';

const MAX_BOARD_SIZE = 15;
const MIN_BOARD_SIZE = 3;

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private $board: Board;

  get board(): Board {
    if (this.$board) {
      return this.$board;
    }

    const boardString = localStorage.getItem(BOARD_KEY);
    if (boardString) {
      this.$board = boardService.joinBoxes(JSON.parse(boardString));
    } else {
      this.$board = boardService.newBoard(4);
    }

    return this.$board;
  }

  set board(board: Board) {
    this.$board = board;
    this.saveBoard();
  }

  saveBoard() {
    localStorage.setItem(BOARD_KEY, JSON.stringify(this.board));
  }

  newBoard(size: number) {
    localStorage.removeItem(BOARD_KEY);
    this.$board = boardService.newBoard(size);
  }

  sizeWidth(incr: boolean) {
    const { board } = this;
    const firstRow = board[0];
    const amount = incr ? 1 : -1;
    const newWidth = firstRow.length + amount;

    if (newWidth < MIN_BOARD_SIZE || newWidth > MAX_BOARD_SIZE) {
      return;
    }

    if (incr) {
      board.forEach((row, rowIndex) => {
        const box = boardService.newBox();
        box.r.b = 1;
        if (rowIndex === 0) {
          box.t.b = 1;
        } else if (rowIndex === board.length - 1) {
          box.b.b = 1;
        }
        row.push(box);
      });
      boardService.joinBoxes(board);
    } else {
      board.forEach(row => {
        row.splice(row.length - 1, 1);
        const box = row[row.length - 1];
        box.r.b = 1;
      });
    }
  }

  sizeHeight(incr: boolean) {
    const { board } = this;
    const firstRow = board[0];
    const amount = incr ? 1 : -1;
    const newHeight = this.board.length + amount;

    if (newHeight < MIN_BOARD_SIZE || newHeight > MAX_BOARD_SIZE) {
      return;
    }

    const width = firstRow.length;
    if (incr) {
      const row: Row = [];
      for (let i = 0; i < width; i++) {
        const box = boardService.newBox();
        box.b.b = 1;
        if (i === 0) {
          box.l.b = 1;
        } else if (i === width - 1) {
          box.r.b = 1;
        }
        row.push(box);
      }

      board.push(row);

      boardService.joinBoxes(board);
    } else {
      board.splice(board.length - 1, 1);
      const row = board[board.length - 1];
      row.forEach(box => box.b.b = 1);
    }
  }

}
