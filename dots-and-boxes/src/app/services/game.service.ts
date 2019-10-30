import { EventEmitter, Injectable } from '@angular/core';
import { Game, Player, GameState, PlayerIndex, ClientSentEvent, Box, ServerSentEvent, Line } from '../model/model';
import { BoardService, lineComplete } from './board.service';

const LAST_PLAYER_ID_KEY = 'dab-player-id';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  onGame = new EventEmitter<Game>();
  playerId: number;

  private ws: WebSocket;

  init() {

    this.playerId = Number(localStorage.getItem(LAST_PLAYER_ID_KEY));

    this.ws = new WebSocket(`ws://${location.host}/api`);
    this.ws.onopen = () => console.log('websocket is connected');
    this.ws.onmessage = message => {
      console.log('client received:', message, 'typeof data: ', typeof message.data);
      if (typeof message.data !== 'string') {
        return;
      }
      let data: ServerSentEvent;
      try {
        data = JSON.parse(message.data);
      } catch (err) {
        console.error('error while parsing websocket message: ', err);
        return;
      }

      if (data.game) {
        this.game = data.game;
        this.onGame.next(data.game);
      } else if (data.playerId) {
        this.playerId = data.playerId;
        localStorage.setItem(LAST_PLAYER_ID_KEY, String(data.playerId));
      }
    };
  }

  restart() {
    this.send({ restart: true } as ClientSentEvent);
  }

  click(row: number, box: number, line) {
    const lineObj: Line = BoardService.INSTANCE.getLine(this.game.board, row, box, line);

    if (lineComplete(lineObj)) {
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
    this.ws.send(JSON.stringify(data));
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
