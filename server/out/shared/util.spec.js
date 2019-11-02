"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
describe('util', function () {
    it('should copy object', function () {
        var obj = { a: 7 };
        var copy = util_1.copyObj(obj);
        expect(copy).toEqual(obj);
    });
});
//# sourceMappingURL=util.spec.js.map