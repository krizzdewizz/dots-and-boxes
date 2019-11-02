"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_service_1 = require("./game.service");
var model_1 = require("./shared/model");
var util_1 = require("./shared/util");
var boardService = __importStar(require("./shared/board.service"));
describe('GameService', function () {
    var service;
    beforeEach(function () {
        service = new game_service_1.GameService();
    });
    it('init game', function () {
        expect(service.game.state).toBe(model_1.GameState.WAITING_FOR_PLAYERS);
        expect(service.game.countBoxesOwnedBy).toEqual({});
        expect(service.game.winners).toEqual([]);
        expect(service.game.board).toBeDefined();
    });
    it('should reset game state', function () {
        service.game.state = model_1.GameState.PLAYING;
        service.game.countBoxesOwnedBy = [9, 3];
        service.game.winners = [0, 1];
        var players = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
        service["players"] = players;
        service["newGame"]();
        expect(service.game.state).toBe(model_1.GameState.READY);
        expect(service.game.countBoxesOwnedBy).toEqual({});
        expect(service.game.winners).toEqual([]);
        expect(service.game.board).toBeDefined();
        expect(service.game.players).toEqual(players);
    });
    it('should join player', function () {
        expect(service["join"]({ name: 'krizz' }).playerId).toBeDefined();
        expect(service.game.players.length).toBe(1);
        expect(service.game.players[0].name).toEqual('krizz');
        expect(service.game.players[0].id).toBeDefined();
        expect(service.game.state).toBe(model_1.GameState.WAITING_FOR_PLAYERS);
        expect(service["join"]({ name: 'Krizz' }).playerId).toBeUndefined();
        expect(service["join"]({ name: 'petra' }).playerId).toBeDefined();
        expect(service.game.players.length).toBe(2);
        expect(service.game.players.map(function (p) { return p.name; })).toEqual(['krizz', 'petra']);
        expect(service.game.state).toBe(model_1.GameState.READY);
    });
    it('should not join if player exists', function () {
        expect(service["join"]({ name: 'krizz' }).playerId).toBeDefined();
        var secondJoin = service["join"]({ name: 'krizz' });
        expect(secondJoin.playerId).toBeUndefined();
        expect(secondJoin.error).toBeDefined();
    });
    it('should not join sys', function () {
        var join = service["join"]({ name: 'sys' });
        expect(join.playerId).toBeUndefined();
        expect(join.error).toBeDefined();
    });
    it('should handle line clicks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var krizzId, petraId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    krizzId = service["join"]({ name: 'krizz' }).playerId;
                    return [4 /*yield*/, util_1.sleep(10)];
                case 1:
                    _a.sent();
                    petraId = service["join"]({ name: 'petra' }).playerId;
                    expect(service.game.state).toBe(model_1.GameState.READY);
                    service["newGame"](boardService.newBoard(2));
                    service["startGame"]();
                    // petra's turn
                    service.game.currentPlayer = 1;
                    expect(service.game.state).toBe(model_1.GameState.PLAYING);
                    service.handle({ type: 'clickLine', playerId: petraId, row: 0, box: 0, line: 'r' });
                    expect(service.game.countBoxesOwnedBy).toEqual({});
                    // krizz's turn
                    expect(service.game.currentPlayer).toBe(0);
                    // filled box 0/0
                    service.handle({ type: 'clickLine', playerId: krizzId, row: 0, box: 0, line: 'b' });
                    expect(service.game.countBoxesOwnedBy).toEqual({ 0: 1 });
                    // still krizz's turn
                    expect(service.game.currentPlayer).toBe(0);
                    service.handle({ type: 'clickLine', playerId: krizzId, row: 1, box: 0, line: 'r' });
                    expect(service.game.countBoxesOwnedBy).toEqual({ 0: 2 });
                    service.handle({ type: 'clickLine', playerId: krizzId, row: 1, box: 1, line: 't' });
                    expect(service.game.countBoxesOwnedBy).toEqual({ 0: 4 });
                    expect(service.game.state).toBe(model_1.GameState.ENDED);
                    expect(service.game.winners).toEqual([0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should restart game', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service["join"]({ name: 'krizz' });
                    return [4 /*yield*/, util_1.sleep(10)];
                case 1:
                    _a.sent();
                    service["join"]({ name: 'petra' });
                    expect(service.game.state).toBe(model_1.GameState.READY);
                    service["newGame"](boardService.newBoard(2));
                    service.game.state = model_1.GameState.ENDED;
                    service["restartGame"]();
                    expect(service.game.state).toBe(model_1.GameState.PLAYING);
                    expect(service.game.board.length).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check winners', function () {
        var board = boardService.newBoard(2);
        var completeBox = function (row, box, owner) {
            var b = board[row][box];
            b.o = owner;
            b.t.o = owner;
            b.b.o = owner;
            b.l.o = owner;
            b.r.o = owner;
        };
        completeBox(0, 0, 0);
        completeBox(0, 1, 1);
        completeBox(1, 0, 1);
        completeBox(1, 1, 1);
        service.game = {
            board: board,
            players: [{ name: 'a', id: 1 }, { name: 'b', id: 2 }],
            countBoxesOwnedBy: { 0: 1, 1: 3 },
            winners: []
        };
        service["checkWinners"]();
        expect(service.game.winners).toEqual([1]);
    });
});
//# sourceMappingURL=game-service.spec.js.map