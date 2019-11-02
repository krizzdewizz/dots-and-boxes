(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2>Dots and Boxes</h2>\r\n\r\n<router-outlet></router-outlet>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/board/board.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/board/board.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\" *ngFor=\"let row of board; let rowIndex = index; let lastRow = last\">\n    <div class=\"col\" *ngFor=\"let box of row; let boxIndex = index; let lastBox = last\">\n      <div *ngFor=\"let line of lines(box)\"\n        (click)=\"onClickLine(rowIndex, boxIndex, line.name)\"\n        [class]=\"line.class\"\n        [class.line]=\"true\"\n        [class.line-free]=\"line.o === undefined && !line.b\"\n        [class.boundary]=\"line.b\"\n        [class.player1]=\"line.o === 0\"\n        [class.player2]=\"line.o === 1\"></div>\n      <span *ngIf=\"box.o !== undefined\" [class.cross-player1]=\"box.o === 0\" [class.cross-player2]=\"box.o === 1\" class=\"cross\"></span>\n      <div class=\"dot\"></div>\n      <div *ngIf=\"lastRow\" class=\"dot dot-bottom\"></div>\n      <div *ngIf=\"lastBox\" class=\"dot dot-right\"></div>\n      <div *ngIf=\"lastRow && lastBox\" class=\"dot dot-right dot-bottom\"></div>\n      <div *ngIf=\"boundaryOwner(box)\" class=\"boundary-box\"></div>\n    </div>\n  </div>\n\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"title\">Chat</div>\n\n<div class=\"messages\">\n    <div class=\"message\" *ngFor=\"let msg of messages\">\n        <span>{{msg.sender}}:</span>{{msg.text}}\n    </div>\n</div>\n\n<div>\n    <form (submit)=\"send()\">\n        <input placeholder=\"Meldung\" maxlength=\"120\" name=\"text\" type=\"text\" [(ngModel)]=\"text\">\n        <button type=\"submit\">Senden</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/design/design.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/design/design.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"palette\">\r\n  <div *ngFor=\"let size of sizes\" (click)=\"newBoard(size)\">\r\n    {{size}} x {{size}}\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"content\">\r\n\r\n  <div class=\"tool\">\r\n    <div class=\"size-width\">\r\n      <button type=\"button\" (click)=\"sizeWidth(false)\">-</button>\r\n      <button type=\"button\" (click)=\"sizeWidth(true)\">+</button>\r\n    </div>\r\n    <div class=\"size-height\">\r\n      <button type=\"button\" (click)=\"sizeHeight(false)\">-</button>\r\n      <button type=\"button\" (click)=\"sizeHeight(true)\">+</button>\r\n    </div>\r\n  </div>\r\n\r\n  <dab-board [board]=\"board\" [design]=\"true\" (clickLine)=\"onClickLine($event)\"></dab-board>\r\n\r\n</div>\r\n<button type=\"button\" (click)=\"startGame()\">Neues Spiel</button>\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/game/game.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/game/game.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"game; else waitingForGame\">\r\n\r\n  <div [ngSwitch]=\"game.state\">\r\n    <div *ngSwitchCase=\"GameState.WAITING_FOR_PLAYERS\">\r\n\r\n      <ng-container *ngIf=\"!joined; else waitingForMorePlayers\">\r\n\r\n        <form (ngSubmit)=\"join()\">\r\n          <input placeholder=\"Name\" maxlength=\"15\" name=\"playerName\" [(ngModel)]=\"playerName\" type=\"text\">\r\n          <button type=\"submit\">Beitreten</button>\r\n          <div>{{ gameService.joinError | async }}</div>\r\n        </form>\r\n\r\n      </ng-container>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"GameState.READY\">\r\n      <button (click)=\"start()\">Start</button>\r\n      <div *ngIf=\"false; else score\"></div>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"GameState.PLAYING\">\r\n      <div *ngIf=\"false; else score\"></div>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"GameState.ENDED\">\r\n      <div *ngIf=\"false; else score\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <dab-board (clickLine)=\"onClickLine($event)\" [board]=\"game.board\" [disabled]=\"boardDisabled\"\r\n    [player0Turn]=\"playerTurn(0)\" [player1Turn]=\"playerTurn(1)\"></dab-board>\r\n\r\n  <button [routerLink]=\"['design']\">Neues Spiel</button>\r\n  <button (click)=\"restart()\">Neu beginnen</button>\r\n  <button (click)=\"addBot()\">Bot hinzufügen</button>\r\n  <button (click)=\"leave()\">Spiel verlassen</button>\r\n\r\n  <dab-chat *ngIf=\"joined\"></dab-chat>\r\n\r\n</ng-container>\r\n\r\n<ng-template #score>\r\n  <div class=\"score\">\r\n\r\n    <div class=\"score-card player-1\" [class.active]=\"playerActive(0)\">\r\n      <div>{{ game.players[0]?.name }}</div>\r\n      <span>{{ game.countBoxesOwnedBy[0] || 0 }}</span>\r\n      <img *ngIf=\"playerActive(0) && game.state === GameState.ENDED\" src=\"assets/images/pokal.png\">\r\n    </div>\r\n\r\n    <span class=\"versus\">vs</span>\r\n\r\n    <div class=\"score-card player-2\" [class.active]=\"playerActive(1)\">\r\n      <div>{{ game.players[1]?.name }}</div>\r\n      <span>{{ game.countBoxesOwnedBy[1] || 0 }}</span>\r\n      <img *ngIf=\"playerActive(1) && game.state === GameState.ENDED\" src=\"assets/images/pokal.png\">\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #waitingForGame>\r\n  <div>Verbinde zum game server...</div>\r\n</ng-template>\r\n\r\n<ng-template #waitingForMorePlayers>\r\n  <div>Warte auf noch mehr Spieler</div>\r\n</ng-template>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/game.component */ "./src/app/game/game.component.ts");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./design/design.component */ "./src/app/design/design.component.ts");





const routes = [
    {
        path: '',
        component: _game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"]
    },
    {
        path: 'design',
        component: _design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesignComponent"]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/game.service */ "./src/app/services/game.service.ts");



let AppComponent = class AppComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    ngOnInit() {
        this.gameService.init();
    }
};
AppComponent.ctorParameters = () => [
    { type: _services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dab-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _board_board_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board/board.component */ "./src/app/board/board.component.ts");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./design/design.component */ "./src/app/design/design.component.ts");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./game/game.component */ "./src/app/game/game.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/chat/chat.component.ts");










let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _board_board_component__WEBPACK_IMPORTED_MODULE_5__["BoardComponent"],
            _design_design_component__WEBPACK_IMPORTED_MODULE_6__["DesignComponent"],
            _game_game_component__WEBPACK_IMPORTED_MODULE_7__["GameComponent"],
            _chat_chat_component__WEBPACK_IMPORTED_MODULE_9__["ChatComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/board/board.component.scss":
/*!********************************************!*\
  !*** ./src/app/board/board.component.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  margin: 40px;\n  display: block;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n:host .dot {\n  width: calc(var(--box-line-size) * 2);\n  height: calc(var(--box-line-size) * 2);\n  border-radius: var(--box-line-size);\n  top: calc(-1 * var(--box-line-size) / 2);\n  left: calc(-1 * var(--box-line-size) / 2);\n  position: absolute;\n  background-color: gray;\n  z-index: 1;\n}\n:host .boundary-box {\n  background-color: gray;\n  opacity: 0.8;\n  width: calc(var(--box-size) - var(--box-line-size) * 2);\n  height: calc(var(--box-size) - var(--box-line-size) * 2);\n  top: var(--box-line-size);\n  left: var(--box-line-size);\n  position: absolute;\n  z-index: 1;\n}\n:host .dot-bottom {\n  top: calc(var(--box-size) - (var(--box-line-size) * 1.5));\n}\n:host .dot-right {\n  left: calc(var(--box-size) - (var(--box-line-size) * 1.5));\n}\n:host.current-player1 .line-free:hover {\n  background-color: red;\n  opacity: 0.4;\n}\n:host.current-player2 .line-free:hover {\n  background-color: blue;\n  opacity: 0.4;\n}\n:host.inactive .line {\n  cursor: initial;\n}\n:host .row {\n  display: -webkit-box;\n  display: flex;\n  height: var(--box-size);\n  margin-top: calc(-1 * var(--box-line-size));\n}\n:host .col {\n  width: var(--box-size);\n  position: relative;\n  margin-left: calc(-1 * var(--box-line-size));\n  display: -webkit-box;\n  display: flex;\n}\n:host .line {\n  position: absolute;\n  display: inline;\n  background-color: #f0f0f0;\n  cursor: pointer;\n}\n:host .line.boundary {\n  z-index: 1;\n}\n:host .top, :host .bottom {\n  height: var(--box-line-size);\n  width: var(--box-size);\n}\n:host .left, :host .right {\n  height: var(--box-size);\n  width: var(--box-line-size);\n}\n:host .bottom {\n  top: calc(var(--box-size) - var(--box-line-size));\n}\n:host .right {\n  left: calc(var(--box-size) - var(--box-line-size));\n}\n:host .cross {\n  position: absolute;\n  left: calc(var(--box-size) / 2 - (var(--box-line-size) / 2));\n}\n:host .cross::before, :host .cross::after {\n  display: block;\n  position: absolute;\n  width: var(--box-line-size);\n  height: var(--box-size);\n  content: \"\";\n  border-radius: var(--box-line-size);\n}\n:host .cross.cross-player1::before, :host .cross.cross-player1::after {\n  background-color: red;\n}\n:host .cross.cross-player2::before, :host .cross.cross-player2::after {\n  background-color: blue;\n}\n:host .cross::before {\n  -webkit-transform: rotate(45deg) scale(0.8);\n          transform: rotate(45deg) scale(0.8);\n}\n:host .cross::after {\n  -webkit-transform: rotate(-45deg) scale(0.8);\n          transform: rotate(-45deg) scale(0.8);\n}\n:host .boundary {\n  background-color: gray;\n}\n:host .player1 {\n  background-color: red;\n}\n:host .player2 {\n  background-color: blue;\n}\n:host .player1, :host .player2, :host .boundary {\n  cursor: initial;\n}\n:host.design .boundary {\n  cursor: pointer;\n}\n.hud {\n  display: -webkit-box;\n  display: flex;\n  font-size: 22px;\n  color: lightgray;\n  margin-bottom: 20px;\n}\n.hud > div {\n  padding: 10px;\n}\n.hud .hud-player > span {\n  color: black;\n}\n.hud .hud-player1 {\n  color: red;\n  font-weight: bold;\n}\n.hud .hud-player2 {\n  color: blue;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYm9hcmQvRDpcXGRhdGFcXGRvdHMtYW5kLWJveGVzXFxkb3RzLWFuZC1ib3hlcy9zcmNcXGFwcFxcYm9hcmRcXGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ib2FyZC9ib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYm9hcmQvRDpcXGRhdGFcXGRvdHMtYW5kLWJveGVzXFxkb3RzLWFuZC1ib3hlcy9zcmNcXHZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtFQUFBLHVCQUFBO0VBQUEsa0JBQUE7QUNISjtBREtJO0VBQ0kscUNBQUE7RUFDQSxzQ0FBQTtFQUNBLG1DQUFBO0VBQ0Esd0NBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FDSFI7QURNSTtFQUNJLHNCQW5CUztFQW9CVCxZQUFBO0VBRUEsdURBQUE7RUFDQSx3REFBQTtFQUNBLHlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUNMUjtBRFFJO0VBQ0kseURBQUE7QUNOUjtBRFNJO0VBQ0ksMERBQUE7QUNQUjtBRFdRO0VBQ0kscUJFMUNJO0VGMkNKLFlBQUE7QUNUWjtBRGNRO0VBQ0ksc0JFaERJO0VGaURKLFlBQUE7QUNaWjtBRGdCSTtFQUNJLGVBQUE7QUNkUjtBRGlCSTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsMkNBQUE7QUNmUjtBRGtCSTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0Q0FBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtBQ2hCUjtBRG1CSTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQ2pCUjtBRG1CUTtFQUNJLFVBQUE7QUNqQlo7QURxQkk7RUFDSSw0QkFBQTtFQUNBLHNCQUFBO0FDbkJSO0FEc0JJO0VBQ0ksdUJBQUE7RUFDQSwyQkFBQTtBQ3BCUjtBRHVCSTtFQUNJLGlEQUFBO0FDckJSO0FEd0JJO0VBQ0ksa0RBQUE7QUN0QlI7QUR5Qkk7RUFDSSxrQkFBQTtFQUNBLDREQUFBO0FDdkJSO0FEeUJRO0VBQ0ksY0FBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxtQ0FBQTtBQ3ZCWjtBRDRCZ0I7RUFDSSxxQkVwSEo7QUQwRmhCO0FEaUNnQjtFQUNJLHNCRTNISjtBRDRGaEI7QURvQ1E7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0FDbENSO0FEcUNRO0VBQ0EsNENBQUE7VUFBQSxvQ0FBQTtBQ25DUjtBRHVDSTtFQUNJLHNCQXpJUztBQ29HakI7QUR3Q0k7RUFDSSxxQkUvSVE7QUR5R2hCO0FEeUNJO0VBQ0ksc0JFbEpRO0FEMkdoQjtBRDBDSTtFQUNJLGVBQUE7QUN4Q1I7QUQyQ0k7RUFDSSxlQUFBO0FDekNSO0FENkNBO0VBQ0ssb0JBQUE7RUFBQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUMxQ0w7QUQyQ0s7RUFDSSxhQUFBO0FDekNUO0FENkNRO0VBQ0ksWUFBQTtBQzNDWjtBRCtDSTtFQUNJLFVFL0tRO0VGZ0xSLGlCQUFBO0FDN0NSO0FEZ0RJO0VBQ0ksV0VuTFE7RUZvTFIsaUJBQUE7QUM5Q1IiLCJmaWxlIjoic3JjL2FwcC9ib2FyZC9ib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uL3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcbiRib3VuZGFyeS1jb2xvcjogZ3JheTtcclxuXHJcbjpob3N0IHtcclxuICAgIG1hcmdpbjogNDBweDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG5cclxuICAgIC5kb3Qge1xyXG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWJveC1saW5lLXNpemUpICogMik7XHJcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWJveC1saW5lLXNpemUpICogMik7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tYm94LWxpbmUtc2l6ZSk7XHJcbiAgICAgICAgdG9wOiBjYWxjKC0xICogdmFyKC0tYm94LWxpbmUtc2l6ZSkgLyAyKTtcclxuICAgICAgICBsZWZ0OiBjYWxjKC0xICogdmFyKC0tYm94LWxpbmUtc2l6ZSkgLyAyKTtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxuICAgICAgICB6LWluZGV4OiAxO1xyXG4gICAgfVxyXG5cclxuICAgIC5ib3VuZGFyeS1ib3gge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRib3VuZGFyeS1jb2xvcjtcclxuICAgICAgICBvcGFjaXR5OiAwLjg7XHJcblxyXG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWJveC1zaXplKSAtIHZhcigtLWJveC1saW5lLXNpemUpICogMik7XHJcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWJveC1zaXplKSAtIHZhcigtLWJveC1saW5lLXNpemUpICogMik7XHJcbiAgICAgICAgdG9wOiB2YXIoLS1ib3gtbGluZS1zaXplKTtcclxuICAgICAgICBsZWZ0OiB2YXIoLS1ib3gtbGluZS1zaXplKTtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogMTtcclxuICAgIH1cclxuXHJcbiAgICAuZG90LWJvdHRvbSB7XHJcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWJveC1zaXplKSAtICh2YXIoLS1ib3gtbGluZS1zaXplKSAqIDEuNSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC5kb3QtcmlnaHQge1xyXG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYm94LXNpemUpIC0gKHZhcigtLWJveC1saW5lLXNpemUpICogMS41KSk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jdXJyZW50LXBsYXllcjEge1xyXG4gICAgICAgIC5saW5lLWZyZWU6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGxheWVyMS1jb2xvcjtcclxuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAmLmN1cnJlbnQtcGxheWVyMiB7XHJcbiAgICAgICAgLmxpbmUtZnJlZTpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwbGF5ZXIyLWNvbG9yO1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYuaW5hY3RpdmUgLmxpbmUge1xyXG4gICAgICAgIGN1cnNvcjogaW5pdGlhbDtcclxuICAgIH1cclxuXHJcbiAgICAucm93IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGhlaWdodDogdmFyKC0tYm94LXNpemUpO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IGNhbGMoLTEgKiB2YXIoLS1ib3gtbGluZS1zaXplKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbCB7XHJcbiAgICAgICAgd2lkdGg6IHZhcigtLWJveC1zaXplKTtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGNhbGMoLTEgKiB2YXIoLS1ib3gtbGluZS1zaXplKSk7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuXHJcbiAgICAubGluZSB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgICAgICAgJi5ib3VuZGFyeSB7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC50b3AsIC5ib3R0b20ge1xyXG4gICAgICAgIGhlaWdodDogdmFyKC0tYm94LWxpbmUtc2l6ZSk7XHJcbiAgICAgICAgd2lkdGg6IHZhcigtLWJveC1zaXplKTtcclxuICAgIH1cclxuXHJcbiAgICAubGVmdCwgLnJpZ2h0IHtcclxuICAgICAgICBoZWlnaHQ6IHZhcigtLWJveC1zaXplKTtcclxuICAgICAgICB3aWR0aDogdmFyKC0tYm94LWxpbmUtc2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLmJvdHRvbSB7XHJcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWJveC1zaXplKSAtIHZhcigtLWJveC1saW5lLXNpemUpKTtcclxuICAgIH1cclxuXHJcbiAgICAucmlnaHQge1xyXG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYm94LXNpemUpIC0gdmFyKC0tYm94LWxpbmUtc2l6ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC5jcm9zcyB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYm94LXNpemUpIC8gMiAtICh2YXIoLS1ib3gtbGluZS1zaXplKSAvIDIpKTtcclxuXHJcbiAgICAgICAgJjo6YmVmb3JlLCAmOjphZnRlciB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHdpZHRoOiB2YXIoLS1ib3gtbGluZS1zaXplKTtcclxuICAgICAgICAgICAgaGVpZ2h0OiB2YXIoLS1ib3gtc2l6ZSk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJveC1saW5lLXNpemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5jcm9zcy1wbGF5ZXIxIHtcclxuICAgICAgICAgICAgJiB7XHJcbiAgICAgICAgICAgICAgICAmOjpiZWZvcmUsICY6OmFmdGVyIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGxheWVyMS1jb2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5jcm9zcy1wbGF5ZXIyIHtcclxuICAgICAgICAgICAgJiB7XHJcbiAgICAgICAgICAgICAgICAmOjpiZWZvcmUsICY6OmFmdGVyIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGxheWVyMi1jb2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJjo6YmVmb3JlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZykgc2NhbGUoMC44KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICY6OmFmdGVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpIHNjYWxlKDAuOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5ib3VuZGFyeSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJvdW5kYXJ5LWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC5wbGF5ZXIxIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGxheWVyMS1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAucGxheWVyMiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHBsYXllcjItY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLnBsYXllcjEsIC5wbGF5ZXIyLCAuYm91bmRhcnkge1xyXG4gICAgICAgIGN1cnNvcjogaW5pdGlhbDtcclxuICAgIH1cclxuXHJcbiAgICAmLmRlc2lnbiAuYm91bmRhcnkge1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLmh1ZCB7XHJcbiAgICAgZGlzcGxheTogZmxleDtcclxuICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgY29sb3I6IGxpZ2h0Z3JheTtcclxuICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICYgPiBkaXYge1xyXG4gICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgIH1cclxuXHJcbiAgICAuaHVkLXBsYXllciB7XHJcbiAgICAgICAgJiA+IHNwYW4ge1xyXG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5odWQtcGxheWVyMSB7XHJcbiAgICAgICAgY29sb3I6ICRwbGF5ZXIxLWNvbG9yO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG5cclxuICAgIC5odWQtcGxheWVyMiB7XHJcbiAgICAgICAgY29sb3I6ICRwbGF5ZXIyLWNvbG9yO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG4gfSIsIjpob3N0IHtcbiAgbWFyZ2luOiA0MHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuOmhvc3QgLmRvdCB7XG4gIHdpZHRoOiBjYWxjKHZhcigtLWJveC1saW5lLXNpemUpICogMik7XG4gIGhlaWdodDogY2FsYyh2YXIoLS1ib3gtbGluZS1zaXplKSAqIDIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1ib3gtbGluZS1zaXplKTtcbiAgdG9wOiBjYWxjKC0xICogdmFyKC0tYm94LWxpbmUtc2l6ZSkgLyAyKTtcbiAgbGVmdDogY2FsYygtMSAqIHZhcigtLWJveC1saW5lLXNpemUpIC8gMik7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgei1pbmRleDogMTtcbn1cbjpob3N0IC5ib3VuZGFyeS1ib3gge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICBvcGFjaXR5OiAwLjg7XG4gIHdpZHRoOiBjYWxjKHZhcigtLWJveC1zaXplKSAtIHZhcigtLWJveC1saW5lLXNpemUpICogMik7XG4gIGhlaWdodDogY2FsYyh2YXIoLS1ib3gtc2l6ZSkgLSB2YXIoLS1ib3gtbGluZS1zaXplKSAqIDIpO1xuICB0b3A6IHZhcigtLWJveC1saW5lLXNpemUpO1xuICBsZWZ0OiB2YXIoLS1ib3gtbGluZS1zaXplKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xufVxuOmhvc3QgLmRvdC1ib3R0b20ge1xuICB0b3A6IGNhbGModmFyKC0tYm94LXNpemUpIC0gKHZhcigtLWJveC1saW5lLXNpemUpICogMS41KSk7XG59XG46aG9zdCAuZG90LXJpZ2h0IHtcbiAgbGVmdDogY2FsYyh2YXIoLS1ib3gtc2l6ZSkgLSAodmFyKC0tYm94LWxpbmUtc2l6ZSkgKiAxLjUpKTtcbn1cbjpob3N0LmN1cnJlbnQtcGxheWVyMSAubGluZS1mcmVlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICBvcGFjaXR5OiAwLjQ7XG59XG46aG9zdC5jdXJyZW50LXBsYXllcjIgLmxpbmUtZnJlZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG4gIG9wYWNpdHk6IDAuNDtcbn1cbjpob3N0LmluYWN0aXZlIC5saW5lIHtcbiAgY3Vyc29yOiBpbml0aWFsO1xufVxuOmhvc3QgLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogdmFyKC0tYm94LXNpemUpO1xuICBtYXJnaW4tdG9wOiBjYWxjKC0xICogdmFyKC0tYm94LWxpbmUtc2l6ZSkpO1xufVxuOmhvc3QgLmNvbCB7XG4gIHdpZHRoOiB2YXIoLS1ib3gtc2l6ZSk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoLTEgKiB2YXIoLS1ib3gtbGluZS1zaXplKSk7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG46aG9zdCAubGluZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogaW5saW5lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG46aG9zdCAubGluZS5ib3VuZGFyeSB7XG4gIHotaW5kZXg6IDE7XG59XG46aG9zdCAudG9wLCA6aG9zdCAuYm90dG9tIHtcbiAgaGVpZ2h0OiB2YXIoLS1ib3gtbGluZS1zaXplKTtcbiAgd2lkdGg6IHZhcigtLWJveC1zaXplKTtcbn1cbjpob3N0IC5sZWZ0LCA6aG9zdCAucmlnaHQge1xuICBoZWlnaHQ6IHZhcigtLWJveC1zaXplKTtcbiAgd2lkdGg6IHZhcigtLWJveC1saW5lLXNpemUpO1xufVxuOmhvc3QgLmJvdHRvbSB7XG4gIHRvcDogY2FsYyh2YXIoLS1ib3gtc2l6ZSkgLSB2YXIoLS1ib3gtbGluZS1zaXplKSk7XG59XG46aG9zdCAucmlnaHQge1xuICBsZWZ0OiBjYWxjKHZhcigtLWJveC1zaXplKSAtIHZhcigtLWJveC1saW5lLXNpemUpKTtcbn1cbjpob3N0IC5jcm9zcyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogY2FsYyh2YXIoLS1ib3gtc2l6ZSkgLyAyIC0gKHZhcigtLWJveC1saW5lLXNpemUpIC8gMikpO1xufVxuOmhvc3QgLmNyb3NzOjpiZWZvcmUsIDpob3N0IC5jcm9zczo6YWZ0ZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogdmFyKC0tYm94LWxpbmUtc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tYm94LXNpemUpO1xuICBjb250ZW50OiBcIlwiO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1ib3gtbGluZS1zaXplKTtcbn1cbjpob3N0IC5jcm9zcy5jcm9zcy1wbGF5ZXIxOjpiZWZvcmUsIDpob3N0IC5jcm9zcy5jcm9zcy1wbGF5ZXIxOjphZnRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cbjpob3N0IC5jcm9zcy5jcm9zcy1wbGF5ZXIyOjpiZWZvcmUsIDpob3N0IC5jcm9zcy5jcm9zcy1wbGF5ZXIyOjphZnRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG46aG9zdCAuY3Jvc3M6OmJlZm9yZSB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKSBzY2FsZSgwLjgpO1xufVxuOmhvc3QgLmNyb3NzOjphZnRlciB7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgc2NhbGUoMC44KTtcbn1cbjpob3N0IC5ib3VuZGFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG59XG46aG9zdCAucGxheWVyMSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cbjpob3N0IC5wbGF5ZXIyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbn1cbjpob3N0IC5wbGF5ZXIxLCA6aG9zdCAucGxheWVyMiwgOmhvc3QgLmJvdW5kYXJ5IHtcbiAgY3Vyc29yOiBpbml0aWFsO1xufVxuOmhvc3QuZGVzaWduIC5ib3VuZGFyeSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmh1ZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgY29sb3I6IGxpZ2h0Z3JheTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cbi5odWQgPiBkaXYge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLmh1ZCAuaHVkLXBsYXllciA+IHNwYW4ge1xuICBjb2xvcjogYmxhY2s7XG59XG4uaHVkIC5odWQtcGxheWVyMSB7XG4gIGNvbG9yOiByZWQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmh1ZCAuaHVkLXBsYXllcjIge1xuICBjb2xvcjogYmx1ZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59IiwiJHBsYXllcjEtY29sb3I6IHJlZDtcclxuJHBsYXllcjItY29sb3I6IGJsdWU7XHJcbiJdfQ== */");

/***/ }),

