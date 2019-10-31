import * as boardService from '@shared/board.service';

describe('BoardService', () => {
    it('should create board', () => {
        const size = 3;
        const board = boardService.newBoard(size);
        expect(board.length).toBe(size);
        board.forEach(row => expect(row.length).toBe(size));

        const [row0, row1] = board;
        const [box00, box01, box02] = row0;

        expect(box00.l.b).toBeTruthy();
        expect(box00.t.b).toBeTruthy();
        expect(box00.r.b).toBeFalsy();
        expect(box00.b.b).toBeFalsy();

        expect(box00.r).toBe(box01.l);
        expect(box01.r).toBe(box02.l);


        const [box10, box11] = row1;

        expect(box00.b).toBe(box10.t);
        expect(box01.b).toBe(box11.t);
    });
});
