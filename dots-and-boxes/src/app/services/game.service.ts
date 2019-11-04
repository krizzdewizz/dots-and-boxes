import { EventEmitter, Injectable } from '@angular/core';
import {
  ClientSentEvent,
  Game,
  GameState,
  Line,
  Player,
  PlayerIndex,
  ServerSentEvent,
  ChatMessage,
  Board,
  MAX_PLAYERS
} from '../../shared/model';
import * as boardService from '../../shared/board.service';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

const LAST_PLAYER_ID_KEY = 'dab-player-id';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;
  chatMessages: ChatMessage[] = [];
  joinError = new EventEmitter<string>();
  playerId: number;
  private lastPlayerId: number;

  private ws: SocketIOClient.Socket;

  nextBoard: Board;

  sendNextBoard() {
    const { nextBoard: board } = this;
    if (!board) {
      return;
    }
    this.send({ type: 'newBoard', board });
    delete this.nextBoard;
  }

  chat(text: string) {
    this.send({ type: 'chat', message: { sender: this.playerName, text } });
  }

  init() {

    (window as any).q = this;

    this.lastPlayerId = Number(localStorage.getItem(LAST_PLAYER_ID_KEY));

    this.ws = io(environment.socketUrl);
    this.ws.on('dab-message', (msg: ServerSentEvent) => {
      switch (msg.type) {
        case 'game':
          this.game = msg.game;
          this.findPlayerInGame();
          break;
        case 'joined':
          this.playerId = this.lastPlayerId = msg.playerId;
          localStorage.setItem(LAST_PLAYER_ID_KEY, String(this.lastPlayerId));
          break;
        case 'join-error':
          this.joinError.emit(msg.error);
          setTimeout(() => this.joinError.emit(), 3000);
          break;
        case 'chat':
          if (this.hasJoined) {
            this.addChatMessage(msg.message);
          }
          break;
      }
    });

    this.ws.on('disconnect', () => {
      this.reset();
    });
  }

  private addChatMessage(message: ChatMessage) {
    const { chatMessages } = this;
    chatMessages.push(message);
    if (chatMessages.length > 10) {
      chatMessages.shift();
    }
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

  private get playerName(): string {
    const pl = this.game.players.find(player => player.id === this.playerId);
    return pl ? pl.name : '?';
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
    });
  }

  join(player: Player) {
    this.joinError.emit();
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
    this.chatMessages = [];
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

  addBot() {
    const { game } = this;
    if (game.players.length === MAX_PLAYERS) {
      return;
    }
    this.send({ type: 'addBot' });
  }
}
