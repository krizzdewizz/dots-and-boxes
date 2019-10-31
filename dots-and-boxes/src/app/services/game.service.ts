import { EventEmitter, Injectable } from '@angular/core';
import { ClientSentEvent, Game, GameState, Line, Player, PlayerIndex, ServerSentEvent } from '@shared/model';
import * as boardService from '@shared/board.service';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

const LAST_PLAYER_ID_KEY = 'dab-player-id';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  onGame = new EventEmitter<Game>();
  playerId: number;
  private lastPlayerId: number;

  private ws: SocketIOClient.Socket;

  init() {
    this.lastPlayerId = Number(localStorage.getItem(LAST_PLAYER_ID_KEY));

    this.ws = io(environment.socketUrl);
    this.ws.on('dab-message', (message: ServerSentEvent) => {
      if (message.game) {
        this.game = message.game;
        this.findPlayerInGame();
        this.onGame.next(this.game);
      } else if (message.playerId) {
        this.playerId = this.lastPlayerId = message.playerId;
        localStorage.setItem(LAST_PLAYER_ID_KEY, String(this.lastPlayerId));
      }
    });
  }

  private findPlayerInGame() {
    const { game, lastPlayerId } = this;
    if (!lastPlayerId) {
      return;
    }

    if (game.players.some(player => player.id === lastPlayerId)) {
      this.playerId = lastPlayerId;
    }
  }

  get hasJoined(): boolean {
    return !!this.playerId;
  }

  restart() {
    this.send({ restart: true } as ClientSentEvent);
  }

  click(row: number, box: number, line) {
    const lineObj: Line = boardService.getLine(this.game.board, row, box, line);

    if (boardService.lineComplete(lineObj)) {
      return;
    }

    this.send({
      clickLine: {
        playerId: this.playerId,
        row, box, line
      }
    } as ClientSentEvent);
  }

  join(player: Player) {
    this.send({ join: { player } } as ClientSentEvent);
  }

  start() {
    this.send({ startGame: true } as ClientSentEvent);
  }

  private send(data) {
    this.ws.emit('dab-message', data);
  }

  get currentPlayer(): Player {
    const { game } = this;
    if (!game || game.state !== GameState.PLAYING) {
      return undefined;
    }
    return game.players[game.currentPlayer];
  }

  get isMyTurn(): boolean {
    const currPlayer = this.currentPlayer;
    return currPlayer && currPlayer.id === this.playerId;
  }

  isPlayerTurn(player: PlayerIndex): boolean {
    return this.isMyTurn && this.game.currentPlayer === player;
  }
}
