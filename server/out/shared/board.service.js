"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newBox() {
    return {
        t: {},
        l: {},
        b: {},
        r: {},
    };
}
exports.newBox = newBox;
function joinBoxesLeftRight(left, right) {
    if (!left) {
        return;
    }
    left.r = right.l;
}
function joinBoxesTopBottom(top, bottom) {
    top.b = bottom.t;
}
function lineComplete(line) {
    return Boolean(line.b) || line.o !== undefined;
}
exports.lineComplete = lineComplete;
function boxComplete(box) {
    return lineComplete(box.t)
        && lineComplete(box.l)
        && lineComplete(box.b)
        && lineComplete(box.r);
}
exports.boxComplete = boxComplete;
function newBoard(width, height) {
    if (height === void 0) { height = width; }
    var board = [];
    for (var row = 0; row < height; row++) {
        var r = [];
        for (var col = 0; col < width; col++) {
            var box = newBox();
            if (col === 0) {
                box.l.b = 1;
            }
            else if (col === width - 1) {
                box.r.b = 1;
            }
            if (row === 0) {
                box.t.b = 1;
            }
            else if (row === height - 1) {
                box.b.b = 1;
            }
            r.push(box);
        }
        board.push(r);
    }
    return this.joinBoxes(board);
}
exports.newBoard = newBoard;
function setBoxBoundaryOwner(board) {
    board.forEach(function (row) { return row
        .filter(isBoundaryOwner)
        .forEach(function (box) { return box.o = -1; }); });
}
function joinBoxes(board) {
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
    setBoxBoundaryOwner(board);
    return board;
}
exports.joinBoxes = joinBoxes;
function isBoundaryOwner(_a) {
    var l = _a.l, r = _a.r, t = _a.t, b = _a.b;
    return Boolean(l.b && r.b && t.b && b.b);
}
exports.isBoundaryOwner = isBoundaryOwner;
function getLine(board, row, box, line) {
    return board[row][box][line];
}
exports.getLine = getLine;
//# sourceMappingURL=board.service.js.map