/***/ "./src/app/board/board.component.ts":
/*!******************************************!*\
  !*** ./src/app/board/board.component.ts ***!
  \******************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _shared_board_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/board.service */ "./src/shared/board.service.ts");




let BoardComponent = class BoardComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.disabled = false;
        this.player0Turn = false;
        this.player1Turn = false;
        this.clickLine = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    get currentPlayer1Class() {
        return this.player0Turn;
    }
    get currentPlayer2Class() {
        return this.player1Turn;
    }
    get notMyTurnClass() {
        return !this.design && this.disabled;
    }
    get styleAttr() {
        // const boxSize = 50;
        // const boxLineSize = 8;
        const boxSize = 80;
        const boxLineSize = 12;
        // const boxSize = 150;
        // const boxLineSize = 16;
        return this.sanitizer.bypassSecurityTrustStyle(`--box-size: ${boxSize}px; --box-line-size: ${boxLineSize}px;`);
    }
    lines(box) {
        return [
            Object.assign({ name: 't', class: 'top' }, box.t),
            Object.assign({ name: 'l', class: 'left' }, box.l),
            Object.assign({ name: 'b', class: 'bottom' }, box.b),
            Object.assign({ name: 'r', class: 'right' }, box.r)
        ];
    }
    onClickLine(row, box, line) {
        if (this.disabled) {
            return;
        }
        this.clickLine.emit({ row, box, line });
    }
    boundaryOwner(box) {
        return _shared_board_service__WEBPACK_IMPORTED_MODULE_3__["isBoundaryOwner"](box);
    }
};
BoardComponent.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.current-player1')
], BoardComponent.prototype, "currentPlayer1Class", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.current-player2')
], BoardComponent.prototype, "currentPlayer2Class", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.inactive')
], BoardComponent.prototype, "notMyTurnClass", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('attr.style')
], BoardComponent.prototype, "styleAttr", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BoardComponent.prototype, "board", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.design'), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BoardComponent.prototype, "design", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BoardComponent.prototype, "disabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BoardComponent.prototype, "player0Turn", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], BoardComponent.prototype, "player1Turn", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], BoardComponent.prototype, "clickLine", void 0);
BoardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dab-board',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./board.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/board/board.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./board.component.scss */ "./src/app/board/board.component.scss")).default]
    })
], BoardComponent);



