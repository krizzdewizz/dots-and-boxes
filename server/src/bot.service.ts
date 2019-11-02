import { lineComplete } from './shared/board.service';
import { Board, Box, Line } from './shared/model';
import { random } from './shared/util';

function freeLines(box: Box): Line[] {
    const free = [];

    const addIfFree = (line: Line) => {
        if (!lineComplete(line)) {
            free.push(line);
        }
    };

    addIfFree(box.t);
    addIfFree(box.b);
    addIfFree(box.l);
    addIfFree(box.r);

    return free;
}

export function findFreeLine(board: Board, rand: (max: number) => number = max => random(0, max)): Line {
    const lines: Line[] = [];
    let best: Line;

    board.find(row => row.find(box => {
        const free = freeLines(box);

        if (free.length === 1) {
            best = free[0];
            return true;
        }

        lines.push(...free);
    }));

    return best || lines[rand(lines.length)];
}
