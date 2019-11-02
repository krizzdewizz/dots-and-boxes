import { findFreeLine } from './bot.service';
import { Board } from '@shared/model';
import { newBoard } from '@shared/board.service';

describe('BotService', () => {

    const size = 3;
    let board: Board;

    beforeEach(() => {
        board = newBoard(size);
    });

    function findLine() {
        return findFreeLine(board, () => 0);
    }

    it('should find first free line', () => {
        const box00 = board[0][0];
        const box01 = board[0][1];

        // order checked is t, b, l, t (see freeLines())
        // t is a boundary
        expect(findLine()).toBe(box00.b);

        box00.b.o = 1;

        // l is a boundary
        expect(findLine()).toBe(box00.r);

        box00.r.o = 1;
        expect(findLine()).toBe(box01.b);

        box01.b.o = 1;
        // l not free
        expect(findLine()).toBe(box01.r);
    });

    it('should find best free line', () => {
        const box02 = board[0][2];

        box02.b.o = 1;

        expect(findLine()).toBe(box02.l);

        box02.l.o = 1;

        const box22 = board[2][2];
        box22.l.o = 1;
        expect(findLine()).toBe(box22.t);

        box22.t.o = 1;
        expect(findLine()).toBe(board[1][1].r);
    });
});
