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

export type GameEvent = 'join' | 'start' | 'clickLine';
export interface JoinEvent {
    player: Player;
}

export interface StartEvent {
    startGame: boolean;
}

export interface ClickLineEvent {
    playerId: number;
    row: number;
    box: number;
    line: keyof Box; // w/o owner
}

export interface Game {
    state: GameState;
    currentPlayer: PlayerIndex;
    board?: Board;
    countBoxesOwnedBy: number[]; // [player0Count, player1Count, ...]
    winner?: PlayerIndex;
    players: Player[];
}
