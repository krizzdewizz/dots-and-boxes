import { BoardService } from "@shared/board.service";

describe('BoardService', () => {

    let service: BoardService;

    beforeEach(() => {
        service = BoardService.INSTANCE;
    });

    it('should create board', () => {
        const size = 3;
        const board = service.newBoard(size);
        expect(board.length).toBe(size);
        board.forEach(row => expect(row.length).toBe(size));

        const [row0, row1] = board;
        const [box0_0, box0_1, box0_2] = row0;

        expect(box0_0.left.boundary).toBe(true);
        expect(box0_0.top.boundary).toBe(true);
        expect(box0_0.right.boundary).toBeFalsy();
        expect(box0_0.bottom.boundary).toBeFalsy();

        expect(box0_0.right).toBe(box0_1.left);
        expect(box0_1.right).toBe(box0_2.left);


        const [box1_0, box1_1] = row1;

        expect(box0_0.bottom).toBe(box1_0.top);
        expect(box0_1.bottom).toBe(box1_1.top);
    });
});