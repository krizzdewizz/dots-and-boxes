import { GameService } from "./game.service";
import { GameState } from "../../dots-and-boxes/src/app/model/model";
import { sleep } from './util/util';

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
        service.players = players;
        service.newGame();

        expect(service.game.state).toBe(GameState.READY);
        expect(service.game.countBoxesOwnedBy).toEqual({});
        expect(service.game.winners).toEqual([]);
        expect(service.game.board).toBeDefined();
        expect(service.game.players).toEqual(players);
    });

    it('should join player', () => {
        expect(service.join({ name: 'krizz' })).toBeDefined();
        expect(service.game.players.length).toBe(1);
        expect(service.game.players[0].name).toEqual('krizz');
        expect(service.game.players[0].id).toBeDefined();
        expect(service.game.state).toBe(GameState.WAITING_FOR_PLAYERS);

        expect(service.join({ name: 'Krizz' })).toBeUndefined();

        expect(service.join({ name: 'petra' })).toBeDefined();
        expect(service.game.players.length).toBe(2);
        expect(service.game.players.map(p => p.name)).toEqual(['krizz', 'petra']);
        expect(service.game.state).toBe(GameState.READY);
    });

    it('should handle line clicks', async () => {

        const krizzId = service.join({ name: 'krizz' });
        await sleep(10);
        const petraId = service.join({ name: 'petra' });
        expect(service.game.state).toBe(GameState.READY);

        service.newGame(2);

        service.startGame();
        // petra's turn
        service.game.currentPlayer = 1;
        expect(service.game.state).toBe(GameState.PLAYING);

        service.handle({ clickLine: { playerId: petraId, row: 0, box: 0, line: 'right' } });
        expect(service.game.countBoxesOwnedBy).toEqual({ 1: 0 });

        // krizz's turn
        expect(service.game.currentPlayer).toBe(0);

        // filled box 0/0
        service.handle({ clickLine: { playerId: krizzId, row: 0, box: 0, line: 'bottom' } });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 1, 1: 0 });

        // still krizz's turn
        expect(service.game.currentPlayer).toBe(0);

        service.handle({ clickLine: { playerId: krizzId, row: 1, box: 0, line: 'right' } });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 2, 1: 0 });

        service.handle({ clickLine: { playerId: krizzId, row: 1, box: 1, line: 'top' } });
        expect(service.game.countBoxesOwnedBy).toEqual({ 0: 4, 1: 0 });

        expect(service.game.state).toBe(GameState.ENDED);
        expect(service.game.winners).toEqual([0]);
    });

    it('should restart game', async () => {
        service.join({ name: 'krizz' });
        await sleep(10);
        service.join({ name: 'petra' });
        expect(service.game.state).toBe(GameState.READY);

        service.newGame(2);

        service.game.state = GameState.ENDED;
        service.restart();

        expect(service.game.state).toBe(GameState.PLAYING);
        expect(service.game.board.length).toBe(2);

    })
});