/***/ }),

/***/ "./src/app/chat/chat.component.scss":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  height: 290px;\n  width: 250px;\n  padding: 5px;\n  overflow: auto;\n  white-space: nowrap;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n:host .title {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n:host .messages {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n:host .message {\n  padding: 2px;\n}\n:host .message span {\n  color: lightgray;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhdC9EOlxcZGF0YVxcZG90cy1hbmQtYm94ZXNcXGRvdHMtYW5kLWJveGVzL3NyY1xcYXBwXFxjaGF0XFxjaGF0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUNDSjtBRENJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQ0NSO0FERUk7RUFDSSxtQkFBQTtVQUFBLE9BQUE7QUNBUjtBREdJO0VBQ0ksWUFBQTtBQ0RSO0FERVE7RUFDSSxnQkFBQTtFQUNBLGlCQUFBO0FDQVoiLCJmaWxlIjoic3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDIwcHg7XHJcbiAgICByaWdodDogMjBweDtcclxuICAgIGhlaWdodDogMjkwcHg7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAudGl0bGUge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiA1cHg7XHJcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICAgIH1cclxuXHJcbiAgICAubWVzc2FnZXMge1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLm1lc3NhZ2Uge1xyXG4gICAgICAgIHBhZGRpbmc6IDJweDtcclxuICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgY29sb3I6IGxpZ2h0Z3JheTtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIjpob3N0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDIwcHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBoZWlnaHQ6IDI5MHB4O1xuICB3aWR0aDogMjUwcHg7XG4gIHBhZGRpbmc6IDVweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG46aG9zdCAudGl0bGUge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuOmhvc3QgLm1lc3NhZ2VzIHtcbiAgZmxleDogMTtcbn1cbjpob3N0IC5tZXNzYWdlIHtcbiAgcGFkZGluZzogMnB4O1xufVxuOmhvc3QgLm1lc3NhZ2Ugc3BhbiB7XG4gIGNvbG9yOiBsaWdodGdyYXk7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/game.service */ "./src/app/services/game.service.ts");



let ChatComponent = class ChatComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    get messages() {
        return this.gameService.chatMessages;
    }
    send() {
        const { text } = this;
        if (text) {
            this.gameService.chat(this.text);
        }
    }
};
ChatComponent.ctorParameters = () => [
    { type: _services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }
];
ChatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dab-chat',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat.component.scss */ "./src/app/chat/chat.component.scss")).default]
    })
], ChatComponent);



