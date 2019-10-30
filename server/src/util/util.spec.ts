import { copyObj } from "./util"

describe('util', () => {

    it('should copy object', () => {
        const obj = { a: 7 };
        const copy = copyObj(obj);
        expect(copy).toEqual(obj);
    })

})