import { ClientSentEvent, ServerSentEvent, Player, Line, Game, GameState, PlayerIndex, Board, MAX_PLAYERS } from '@shared/model';
import * as boardService from '@shared/board.service';
import { copyObj, log } from '@shared/util';

const OK = { ok: true };

export class GameService {

  sendGame: () => void;
  chat: (text: string) => void;

  game: Game;

  private players: Player[] = [];
  private lastBoard: Board;

  constructor() {
    this.newGame();
  }

  handle(msg: ClientSentEvent): { ok: boolean, message?: ServerSentEvent, toAll?: boolean } {
    switch (msg.type) {
      case 'clickLine':
        const { row, box, line } = msg;
        const lineObj = boardService.getLine(this.game.board, row, box, line);
        this.click(msg.playerId, lineObj);
        return OK;
      case 'startGame':
        this.startGame();
        return OK;
      case 'restartGame':
        this.restartGame();
        return OK;
      case 'join':
        const { playerId, error } = this.join(msg.player);
        if (playerId) {
          return { ...OK, message: { type: 'joined', playerId } };
        } else if (error) {
          return { ...OK, message: { type: 'join-error', error } };
        }
        break;
      case 'leave':
        this.leave(msg.playerId);
        return OK;
      case 'newBoard':
        this.restartGame(msg.board);
        return OK;
      case 'addBot':
        this.addBot();
        return OK;
      case 'chat':
        return { ...OK, toAll: true, message: { type: 'chat', message: msg.message } };
      default: // nok
    }
    return { ok: false };
  }

  addBot() {
    const { game } = this;
    if (game.players.length === MAX_PLAYERS) {
      return;
    }

    this.players.push({ id: 1, name: 'bot' });
    this.updateGamePlayers();
  }

  private isBot({ id }: Player): boolean {
    return id < 10;
  }

  private startGame() {
    this.game.state = GameState.PLAYING;
    this.game.currentPlayer = 0;
  }

  private restartGame(board = this.lastBoard) {
    this.newGame(board);
    if (this.game.state === GameState.READY) {
      this.startGame();
    }
  }

  private newGame(board = boardService.newBoard(5)) {

    boardService.joinBoxes(board);

    this.game = {
      state: GameState.WAITING_FOR_PLAYERS,
      countBoxesOwnedBy: {},
      board,
      players: copyObj(this.players),
      winners: []
    };

    this.lastBoard = copyObj(this.game.board);

    this.updateReady();
  }

  private join(player: Player): { playerId?: number, error?: string } {
    if (!player.name || this.playing) {
      return {};
    }

    const joiningPlayerName = player.name.toLowerCase();
    if (joiningPlayerName === 'sys' || this.players.some(({ name }) => name.toLowerCase() === joiningPlayerName)) {
      return { error: `"${player.name}" wird schon verwendet. Bitte wähle einen anderen Namen.` };
    }

    const playerId = Date.now();
    const newPlayer = { ...player, id: playerId };

    this.players.push(newPlayer);
    this.updateGamePlayers();
    return { playerId };
  }

  private leave(playerId: number) {
    this.players = this.players.filter(player => player.id !== playerId);
    this.updateGamePlayers();

    if (this.game.state === GameState.WAITING_FOR_PLAYERS) {
      // game aborted
      this.game.board = copyObj(this.lastBoard);
      this.game.countBoxesOwnedBy = {};
      this.game.winners = [];
      delete this.game.currentPlayer;
    }
  }

  private get playing(): boolean {
    return this.game && this.game.state === GameState.PLAYING;
  }

  private updateGamePlayers() {
    this.game.players = copyObj(this.players);
    this.updateReady();
  }

  private click(playerId: number, line: Line) {
    const { game } = this;

    if (!this.playing || boardService.lineComplete(line)) {
      return;
    }

    const { currentPlayer } = game;
    const currPlayerId = game.players[currentPlayer].id;

    if (playerId !== currPlayerId) {
      return;
    }

    line.o = game.currentPlayer;

    let boxCompleted = false;
    game.board.forEach(row =>
      row
        .filter(box => box.o === undefined && boardService.boxComplete(box))
        .forEach(box => {
          box.o = currentPlayer;
          boxCompleted = true;
        }));

    if (boxCompleted) {
      this.updateCountBoxesOwnedByCurrentPlayer();
    }

    this.checkWinners();

    if (this.playing) {
      if (!boxCompleted) {
        this.nextPlayer();
      }
      this.botTurn(game);
    }
  }

  private updateReady() {
    this.game.state = this.players.length < 2 ? GameState.WAITING_FOR_PLAYERS : GameState.READY;
  }

  private nextPlayer() {
    const { game } = this;
    if (game.currentPlayer + 1 < game.players.length) {
      game.currentPlayer++;
    } else {
      game.currentPlayer = 0;
    }
  }

  private botTurn(game: Game) {
    const player = game.players[game.currentPlayer];
    if (this.isBot(player)) {
      this.chat(`"${player.name}" is thinking...`);
      setTimeout(() => {
        this.click(player.id, boardService.findFreeLine(game.board));
        this.sendGame();
      }, 1000);
    }
  }

  private updateCountBoxesOwnedByCurrentPlayer() {
    const { game } = this;
    const { currentPlayer } = game;
    const count = game.board.reduce((prev, curr) =>
      curr.filter(box => box.o === currentPlayer).length + prev, 0);

    game.countBoxesOwnedBy[currentPlayer] = count;
  }

  private checkWinners() {
    const hasFreeBoxes = this.game.board.some(row => row.some(box => !boardService.boxComplete(box)));
    if (hasFreeBoxes) {
      return;
    }

    const { game } = this;
    const { countBoxesOwnedBy } = game;
    const players = Object.keys(countBoxesOwnedBy);

    const max = players
      .map(player => countBoxesOwnedBy[player])
      .reduce((prev, count) => Math.max(prev, count), 0);

    game.winners = players
      .filter(player => countBoxesOwnedBy[player] === max)
      .map(Number);

    game.state = GameState.ENDED;
    log('game end');
  }
}