/***/ }),

/***/ "./src/app/design/design.component.scss":
/*!**********************************************!*\
  !*** ./src/app/design/design.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host .tool {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n:host .tool button {\n  width: 30px;\n  height: 30px;\n  font-size: 14pt;\n  margin: 2px;\n}\n:host .size-height {\n  margin-top: 50px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n:host .palette {\n  display: -webkit-box;\n  display: flex;\n  font-size: 22pt;\n  padding: 10px;\n}\n:host .palette div {\n  padding: 5px;\n  margin: 5px;\n  width: 80px;\n  height: 80px;\n  white-space: nowrap;\n  border: 1px solid lightgray;\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  cursor: pointer;\n  outline: 1px solid transparent;\n}\n:host .palette div:hover {\n  border-color: gray;\n  outline: 1px solid gray;\n}\n:host .content {\n  display: -webkit-box;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVzaWduL0Q6XFxkYXRhXFxkb3RzLWFuZC1ib3hlc1xcZG90cy1hbmQtYm94ZXMvc3JjXFxhcHBcXGRlc2lnblxcZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9kZXNpZ24vZGVzaWduLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FDQVI7QURFUTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUNBWjtBRElJO0VBQ0ksZ0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUNGUjtBREtJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBRUEsZUFBQTtFQUNBLGFBQUE7QUNKUjtBRE1RO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7QUNKWjtBRE1ZO0VBQ0ksa0JBQUE7RUFDQSx1QkFBQTtBQ0poQjtBRFNJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0FDUFIiLCJmaWxlIjoic3JjL2FwcC9kZXNpZ24vZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgLnRvb2wge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAgICAgYnV0dG9uIHtcclxuICAgICAgICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB0O1xyXG4gICAgICAgICAgICBtYXJnaW46IDJweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnNpemUtaGVpZ2h0IHtcclxuICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIH1cclxuXHJcbiAgICAucGFsZXR0ZSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuXHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB0O1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcblxyXG4gICAgICAgIGRpdiB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcclxuICAgICAgICAgICAgbWFyZ2luOiA1cHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcblxyXG4gICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogZ3JheTtcclxuICAgICAgICAgICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCBncmF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5jb250ZW50IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgfVxyXG5cclxufSIsIjpob3N0IC50b29sIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbjpob3N0IC50b29sIGJ1dHRvbiB7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGZvbnQtc2l6ZTogMTRwdDtcbiAgbWFyZ2luOiAycHg7XG59XG46aG9zdCAuc2l6ZS1oZWlnaHQge1xuICBtYXJnaW4tdG9wOiA1MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuOmhvc3QgLnBhbGV0dGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6IDIycHQ7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG46aG9zdCAucGFsZXR0ZSBkaXYge1xuICBwYWRkaW5nOiA1cHg7XG4gIG1hcmdpbjogNXB4O1xuICB3aWR0aDogODBweDtcbiAgaGVpZ2h0OiA4MHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xufVxuOmhvc3QgLnBhbGV0dGUgZGl2OmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiBncmF5O1xuICBvdXRsaW5lOiAxcHggc29saWQgZ3JheTtcbn1cbjpob3N0IC5jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/design/design.component.ts":
/*!********************************************!*\
  !*** ./src/app/design/design.component.ts ***!
  \********************************************/
