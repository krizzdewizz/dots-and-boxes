import { GameService } from './game.service';
import { GameState } from './shared/model';
import { sleep } from './shared/util';
import * as boardService from './shared/board.service';

describe('GameService', () => {

    let service: GameService;

    beforeEach(() => {
        service = new GameService();
    });

    it('init game', () => {
        expect(service.game.state).toBe(GameState.WAITING_FOR_PLAYERS);
        expect(service.game.countBoxesOwnedBy).toEqual({});
        expect(service.game.winners).toEqual([]);
        expect(service.game.board).toBeDefined();
    });

    it('should reset game state', () => {
        service.game.state = GameState.PLAYING;
        service.game.countBoxesOwnedBy = [9, 3];
        service.game.winners = [0, 1];
        const players = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
        service[`players`] = players;
        service[`newGame`]();

        expect(service.game.state).toBe(GameState.READY);
        expect(service.game.countBoxesOwnedBy).toEqual({});
        expect(service.game.winners).toEqual([]);
        expect(service.game.board).toBeDefined();
        expect(service.game.players).toEqual(players);
    });

    it('should join player', () => {
        expect(service[`join`]({ name: 'krizz' }).playerId).toBeDefined();
        expect(service.game.players.length).toBe(1);
        expect(service.game.players[0].name).toEqual('krizz');
        expect(service.game.players[0].id).toBeDefined();
        expect(service.game.state).toBe(GameState.WAITING_FOR_PLAYERS);

        expect(service[`join`]({ name: 'Krizz' }).playerId).toBeUndefined();

        expect(service[`join`]({ name: 'petra' }).playerId).toBeDefined();
        expect(service.game.players.length).toBe(2);
        expect(service.game.players.map(p => p.name)).toEqual(['krizz', 'petra']);
        expect(service.game.state).toBe(GameState.READY);
    });

    it('should not join if player exists', () => {
        expect(service[`join`]({ name: 'krizz' }).playerId).toBeDefined();
        const secondJoin = service[`join`]({ name: 'krizz' });
        expect(secondJoin.playerId).toBeUndefined();
        expect(secondJoin.error).toBeDefined();
    });

    it('should not join sys', () => {
        const join = service[`join`]({ name: 'sys' });
        expect(join.playerId).toBeUndefined();
        expect(join.error).toBeDefined();
    });

    it('should handle line clicks', async () => {

        const krizzId = service[`join`]({ name: 'krizz' }).playerId;
        await sleep(10);
        const petraId = service[`join`]({ name: 'petra' }).playerId;
        expect(service.game.state).toBe(GameState.READY);

        service[`newGame`](boardService.newBoard(2));

        service[`startGame`]();
        // petra's turn
        service.game.currentPlayer = 1;
        expect(service.game.state).toBe(GameState.PLAYING);

        service.handle({ type: 'clickLine', playerId: petraId, row: 0, box: 0, line: 'r' });
        expect(service.game.countBoxesOwnedBy).toEqual({});

        // krizz's turn
        expect(service.game.currentPlayer).toBe(0);

        // filled box 0/0
        service.handle({ type: 'clickLine', playerId: krizzId, row: 0, box: 0, line: 'b' });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 1 });

        // still krizz's turn
        expect(service.game.currentPlayer).toBe(0);

        service.handle({ type: 'clickLine', playerId: krizzId, row: 1, box: 0, line: 'r' });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 2 });

        service.handle({ type: 'clickLine', playerId: krizzId, row: 1, box: 1, line: 't' });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 4 });

        expect(service.game.state).toBe(GameState.ENDED);
        expect(service.game.winners).toEqual([0]);
    });

    it('should restart game', async () => {
        service[`join`]({ name: 'krizz' });
        await sleep(10);
        service[`join`]({ name: 'petra' });
        expect(service.game.state).toBe(GameState.READY);

        service[`newGame`](boardService.newBoard(2));

        service.game.state = GameState.ENDED;
        service[`restartGame`]();

        expect(service.game.state).toBe(GameState.PLAYING);
        expect(service.game.board.length).toBe(2);
    });

    it('should check winners', () => {
        const board = boardService.newBoard(2);

        const completeBox = (row, box, owner) => {
            const b = board[row][box];
            b.o = owner;
            b.t.o = owner;
            b.b.o = owner;
            b.l.o = owner;
            b.r.o = owner;
        };

        completeBox(0, 0, 0);
        completeBox(0, 1, 1);
        completeBox(1, 0, 1);
        completeBox(1, 1, 1);

        service.game = {
            board,
            players: [{ name: 'a', id: 1 }, { name: 'b', id: 2 }],
            countBoxesOwnedBy: { 0: 1, 1: 3 },
            winners: []
        } as any;

        service[`checkWinners`]();

        expect(service.game.winners).toEqual([1]);
    });
});
