import { ClientSentEvent, ServerSentEvent, Player, Line, Game, GameState, PlayerIndex } from '@shared/model';
import * as boardService from '@shared/board.service';
import { copyObj, log } from './util/util';

const OK = { ok: true };

export class GameService {

  game: Game;
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
      board: boardService.newBoard(boardSize),
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
      log(`name "${player.name}" alreay used. Please use a different one.`);
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

  handle(msg: ClientSentEvent): { ok: boolean, data?: ServerSentEvent } {
    if (msg.clickLine) {
      const { row, box, line, playerId } = msg.clickLine;
      const lineObj = boardService.getLine(this.game.board, row, box, line);
      this.click(playerId, lineObj);
      return OK;
    } else if (msg.startGame) {
      this.startGame();
      return OK;
    } else if (msg.restart) {
      this.restart();
      return OK;
    } else if (msg.join) {
      const playerId = this.join(msg.join.player);
      if (playerId) {
        return { ok: true, data: { playerId } };
      }
    }

    return { ok: false };
  }

  click(playerId: number, line: Line) {
    const { game } = this;

    if (game.state !== GameState.PLAYING || boardService.lineComplete(line)) {
      return;
    }

    const { currentPlayer } = game;
    const currPlayerId = game.players[currentPlayer].id;

    if (playerId !== currPlayerId) {
      return;
    }

    line.owner = game.currentPlayer;

    let ownsNewBox = false;
    game.board.forEach(row =>
      row
        .filter(box => box.owner === undefined && boardService.boxComplete(box))
        .forEach(box => {
          box.owner = currentPlayer;
          ownsNewBox = true;
        }));

    this.updateCountBoxesOwnedBy();
    this.checkWinners();

    if (game.state === GameState.PLAYING && !ownsNewBox) {
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
    log('game end');
  }
}
