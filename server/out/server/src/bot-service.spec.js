"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_service_1 = require("./bot.service");
var board_service_1 = require("../../dots-and-boxes/src/shared/board.service");
describe('BotService', function () {
    var size = 3;
    var board;
    beforeEach(function () {
        board = board_service_1.newBoard(size);
    });
    function findLine() {
        return bot_service_1.findFreeLine(board, function () { return 0; });
    }
    it('should find first free line', function () {
        var box00 = board[0][0];
        var box01 = board[0][1];
        // order checked is t, b, l, t (see freeLines())
        // t is a boundary
        expect(findLine()).toBe(box00.b);
        box00.b.o = 1;
        // l is a boundary
        expect(findLine()).toBe(box00.r);
        box00.r.o = 1;
        expect(findLine()).toBe(box01.b);
        box01.b.o = 1;
        // l not free
        expect(findLine()).toBe(box01.r);
    });
    it('should find best free line', function () {
        var box02 = board[0][2];
        box02.b.o = 1;
        expect(findLine()).toBe(box02.l);
        box02.l.o = 1;
        var box22 = board[2][2];
        box22.l.o = 1;
        expect(findLine()).toBe(box22.t);
        box22.t.o = 1;
        expect(findLine()).toBe(board[1][1].r);
    });
});
//# sourceMappingURL=bot-service.spec.js.map