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

export interface ChatMessage {
    sender: string;
    text: string;
}

// ServerSentEvents

export interface GameEvent {
    type: 'game';
    game: Game;
}

export interface JoinedEvent {
    type: 'joined';
    playerId: number;
}

export interface JoinErrorEvent {
    type: 'join-error';
    error: string;
}

export interface ChatEvent {
    type: 'chat';
    message: ChatMessage;
}

export type ServerSentEvent =
    GameEvent
    | JoinedEvent
    | JoinErrorEvent
    | ChatEvent;

// ClientSentEvents

export interface StartGameEvent {
    type: 'startGame';
}

export interface RestartGameEvent {
    type: 'restartGame';
}

export interface JoinEvent {
    type: 'join';
    player: Player;
}

export interface LeaveEvent {
    type: 'leave';
    playerId: number;
}

export interface ClickLineEvent {
    type: 'clickLine';
    playerId: number;
    row: number;
    box: number;
    line: LineName;
}

export interface NewBoardEvent {
    type: 'newBoard';
    board: Board;
}

export type ClientSentEvent =
    StartGameEvent
    | RestartGameEvent
    | JoinEvent
    | LeaveEvent
    | ClickLineEvent
    | NewBoardEvent
    | ChatEvent;

