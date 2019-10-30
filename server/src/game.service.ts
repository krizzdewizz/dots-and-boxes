import { Player, Line, Box, Game, GameState, PlayerIndex, ClickLineEvent, JoinEvent } from './model';
import { BoardService } from './board.service';
import { copyObj } from './util/util';
import { EventData } from '../../dots-and-boxes/src/app/model/model';

function lineComplete(line: Line): boolean {
  return line.boundary || line.owner !== undefined;
}

function boxComplete(box: Box): boolean {
  return lineComplete(box.top)
    && lineComplete(box.left)
    && lineComplete(box.bottom)
    && lineComplete(box.right);
}

const OK = { ok: true };

export class GameService {

  game: Game;
  private boardService = new BoardService();
  private lastBoardSize = 8;

  players: Player[] = [];

  constructor() {
    this.newGame();
  }

  startGame() {
    this.game.state = GameState.PLAYING;
  }

  restart() {
    this.newGame();
    if (this.game.state === GameState.READY) {
      this.startGame();
    }
  }

  newGame(boardSize = this.lastBoardSize) {
    this.lastBoardSize = boardSize;
    this.game = {
      state: GameState.WAITING_FOR_PLAYERS,
      currentPlayer: 0,
      countBoxesOwnedBy: {},
      board: this.boardService.newBoard(boardSize),
      players: copyObj(this.players),
      winners: []
    };
    this.updateReady();
  }

  join(player: Player): number {
    if (!player.name) {
      return;
    }

    const joiningPlayerName = player.name.toLowerCase();
    if (this.players.some(({ name }) => name.toLowerCase() === joiningPlayerName)) {
      console.log(`name "${player.name}" alreay used. Please use a different one.`);
      return;
    }

    const id = Date.now();
    const newPlayer = { ...player, id };

    this.players.push(newPlayer);
    this.game.players = copyObj(this.players);
    this.updateReady();
    return id;
  }

  private updateReady() {
    if (this.players.length >= 2) {
      this.game.state = GameState.READY;
    }
  }

  handle(msg): { ok: boolean, data?: EventData } {
    if (msg.clickLine) {
      const ev = msg.clickLine as ClickLineEvent;
      const line = this.game.board[ev.row][ev.box][ev.line] as Line;
      this.click(ev.playerId, line);
      return OK;
    } else if (msg.startGame) {
      this.startGame();
      return OK;
    } else if (msg.restart) {
      this.restart();
      return OK;
    } else if (msg.join) {
      const ev = msg.join as JoinEvent;
      const playerId = this.join(ev.player);
      if (playerId) {
        return { ok: true, data: { playerId } };
      }
    }

    return { ok: false };
  }

  click(playerId: number, line: Line) {
    const { game } = this;

    if (game.state !== GameState.PLAYING || lineComplete(line)) {
      return;
    }

    const currPlayerId = game.players[game.currentPlayer].id;

    if (playerId !== currPlayerId) {
      return;
    }


    line.owner = game.currentPlayer;

    const { currentPlayer } = game;
    let ownsNewBox = false;
    game.board.forEach(row =>
      row
        .filter(box => box.owner === undefined && boxComplete(box))
        .forEach(box => {
          box.owner = currentPlayer;
          ownsNewBox = true;
        }));

    this.updateCountBoxesOwnedBy();
    this.checkWinners();

    if (!ownsNewBox) {
      this.nextPlayer();
    }
  }

  private nextPlayer() {
    const { game } = this;
    if (game.currentPlayer + 1 < game.players.length) {
      game.currentPlayer++;
    } else {
      game.currentPlayer = 0;
    }
  }

  updateCountBoxesOwnedBy() {
    const { game } = this;
    const { currentPlayer } = game;
    const count = game.board.reduce((prev, curr) =>
      curr.filter(box => box.owner === currentPlayer).length + prev, 0);

    game.countBoxesOwnedBy[currentPlayer] = count;
  }

  private checkWinners() {
    const hasFreeBoxes = this.game.board.some(row => row.some(box => box.owner === undefined));
    if (hasFreeBoxes) {
      return;
    }

    let max = 0;
    let winners: PlayerIndex[] = [];
    const { countBoxesOwnedBy } = this.game;
    Object.keys(countBoxesOwnedBy).forEach(playerIndex => {
      const count = countBoxesOwnedBy[playerIndex];
      if (count >= max) {
        winners.push(Number(playerIndex));
        max = count;
      }
    });

    this.game.state = GameState.ENDED;
    this.game.winners = winners;
  }
}