/*! exports provided: DesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignComponent", function() { return DesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_board_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/board.service */ "./src/shared/board.service.ts");
/* harmony import */ var _services_design_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/design.service */ "./src/app/services/design.service.ts");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/game.service */ "./src/app/services/game.service.ts");
/* harmony import */ var _shared_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/util */ "./src/shared/util.ts");







let DesignComponent = class DesignComponent {
    constructor(designService, router, gameService) {
        this.designService = designService;
        this.router = router;
        this.gameService = gameService;
        this.sizes = [3, 4, 5, 8];
    }
    get board() {
        return this.designService.board;
    }
    onClickLine({ row, box, line }) {
        const lineObj = _shared_board_service__WEBPACK_IMPORTED_MODULE_3__["getLine"](this.board, row, box, line);
        lineObj.b = lineObj.b ? 0 : 1; // invert
        this.designService.saveBoard();
    }
    newBoard(size) {
        this.designService.board = _shared_board_service__WEBPACK_IMPORTED_MODULE_3__["newBoard"](size);
        this.designService.saveBoard();
    }
    sizeWidth(incr) {
        this.designService.sizeWidth(incr);
        this.designService.saveBoard();
    }
    sizeHeight(incr) {
        this.designService.sizeHeight(incr);
        this.designService.saveBoard();
    }
    startGame() {
        this.gameService.nextBoard = Object(_shared_util__WEBPACK_IMPORTED_MODULE_6__["copyObj"])(this.board);
        this.router.navigate(['']);
    }
};
DesignComponent.ctorParameters = () => [
    { type: _services_design_service__WEBPACK_IMPORTED_MODULE_4__["DesignService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_game_service__WEBPACK_IMPORTED_MODULE_5__["GameService"] }
];
DesignComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dab-design',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./design.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/design/design.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./design.component.scss */ "./src/app/design/design.component.scss")).default]
    })
], DesignComponent);



