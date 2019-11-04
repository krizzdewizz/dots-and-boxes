"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_service_1 = require("./game.service");
var util_1 = require("./shared/util");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var PORT = process.env.PORT || 8999;
var app = express_1.default();
app
    .use(function (req, res, next) {
    // tslint:disable-next-line:max-line-length
    res.header('Content-Security-Policy', 'default-src \'self\' ; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'');
    next();
})
    .use(express_1.default.static('out/dots-and-boxes'));
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
var gameService = new game_service_1.GameService();
function send(dest, message) {
    if (message === void 0) { message = { type: 'game', game: gameService.game }; }
    dest.emit('dab-message', message);
}
function chat(text) {
    send(io, { type: 'chat', message: { sender: 'sys', text: text } });
}
gameService.sendGame = function () { return send(io); };
gameService.chat = chat;
io.on('connection', function (ws) {
    util_1.log("connection++");
    send(ws);
    ws.on('dab-message', function (msg) {
        util_1.log("received:", msg);
        var playerLeft;
        if (msg.type === 'leave') {
            var player = gameService.game.players.find(function (p) { return p.id === msg.playerId; });
            playerLeft = player ? player.name : '?';
        }
        var _a = gameService.handle(msg), ok = _a.ok, message = _a.message, toAll = _a.toAll;
        if (ok) {
            if (message) {
                util_1.log('sending response to client:', message);
                send(toAll ? io : ws, message);
                if (msg.type === 'join') {
                    chat("Willkommen " + msg.player.name);
                }
            }
            util_1.log('sending game state to clients');
            send(io);
            if (playerLeft) {
                chat(playerLeft + " hat das Spiel verlassen");
            }
        }
    });
});
server.listen(PORT, function () { return util_1.log("Server started on port " + PORT); });
//# sourceMappingURL=index.js.map