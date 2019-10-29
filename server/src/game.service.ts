import { Player, Line, Box, Board, Game, GameState, PlayerIndex, ClickLineEvent, StartEvent, JoinEvent } from './model'
import { BoardService } from './board.service'
import { copyObj } from './util/util'

function lineComplete(line: Line): boolean {
  return line.boundary || line.owner !== undefined
}

function boxComplete(box: Box): boolean {
  return lineComplete(box.top) &&
    lineComplete(box.left) &&
    lineComplete(box.bottom) &&
    lineComplete(box.right)
}

export class GameService {

  game: Game
  private boardService = new BoardService()

  players: Player[] = []

  constructor() { }

  startGame(board?: Board) {
    this.game.state = GameState.PLAYING
  }

  restart() {
    this.newGame()
    if (this.game.state === GameState.READY) {
      this.startGame()
    }
  }

  newGame(board?: Board) {
    this.game = {
      state: GameState.WAITING_FOR_PLAYERS,
      currentPlayer: 0,
      countBoxesOwnedBy: new Array(this.players.length).fill(0),
      board: this.boardService.newBoard(3),
      players: copyObj(this.players)
    }
    this.updateReady()
  }

  join(player: Player) {
    if (!player.name) {
      return false
    }

    const { game } = this

    if (this.players.some(({ name }) => name === player.name)) {
      console.log(`name "${player.name}" alreay used. Please use a different one.`)
      return false
    }

    player.id = Date.now()
    this.players.push(player)
    game.players = copyObj(this.players)
    this.updateReady()
    return true
  }

  private updateReady() {
    if (this.players.length >= 2) {
      this.game.state = GameState.READY
    }
  }

  handle(msg, ws) {
    if (msg.clickLine) {
      const ev = msg.clickLine as ClickLineEvent
      const line = this.game.board[ev.row][ev.box][ev.line] as Line
      this.click(ev.playerId, line)
      return true
    } else if (msg.startGame) {
      this.startGame()
      return true
    } else if (msg.restart) {
      this.restart()
      return true
    } else if (msg.join) {
      const ev = msg.join as JoinEvent
      if (this.join(ev.player)) {
        ws.send(JSON.stringify({ playerId: ev.player.id }))
      }
      return true
    }
  }

  click(playerId: number, line: Line) {
    const { game } = this

    if (game.state !== GameState.PLAYING || lineComplete(line)) {
      return
    }

    const currPlayerId = game.players[game.currentPlayer].id

    if (playerId !== currPlayerId) {
      return
    }

    line.owner = game.currentPlayer

    let hitBox = false
    game.board
      .forEach(row =>
        row
          .filter(box => box.owner === undefined && boxComplete(box))
          .forEach(box => {
            box.owner = game.currentPlayer
            hitBox = true
          }))

    this.updateCountBoxesOwnedBy()
    this.checkWinner()

    if (game.state === GameState.PLAYING && !hitBox) {
      this.nextPlayer()
    }
  }

  private nextPlayer() {
    const { game } = this
    if (game.currentPlayer + 1 < game.players.length) {
      game.currentPlayer++
    } else {
      game.currentPlayer = 0
    }
  }

  updateCountBoxesOwnedBy() {
    const { game } = this
    const count = game.board.reduce((prev, curr) =>
      curr.filter(box => box.owner === game.currentPlayer).length + prev, 0)

    game.countBoxesOwnedBy[game.currentPlayer] = count
  }

  private checkWinner() {
    const { game } = this
    const hasFreeBoxes = this.game.board.some(row => row.some(box => box.owner === undefined))
    if (hasFreeBoxes) {
      return
    }

    let max = 0
    let best: PlayerIndex
    this.game.countBoxesOwnedBy.forEach((count, playerIndex) => {
      if (count > max) {
        best = playerIndex
      }
    })

    this.game.state = GameState.ENDED
    this.game.winner = best
  }
}