/***/ }),

/***/ "./src/app/game/game.component.scss":
/*!******************************************!*\
  !*** ./src/app/game/game.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host .score {\n  display: -webkit-box;\n  display: flex;\n  width: 200px;\n  padding: 15px;\n}\n:host .score img {\n  margin-top: 10px;\n  width: 40px;\n}\n:host .score .versus {\n  margin-top: 18%;\n}\n:host .score-card {\n  padding: 30px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  white-space: nowrap;\n}\n:host .score-card span {\n  margin-top: 10px;\n}\n:host .score-card.active {\n  -webkit-transform: scale(1.3, 1.3);\n          transform: scale(1.3, 1.3);\n}\n:host .score-card.player-1 {\n  color: red;\n}\n:host .score-card.player-2 {\n  color: blue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZS9EOlxcZGF0YVxcZG90cy1hbmQtYm94ZXNcXGRvdHMtYW5kLWJveGVzL3NyY1xcYXBwXFxnYW1lXFxnYW1lLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9nYW1lL2dhbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2dhbWUvRDpcXGRhdGFcXGRvdHMtYW5kLWJveGVzXFxkb3RzLWFuZC1ib3hlcy9zcmNcXHZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNIUjtBREtRO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0FDSFo7QURNUTtFQUNJLGVBQUE7QUNKWjtBRFFJO0VBQ0ksYUFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxtQkFBQTtBQ05SO0FEUVE7RUFDSSxnQkFBQTtBQ05aO0FEU1E7RUFDSSxrQ0FBQTtVQUFBLDBCQUFBO0FDUFo7QURVUTtFQUNJLFVFbkNJO0FEMkJoQjtBRFdRO0VBQ0ksV0V0Q0k7QUQ2QmhCIiwiZmlsZSI6InNyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vdmFyaWFibGVzLnNjc3MnO1xyXG5cclxuOmhvc3Qge1xyXG5cclxuICAgIC5zY29yZSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICB3aWR0aDogMjAwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTVweDtcclxuXHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudmVyc3VzIHtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTglO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuc2NvcmUtY2FyZCB7XHJcbiAgICAgICAgcGFkZGluZzogMzBweDtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cclxuICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuYWN0aXZlIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjMsIDEuMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnBsYXllci0xIHtcclxuICAgICAgICAgICAgY29sb3I6ICRwbGF5ZXIxLWNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5wbGF5ZXItMiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkcGxheWVyMi1jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiOmhvc3QgLnNjb3JlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAxNXB4O1xufVxuOmhvc3QgLnNjb3JlIGltZyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHdpZHRoOiA0MHB4O1xufVxuOmhvc3QgLnNjb3JlIC52ZXJzdXMge1xuICBtYXJnaW4tdG9wOiAxOCU7XG59XG46aG9zdCAuc2NvcmUtY2FyZCB7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG46aG9zdCAuc2NvcmUtY2FyZCBzcGFuIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbjpob3N0IC5zY29yZS1jYXJkLmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4zLCAxLjMpO1xufVxuOmhvc3QgLnNjb3JlLWNhcmQucGxheWVyLTEge1xuICBjb2xvcjogcmVkO1xufVxuOmhvc3QgLnNjb3JlLWNhcmQucGxheWVyLTIge1xuICBjb2xvcjogYmx1ZTtcbn0iLCIkcGxheWVyMS1jb2xvcjogcmVkO1xyXG4kcGxheWVyMi1jb2xvcjogYmx1ZTtcclxuIl19 */");

