export interface Player {
    id?: number;
    name: string;
}

export type PlayerIndex = number;

export interface Line {
    boundary?: boolean;
    owner?: PlayerIndex;
}

export interface Box {
    top: Line;
    left: Line;
    bottom: Line;
    right: Line;
    owner?: PlayerIndex;
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
        line: 'top' | 'left' | 'bottom' | 'right';
    };
    restart?: true;
}

