export interface Player {
    id?: number;
    name: string;
}

export type PlayerIndex = number;

export interface Line {
    b?: number; // boundary, 0 == false, 1 == true
    o?: PlayerIndex; // owner
}

export type LineName = 't' | 'l' | 'b' | 'r';

export interface Box {
    t: Line; // top
    l: Line; // left
    b: Line; // bottom
    r: Line; // right
    o?: PlayerIndex; // owner
}

export type Row = Box[];
export type Board = Row[];
export type BoardIndex = number;

export enum GameState {
    WAITING_FOR_PLAYERS, READY, PLAYING, ENDED
}

export interface Game {
    state: GameState;
    currentPlayer?: PlayerIndex;
    board?: Board;
    countBoxesOwnedBy: { [playerIndex: number]: number };
    winners: PlayerIndex[];
    players: Player[];
}

export interface ServerSentEvent {
    game?: Game;
    playerId?: number;
}

export interface ClientSentEvent {
    startGame?: true;
    join?: { player: Player };
    clickLine?: {
        playerId: number;
        row: number;
        box: number;
        line: LineName;
    };
    restart?: true;
}