/***/ }),

/***/ "./src/app/game/game.component.ts":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/model */ "./src/shared/model.ts");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/game.service */ "./src/app/services/game.service.ts");




let GameComponent = class GameComponent {
    constructor(gameService) {
        this.gameService = gameService;
        this.GameState = _shared_model__WEBPACK_IMPORTED_MODULE_2__["GameState"];
    }
    ngOnInit() {
        this.gameService.sendNextBoard();
    }
    get game() {
        return this.gameService.game;
    }
    get joined() {
        return Boolean(this.gameService.playerId);
    }
    get currentPlayer() {
        return this.game ? this.game.currentPlayer : undefined;
    }
    onClickLine({ row, box, line }) {
        this.gameService.click(row, box, line);
    }
    get boardDisabled() {
        return !this.gameService.isMyTurn;
    }
    playerTurn(index) {
        return this.gameService.isPlayerTurn(index);
    }
    playerActive(index) {
        const { game } = this;
        if (game.state === _shared_model__WEBPACK_IMPORTED_MODULE_2__["GameState"].ENDED) {
            return game.winners.includes(index);
        }
        return game.currentPlayer === index;
    }
    join() {
        const { playerName: name } = this;
        if (name) {
            this.gameService.join({ name });
        }
    }
    leave() {
        this.gameService.leave();
    }
    restart() {
        this.gameService.restart();
    }
    start() {
        this.gameService.start();
    }
    addBot() {
        this.gameService.addBot();
    }
};
GameComponent.ctorParameters = () => [
    { type: _services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"] }
];
GameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dab-game',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./game.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/game/game.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./game.component.scss */ "./src/app/game/game.component.scss")).default]
    })
], GameComponent);



/***/ }),

/***/ "./src/app/services/design.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/design.service.ts ***!
  \********************************************/
/*! exports provided: DesignService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignService", function() { return DesignService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_board_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/board.service */ "./src/shared/board.service.ts");



const BOARD_KEY = 'dab-design-board';
const MAX_BOARD_SIZE = 15;
const MIN_BOARD_SIZE = 3;
let DesignService = class DesignService {
    get board() {
        if (this.$board) {
            return this.$board;
        }
        const boardString = localStorage.getItem(BOARD_KEY);
        if (boardString) {
            this.$board = _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["joinBoxes"](JSON.parse(boardString));
        }
        else {
            this.$board = _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["newBoard"](4);
        }
        return this.$board;
    }
    set board(board) {
        this.$board = board;
        this.saveBoard();
    }
    saveBoard() {
        localStorage.setItem(BOARD_KEY, JSON.stringify(this.board));
    }
    newBoard(size) {
        localStorage.removeItem(BOARD_KEY);
        this.$board = _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["newBoard"](size);
    }
    sizeWidth(incr) {
        const { board } = this;
        const firstRow = board[0];
        const amount = incr ? 1 : -1;
        const newWidth = firstRow.length + amount;
        if (newWidth < MIN_BOARD_SIZE || newWidth > MAX_BOARD_SIZE) {
            return;
        }
        if (incr) {
            board.forEach((row, rowIndex) => {
                const box = _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["newBox"]();
                box.r.b = 1;
                if (rowIndex === 0) {
                    box.t.b = 1;
                }
                else if (rowIndex === board.length - 1) {
                    box.b.b = 1;
                }
                row.push(box);
            });
            _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["joinBoxes"](board);
        }
        else {
            board.forEach(row => {
                row.splice(row.length - 1, 1);
                const box = row[row.length - 1];
                box.r.b = 1;
            });
        }
    }
    sizeHeight(incr) {
        const { board } = this;
        const firstRow = board[0];
        const amount = incr ? 1 : -1;
        const newHeight = this.board.length + amount;
        if (newHeight < MIN_BOARD_SIZE || newHeight > MAX_BOARD_SIZE) {
            return;
        }
        const width = firstRow.length;
        if (incr) {
            const row = [];
            for (let i = 0; i < width; i++) {
                const box = _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["newBox"]();
                box.b.b = 1;
                if (i === 0) {
                    box.l.b = 1;
                }
                else if (i === width - 1) {
                    box.r.b = 1;
                }
                row.push(box);
            }
            board.push(row);
            _shared_board_service__WEBPACK_IMPORTED_MODULE_2__["joinBoxes"](board);
        }
        else {
            board.splice(board.length - 1, 1);
            const row = board[board.length - 1];
            row.forEach(box => box.b.b = 1);
        }
    }
};
DesignService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DesignService);



/***/ }),

/***/ "./src/app/services/game.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/game.service.ts ***!
  \******************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/model */ "./src/shared/model.ts");
/* harmony import */ var _shared_board_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/board.service */ "./src/shared/board.service.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






