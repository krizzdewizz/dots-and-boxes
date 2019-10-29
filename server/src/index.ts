import { GameService } from "./game.service";
import { BoardService } from "./board.service";

declare const require;
const express = require('express')
const http = require('http')
const WS = require('ws')

const PORT = 8999

const app = express()
// .use('/node_modules', express.static('node_modules'))
// .use(express.static('www'))

const server = http.createServer(app)
const wss = new WS.Server({ server })

const gameService = new GameService()
gameService.newGame()

wss.on('connection', ws => {

    console.log(`${Date.now()} - connection+++`)

    function sendGame(dest) {
        dest.send(JSON.stringify({ game: gameService.game }))
    }

    sendGame(ws)

    ws.on('message', message => {

        console.log(`${Date.now()} - received:`, message)

        const msg = JSON.parse(message)

        if (gameService.handle(msg, ws)) {
            let index = 0
            wss.clients.forEach(client => {
                // if (client !== ws) {
                console.log('send to client ', index)
                sendGame(client)
                index++
                // }
            })
        }
    })
})

server.listen(PORT, () => console.log(`Server started on port ${server.address().port}`))