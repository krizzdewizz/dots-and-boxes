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
    this.ws.on('dab-message', (msg: ServerSentEvent) => {
      switch (msg.type) {
        case 'game':
          this.game = msg.game;
          this.findPlayerInGame();
          this.onGame.next(this.game);
          break;
        case 'joined':
          this.playerId = this.lastPlayerId = msg.playerId;
          localStorage.setItem(LAST_PLAYER_ID_KEY, String(this.lastPlayerId));
          break;
      }
    });

    this.ws.on('disconnect', () => {
      this.reset();
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
    this.send({ type: 'restartGame' });
  }

  click(row: number, box: number, line) {
    const lineObj: Line = boardService.getLine(this.game.board, row, box, line);

    if (boardService.lineComplete(lineObj)) {
      return;
    }

    this.send({
      type: 'clickLine',
      playerId: this.playerId,
      row, box, line
    } as ClientSentEvent);
  }

  join(player: Player) {
    this.send({ type: 'join', player });
  }

  leave() {
    this.send({ type: 'leave', playerId: this.playerId });
    this.reset();
  }

  start() {
    this.send({ type: 'startGame' });
  }

  private reset() {
    delete this.playerId;
    delete this.lastPlayerId;
    delete this.game;
    localStorage.removeItem(LAST_PLAYER_ID_KEY);
  }

  private send(data: ClientSentEvent) {
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
