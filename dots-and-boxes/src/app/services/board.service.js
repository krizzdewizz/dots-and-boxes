"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newBox() {
    return {
        top: {},
        left: {},
        bottom: {},
        right: {},
    };
}
function joinBoxesLeftRight(left, right) {
    if (!left) {
        return;
    }
    left.right = right.left;
}
function joinBoxesTopBottom(top, bottom) {
    top.bottom = bottom.top;
}
function addRow(board, row) {
    var topRow = board[board.length - 1];
    if (topRow) {
        topRow.forEach(function (topBox, colIndex) {
            var box = row[colIndex];
            joinBoxesTopBottom(topBox, box);
        });
    }
    board.push(row);
}
var BoardService = /** @class */ (function () {
    function BoardService() {
    }
    BoardService.prototype.newBoard = function (size) {
        var board = [];
        for (var row = 0; row < size; row++) {
            var r = [];
            var prevBox = void 0;
            for (var col = 0; col < size; col++) {
                var box = newBox();
                joinBoxesLeftRight(prevBox, box);
                prevBox = box;
                if (col === 0) {
                    box.left.boundary = true;
                }
                else if (col === size - 1) {
                    box.right.boundary = true;
                }
                if (row === 0) {
                    box.top.boundary = true;
                }
                else if (row === size - 1) {
                    box.bottom.boundary = true;
                }
                r.push(box);
            }
            addRow(board, r);
        }
        return board;
    };
    BoardService.prototype.isBoundaryOwner = function (_a) {
        var left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        return left.boundary && right.boundary && top.boundary && bottom.boundary;
    };
    BoardService.INSTANCE = new BoardService();
    return BoardService;
}());
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map