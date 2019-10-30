import { EventEmitter, Injectable } from '@angular/core';
import { Game, Player, GameState } from '../model/model';

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
      console.log('client received:', message);
      const data = JSON.parse(message.data);
      if (data.game) {
        this.game = data.game;
        this.onGame.next(data.game);
      } else if (data.playerId) {
        this.playerId = data.playerId;
        localStorage.setItem(LAST_PLAYER_ID_KEY, data.playerId);
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
}
