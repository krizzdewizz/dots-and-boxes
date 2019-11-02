"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var boardService = __importStar(require("../../dots-and-boxes/src/shared/board.service"));
describe('BoardService', function () {
    it('should create board', function () {
        var size = 3;
        var board = boardService.newBoard(size);
        expect(board.length).toBe(size);
        board.forEach(function (row) { return expect(row.length).toBe(size); });
        var row0 = board[0], row1 = board[1];
        var box00 = row0[0], box01 = row0[1], box02 = row0[2];
        expect(box00.l.b).toBeTruthy();
        expect(box00.t.b).toBeTruthy();
        expect(box00.r.b).toBeFalsy();
        expect(box00.b.b).toBeFalsy();
        expect(box00.r).toBe(box01.l);
        expect(box01.r).toBe(box02.l);
        var box10 = row1[0], box11 = row1[1];
        expect(box00.b).toBe(box10.t);
        expect(box01.b).toBe(box11.t);
    });
});
//# sourceMappingURL=board-service.spec.js.map