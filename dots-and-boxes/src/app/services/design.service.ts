import { EventEmitter, Injectable } from '@angular/core';
import { Game, Player, GameState, PlayerIndex, ClientSentEvent, Box, ServerSentEvent, Line, Board } from '../model/model';
import { BoardService, lineComplete } from './board.service';

const LAST_BOARD_KEY = 'dab-design-board';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private $board: Board;

  get board(): Board {
    if (this.$board) {
      return this.$board;
    }

    const boardString = localStorage.getItem(LAST_BOARD_KEY);
    if (boardString) {
      this.$board = BoardService.INSTANCE.joinBoxes(JSON.parse(boardString));
    } else {
      this.$board = BoardService.INSTANCE.newBoard(4);
    }

    return this.$board;
  }

  set board(board: Board) {
    this.$board = board;
    this.saveBoard();
  }

  saveBoard() {
    localStorage.setItem(LAST_BOARD_KEY, JSON.stringify(this.board));
  }
}
