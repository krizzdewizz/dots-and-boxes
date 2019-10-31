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
function lineComplete(line) {
    return line.boundary || line.owner !== undefined;
}
exports.lineComplete = lineComplete;
function boxComplete(box) {
    return lineComplete(box.top)
        && lineComplete(box.left)
        && lineComplete(box.bottom)
        && lineComplete(box.right);
}
exports.boxComplete = boxComplete;
var BoardService = /** @class */ (function () {
    function BoardService() {
    }
    BoardService.prototype.newBoard = function (size) {
        var board = [];
        for (var row = 0; row < size; row++) {
            var r = [];
            for (var col = 0; col < size; col++) {
                var box = newBox();
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
            board.push(r);
        }
        return this.joinBoxes(board);
    };
    BoardService.prototype.joinBoxes = function (board) {
        var prevRow;
        board.forEach(function (row) {
            var prevBox;
            row.forEach(function (box) {
                joinBoxesLeftRight(prevBox, box);
                prevBox = box;
            });
            if (prevRow) {
                prevRow.forEach(function (topBox, colIndex) {
                    var box = row[colIndex];
                    joinBoxesTopBottom(topBox, box);
                });
            }
            prevRow = row;
        });
        return board;
    };
    BoardService.prototype.isBoundaryOwner = function (_a) {
        var left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        return left.boundary && right.boundary && top.boundary && bottom.boundary;
    };
    BoardService.prototype.getLine = function (board, row, box, line) {
        return board[row][box][line];
    };
    BoardService.INSTANCE = new BoardService();
    return BoardService;
}());
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map