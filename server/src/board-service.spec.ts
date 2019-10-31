import * as boardService from '@shared/board.service';

describe('BoardService', () => {
    it('should create board', () => {
        const size = 3;
        const board = boardService.newBoard(size);
        expect(board.length).toBe(size);
        board.forEach(row => expect(row.length).toBe(size));

        const [row0, row1] = board;
        const [box00, box01, box02] = row0;

        expect(box00.left.boundary).toBe(true);
        expect(box00.top.boundary).toBe(true);
        expect(box00.right.boundary).toBeFalsy();
        expect(box00.bottom.boundary).toBeFalsy();

        expect(box00.right).toBe(box01.left);
        expect(box01.right).toBe(box02.left);


        const [box10, box11] = row1;

        expect(box00.bottom).toBe(box10.top);
        expect(box01.bottom).toBe(box11.top);
    });
});
