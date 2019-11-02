"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_service_1 = require("../../dots-and-boxes/src/shared/board.service");
var util_1 = require("../../dots-and-boxes/src/shared/util");
function freeLines(box) {
    var free = [];
    var addIfFree = function (line) {
        if (!board_service_1.lineComplete(line)) {
            free.push(line);
        }
    };
    addIfFree(box.t);
    addIfFree(box.b);
    addIfFree(box.l);
    addIfFree(box.r);
    return free;
}
function findFreeLine(board, rand) {
    if (rand === void 0) { rand = function (max) { return util_1.random(0, max); }; }
    var lines = [];
    var best;
    board.find(function (row) { return row.find(function (box) {
        var free = freeLines(box);
        if (free.length === 1) {
            best = free[0];
            return true;
        }
        lines.push.apply(lines, free);
    }); });
    return best || lines[rand(lines.length)];
}
exports.findFreeLine = findFreeLine;
//# sourceMappingURL=bot.service.js.map