import { GameService } from './game.service';
import { ServerSentEvent } from '@shared/model';
import { log } from './util/util';
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

io.on('connection', ws => {

    log(`connection++`);

    function send(dest, data: ServerSentEvent = { game: gameService.game }) {
        dest.emit('dab-message', data);
    }

    send(ws);

    ws.on('dab-message', msg => {

        log(`received:`, msg);

        const { ok, data } = gameService.handle(msg);
        if (ok) {
            if (data) {
                log('sending response to client:', data);
                send(ws, data);
            }
            log('sending game state to clients');
            send(io);
        }
    });
});

server.listen(PORT, () => log(`Server started on port ${PORT}`));