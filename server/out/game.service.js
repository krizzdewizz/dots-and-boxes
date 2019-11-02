"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./shared/model");
var boardService = __importStar(require("./shared/board.service"));
var botService = __importStar(require("./bot.service"));
var util_1 = require("./shared/util");
var OK = { ok: true };
var GameService = /** @class */ (function () {
    function GameService() {
        this.players = [];
        this.newGame();
    }
    GameService.prototype.handle = function (msg) {
        switch (msg.type) {
            case 'clickLine':
                var row = msg.row, box = msg.box, line = msg.line;
                var lineObj = boardService.getLine(this.game.board, row, box, line);
                this.click(msg.playerId, lineObj);
                return OK;
            case 'startGame':
                this.startGame();
                return OK;
            case 'restartGame':
                this.restartGame();
                return OK;
            case 'join':
                var _a = this.join(msg.player), playerId = _a.playerId, error = _a.error;
                if (playerId) {
                    return __assign(__assign({}, OK), { message: { type: 'joined', playerId: playerId } });
                }
                else if (error) {
                    return __assign(__assign({}, OK), { message: { type: 'join-error', error: error } });
                }
                break;
            case 'leave':
                this.leave(msg.playerId);
                return OK;
            case 'newBoard':
                this.restartGame(msg.board);
                return OK;
            case 'addBot':
                this.addBot();
                return OK;
            case 'chat':
                return __assign(__assign({}, OK), { toAll: true, message: { type: 'chat', message: msg.message } });
            default: // nok
        }
        return { ok: false };
    };
    GameService.prototype.addBot = function () {
        var game = this.game;
        if (game.players.length === model_1.MAX_PLAYERS) {
            return;
        }
        this.players.push({ id: 1, name: 'bot' });
        this.updateGamePlayers();
    };
    GameService.prototype.isBot = function (_a) {
        var id = _a.id;
        return id < 10;
    };
    GameService.prototype.startGame = function () {
        this.game.state = model_1.GameState.PLAYING;
        this.game.currentPlayer = 0;
    };
    GameService.prototype.restartGame = function (board) {
        if (board === void 0) { board = this.lastBoard; }
        this.newGame(board);
        if (this.game.state === model_1.GameState.READY) {
            this.startGame();
        }
    };
    GameService.prototype.newGame = function (board) {
        if (board === void 0) { board = boardService.newBoard(5); }
        boardService.joinBoxes(board);
        this.game = {
            state: model_1.GameState.WAITING_FOR_PLAYERS,
            countBoxesOwnedBy: {},
            board: board,
            players: util_1.copyObj(this.players),
            winners: []
        };
        this.lastBoard = util_1.copyObj(this.game.board);
        this.updateReady();
    };
    GameService.prototype.join = function (player) {
        if (!player.name || this.playing) {
            return {};
        }
        var joiningPlayerName = player.name.toLowerCase();
        if (joiningPlayerName === 'sys' || this.players.some(function (_a) {
            var name = _a.name;
            return name.toLowerCase() === joiningPlayerName;
        })) {
            return { error: "\"" + player.name + "\" wird schon verwendet. Bitte w\u00E4hle einen anderen Namen." };
        }
        var playerId = Date.now();
        var newPlayer = __assign(__assign({}, player), { id: playerId });
        this.players.push(newPlayer);
        this.updateGamePlayers();
        return { playerId: playerId };
    };
    GameService.prototype.leave = function (playerId) {
        this.players = this.players.filter(function (player) { return player.id !== playerId; });
        this.updateGamePlayers();
        if (this.game.state === model_1.GameState.WAITING_FOR_PLAYERS) {
            // game aborted
            this.game.board = util_1.copyObj(this.lastBoard);
            this.game.countBoxesOwnedBy = {};
            this.game.winners = [];
            delete this.game.currentPlayer;
        }
    };
    Object.defineProperty(GameService.prototype, "playing", {
        get: function () {
            return this.game && this.game.state === model_1.GameState.PLAYING;
        },
        enumerable: true,
        configurable: true
    });
    GameService.prototype.updateGamePlayers = function () {
        this.game.players = util_1.copyObj(this.players);
        this.updateReady();
    };
    GameService.prototype.click = function (playerId, line) {
        var game = this.game;
        if (!this.playing || boardService.lineComplete(line)) {
            return;
        }
        var currentPlayer = game.currentPlayer;
        var currPlayerId = game.players[currentPlayer].id;
        if (playerId !== currPlayerId) {
            return;
        }
        line.o = game.currentPlayer;
        var boxCompleted = false;
        game.board.forEach(function (row) {
            return row
                .filter(function (box) { return box.o === undefined && boardService.boxComplete(box); })
                .forEach(function (box) {
                box.o = currentPlayer;
                boxCompleted = true;
            });
        });
        if (boxCompleted) {
            this.updateCountBoxesOwnedByCurrentPlayer();
        }
        this.checkWinners();
        if (this.playing) {
            if (!boxCompleted) {
                this.nextPlayer();
            }
            this.botTurn(game);
        }
    };
    GameService.prototype.updateReady = function () {
        this.game.state = this.players.length < 2 ? model_1.GameState.WAITING_FOR_PLAYERS : model_1.GameState.READY;
    };
    GameService.prototype.nextPlayer = function () {
        var game = this.game;
        if (game.currentPlayer + 1 < game.players.length) {
            game.currentPlayer++;
        }
        else {
            game.currentPlayer = 0;
        }
    };
    GameService.prototype.botTurn = function (game) {
        var _this = this;
        var player = game.players[game.currentPlayer];
        if (this.isBot(player)) {
            this.chat("\"" + player.name + "\" is thinking...");
            setTimeout(function () {
                _this.click(player.id, botService.findFreeLine(game.board));
                _this.sendGame();
            }, 1000);
        }
    };
    GameService.prototype.updateCountBoxesOwnedByCurrentPlayer = function () {
        var game = this.game;
        var currentPlayer = game.currentPlayer;
        var count = game.board.reduce(function (prev, curr) {
            return curr.filter(function (box) { return box.o === currentPlayer; }).length + prev;
        }, 0);
        game.countBoxesOwnedBy[currentPlayer] = count;
    };
    GameService.prototype.checkWinners = function () {
        var hasFreeBoxes = this.game.board.some(function (row) { return row.some(function (box) { return !boardService.boxComplete(box); }); });
        if (hasFreeBoxes) {
            return;
        }
        var game = this.game;
        var countBoxesOwnedBy = game.countBoxesOwnedBy;
        var players = Object.keys(countBoxesOwnedBy);
        var max = players
            .map(function (player) { return countBoxesOwnedBy[player]; })
            .reduce(function (prev, count) { return Math.max(prev, count); }, 0);
        game.winners = players
            .filter(function (player) { return countBoxesOwnedBy[player] === max; })
            .map(Number);
        game.state = model_1.GameState.ENDED;
        util_1.log('game end');
    };
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map