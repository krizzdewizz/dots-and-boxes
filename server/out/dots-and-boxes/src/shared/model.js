"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PLAYERS = 2;
var GameState;
(function (GameState) {
    GameState[GameState["WAITING_FOR_PLAYERS"] = 0] = "WAITING_FOR_PLAYERS";
    GameState[GameState["READY"] = 1] = "READY";
    GameState[GameState["PLAYING"] = 2] = "PLAYING";
    GameState[GameState["ENDED"] = 3] = "ENDED";
})(GameState = exports.GameState || (exports.GameState = {}));
//# sourceMappingURL=model.js.map