const LAST_PLAYER_ID_KEY = 'dab-player-id';
let GameService = class GameService {
    constructor() {
        this.chatMessages = [];
        this.joinError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    sendNextBoard() {
        const { nextBoard: board } = this;
        if (!board) {
            return;
        }
        this.send({ type: 'newBoard', board });
        delete this.nextBoard;
    }
    chat(text) {
        this.send({ type: 'chat', message: { sender: this.playerName, text } });
    }
    init() {
        window.q = this;
        this.lastPlayerId = Number(localStorage.getItem(LAST_PLAYER_ID_KEY));
        this.ws = socket_io_client__WEBPACK_IMPORTED_MODULE_4__(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].socketUrl);
        this.ws.on('dab-message', (msg) => {
            switch (msg.type) {
                case 'game':
                    this.game = msg.game;
                    this.findPlayerInGame();
                    break;
                case 'joined':
                    this.playerId = this.lastPlayerId = msg.playerId;
                    localStorage.setItem(LAST_PLAYER_ID_KEY, String(this.lastPlayerId));
                    break;
                case 'join-error':
                    this.joinError.emit(msg.error);
                    setTimeout(() => this.joinError.emit(), 3000);
                    break;
                case 'chat':
                    if (this.hasJoined) {
                        this.addChatMessage(msg.message);
                    }
                    break;
            }
        });
        this.ws.on('disconnect', () => {
            this.reset();
        });
    }
    addChatMessage(message) {
        const { chatMessages } = this;
        chatMessages.push(message);
        if (chatMessages.length > 10) {
            chatMessages.shift();
        }
    }
    findPlayerInGame() {
        const { game, lastPlayerId } = this;
        if (!lastPlayerId) {
            return;
        }
        if (game.players.some(player => player.id === lastPlayerId)) {
            this.playerId = lastPlayerId;
        }
    }
    get playerName() {
        const pl = this.game.players.find(player => player.id === this.playerId);
        return pl ? pl.name : '?';
    }
    get hasJoined() {
        return !!this.playerId;
    }
    restart() {
        this.send({ type: 'restartGame' });
    }
    click(row, box, line) {
        const lineObj = _shared_board_service__WEBPACK_IMPORTED_MODULE_3__["getLine"](this.game.board, row, box, line);
        if (_shared_board_service__WEBPACK_IMPORTED_MODULE_3__["lineComplete"](lineObj)) {
            return;
        }
        this.send({
            type: 'clickLine',
            playerId: this.playerId,
            row, box, line
        });
    }
    join(player) {
        this.joinError.emit();
        this.send({ type: 'join', player });
    }
    leave() {
        this.send({ type: 'leave', playerId: this.playerId });
        this.reset();
    }
    start() {
        this.send({ type: 'startGame' });
    }
    reset() {
        delete this.playerId;
        delete this.lastPlayerId;
        delete this.game;
        this.chatMessages = [];
        localStorage.removeItem(LAST_PLAYER_ID_KEY);
    }
    send(data) {
        this.ws.emit('dab-message', data);
    }
    get currentPlayer() {
        const { game } = this;
        if (!game || game.state !== _shared_model__WEBPACK_IMPORTED_MODULE_2__["GameState"].PLAYING) {
            return undefined;
        }
        return game.players[game.currentPlayer];
    }
    get isMyTurn() {
        const currPlayer = this.currentPlayer;
        return currPlayer && currPlayer.id === this.playerId;
    }
    isPlayerTurn(player) {
        return this.isMyTurn && this.game.currentPlayer === player;
    }
    addBot() {
        const { game } = this;
        if (game.players.length === _shared_model__WEBPACK_IMPORTED_MODULE_2__["MAX_PLAYERS"]) {
            return;
        }
        this.send({ type: 'addBot' });
    }
};
GameService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GameService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    socketUrl: 'http://localhost:8999'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/shared/board.service.ts":
/*!*************************************!*\
  !*** ./src/shared/board.service.ts ***!
  \*************************************/
/*! exports provided: newBox, lineComplete, boxComplete, newBoard, joinBoxes, isBoundaryOwner, getLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newBox", function() { return newBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineComplete", function() { return lineComplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxComplete", function() { return boxComplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newBoard", function() { return newBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinBoxes", function() { return joinBoxes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoundaryOwner", function() { return isBoundaryOwner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLine", function() { return getLine; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function newBox() {
    return {
        t: {},
        l: {},
        b: {},
        r: {},
    };
}
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
function boxComplete(box) {
    return lineComplete(box.t)
        && lineComplete(box.l)
        && lineComplete(box.b)
        && lineComplete(box.r);
}
function newBoard(width, height = width) {
    const board = [];
    for (let row = 0; row < height; row++) {
        const r = [];
        for (let col = 0; col < width; col++) {
            const box = newBox();
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
function setBoxBoundaryOwner(board) {
    board.forEach(row => row
        .filter(isBoundaryOwner)
        .forEach(box => box.o = -1));
}
function joinBoxes(board) {
    let prevRow;
    board.forEach(row => {
        let prevBox;
        row.forEach(box => {
            joinBoxesLeftRight(prevBox, box);
            prevBox = box;
        });
        if (prevRow) {
            prevRow.forEach((topBox, colIndex) => {
                const box = row[colIndex];
                joinBoxesTopBottom(topBox, box);
            });
        }
        prevRow = row;
    });
    setBoxBoundaryOwner(board);
    return board;
}
function isBoundaryOwner({ l, r, t, b }) {
    return Boolean(l.b && r.b && t.b && b.b);
}
function getLine(board, row, box, line) {
    return board[row][box][line];
}


/***/ }),

/***/ "./src/shared/model.ts":
/*!*****************************!*\
  !*** ./src/shared/model.ts ***!
  \*****************************/
/*! exports provided: MAX_PLAYERS, GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_PLAYERS", function() { return MAX_PLAYERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameState", function() { return GameState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const MAX_PLAYERS = 2;
var GameState;
(function (GameState) {
    GameState[GameState["WAITING_FOR_PLAYERS"] = 0] = "WAITING_FOR_PLAYERS";
    GameState[GameState["READY"] = 1] = "READY";
    GameState[GameState["PLAYING"] = 2] = "PLAYING";
    GameState[GameState["ENDED"] = 3] = "ENDED";
})(GameState || (GameState = {}));


/***/ }),

/***/ "./src/shared/util.ts":
/*!****************************!*\
  !*** ./src/shared/util.ts ***!
  \****************************/
/*! exports provided: copyObj, sleep, log, random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyObj", function() { return copyObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
function log(...args) {
    console.log(new Date(Date.now()).toISOString(), ...args);
}
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\data\dots-and-boxes\dots-and-boxes\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map