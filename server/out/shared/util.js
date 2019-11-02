"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.copyObj = copyObj;
function sleep(millis) {
    return new Promise(function (resolve) { return setTimeout(resolve, millis); });
}
exports.sleep = sleep;
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays([new Date(Date.now()).toISOString()], args));
}
exports.log = log;
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
exports.random = random;
//# sourceMappingURL=util.js.map