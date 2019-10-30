import { GameService } from "./game.service";
import { EventData } from "../../dots-and-boxes/src/app/model/model";

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

    console.log(`${Date.now()} - connection+++`);

    function sendGame(dest) {
        const data: EventData = { game: gameService.game };
        dest.send(JSON.stringify(data));
    }

    sendGame(ws);

    ws.on('message', message => {

        console.log(`${Date.now()} - received:`, message);

        const msg = JSON.parse(message);

        const { ok, data } = gameService.handle(msg);
        if (ok) {

            ws.send(JSON.stringify(data));

            wss.clients.forEach((client, index) => {
                // if (client !== ws) {
                console.log('send to client ', index);
                sendGame(client);
                // }
            });
        }
    });
});

server.listen(PORT, () => console.log(`Server started on port ${server.address().port}`));