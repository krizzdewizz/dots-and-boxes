import { GameService } from './game.service';
import { ServerSentEvent } from '@shared/model';
import { log } from './util/util';

declare const require;
const express = require('express');
const http = require('http');
const WS = require('ws');

const PORT = 8999;

const app = express();
// .use('/node_modules', express.static('node_modules'))
// .use(express.static('www'))

const server = http.createServer(app);
const wss = new WS.Server({ server });

const gameService = new GameService();

wss.on('connection', ws => {

    log(`connection++`);

    function sendGame(dest) {
        const data: ServerSentEvent = { game: gameService.game };
        dest.send(JSON.stringify(data));
    }

    sendGame(ws);

    ws.on('message', message => {

        log(`received:`, message);

        const msg = JSON.parse(message);

        const { ok, data } = gameService.handle(msg);
        if (ok) {
            if (data) {
                log('sending response to client:', data);
                ws.send(JSON.stringify(data));
            }
            log('sending game state to clients');
            wss.clients.forEach(sendGame);
        }
    });
});

server.listen(PORT, () => log(`Server started on port ${server.address().port}`));