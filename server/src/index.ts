import { GameService } from './game.service';
import { ServerSentEvent, ClientSentEvent } from '@shared/model';
import { log } from '@shared/util';
import express from 'express';
import http from 'http';
import socket from 'socket.io';

const PORT = 8999;

const app = express();
// .use('/node_modules', express.static('node_modules'))
// .use(express.static('www'))

const server = http.createServer(app);

const io = socket(server);

const gameService = new GameService();


function send(dest, message: ServerSentEvent = { type: 'game', game: gameService.game }) {
    dest.emit('dab-message', message);
}

function chat(text: string) {
    send(io, { type: 'chat', message: { sender: 'sys', text } });
}

gameService.sendGame = () => send(io);
gameService.chat = chat;

io.on('connection', ws => {

    log(`connection++`);

    send(ws);

    ws.on('dab-message', (msg: ClientSentEvent) => {

        log(`received:`, msg);

        let playerLeft: string;
        if (msg.type === 'leave') {
            const player = gameService.game.players.find(p => p.id === msg.playerId);
            playerLeft = player ? player.name : '?';
        }

        const { ok, message, toAll } = gameService.handle(msg);
        if (ok) {
            if (message) {
                log('sending response to client:', message);
                send(toAll ? io : ws, message);

                if (msg.type === 'join') {
                    chat(`Willkommen ${msg.player.name}`);
                }
            }
            log('sending game state to clients');
            send(io);

            if (playerLeft) {
                chat(`${playerLeft} hat das Spiel verlassen`);
            }
        }
    });
});

server.listen(PORT, () => log(`Server started on port ${PORT}`));
