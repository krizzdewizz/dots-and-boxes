import { EventEmitter, Injectable } from '@angular/core';
import { Game, Player } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  onGame = new EventEmitter<Game>();
  playerId: number;

  private ws: WebSocket;

  init() {
    this.ws = new WebSocket(`ws://${location.host}/api`);
    this.ws.onopen = () => console.log('websocket is connected');
    this.ws.onmessage = message => {
      console.log('client received:', message);
      const data = JSON.parse(message.data);
      if (data.game) {
        this.game = data.game;
        this.onGame.next(data.game);
      } else if (data.playerId) {
        this.playerId = data.playerId;
      }
    };
  }

  restart() {
    this.send({ restart: true });
  }

  click(row: number, box: number, line) {
    this.send({
      clickLine: {
        playerId: this.playerId,
        row, box, line
      }
    });
  }

  join(player: Player) {
    this.send({ join: { player } });
  }

  start() {
    this.send({ startGame: true });
  }

  private send(data) {
    this.ws.send(JSON.stringify(data));
  }

  get isMyTurn(): boolean {
    const { game } = this;
    if (!game) {
      return false;
    }
    const currPlayer = game.players[game.currentPlayer];
    if (!currPlayer) {
      return;
    }
    return currPlayer.id === this.playerId;
  }
}
