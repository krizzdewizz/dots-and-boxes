import { Board, Box, Row, Line, LineName } from '@shared/model';
import { random } from './util';

export function newBox(): Box {
  return {
    t: {},
    l: {},
    b: {},
    r: {},
  };
}

function joinBoxesLeftRight(left: Box, right: Box) {
  if (!left) {
    return;
  }
  left.r = right.l;
}

function joinBoxesTopBottom(top: Box, bottom: Box) {
  top.b = bottom.t;
}

export function lineComplete(line: Line): boolean {
  return Boolean(line.b) || line.o !== undefined;
}

export function boxComplete(box: Box): boolean {
  return lineComplete(box.t)
    && lineComplete(box.l)
    && lineComplete(box.b)
    && lineComplete(box.r);
}

export function newBoard(width: number, height = width): Board {
  const board: Board = [];

  for (let row = 0; row < height; row++) {
    const r: Row = [];
    for (let col = 0; col < width; col++) {
      const box = newBox();

      if (col === 0) {
        box.l.b = 1;
      } else if (col === width - 1) {
        box.r.b = 1;
      }

      if (row === 0) {
        box.t.b = 1;
      } else if (row === height - 1) {
        box.b.b = 1;
      }

      r.push(box);
    }
    board.push(r);
  }

  return this.joinBoxes(board);
}

function setBoxBoundaryOwner(board: Board) {
  board.forEach(row => row
    .filter(isBoundaryOwner)
    .forEach(box => box.o = -1));
}

export function joinBoxes(board: Board): Board {
  let prevRow: Row;
  board.forEach(row => {

    let prevBox: Box;

    row.forEach(box => {
      joinBoxesLeftRight(prevBox, box);
      prevBox = box;
    });

    if (prevRow) {
      prevRow.forEach((topBox, colIndex) => {
        const box = row[colIndex];
        joinBoxesTopBottom(topBox, box);
      });
    }

    prevRow = row;
  });

  setBoxBoundaryOwner(board);

  return board;
}

export function isBoundaryOwner({ l, r, t, b }: Box): boolean {
  return Boolean(l.b && r.b && t.b && b.b);
}

export function getLine(board: Board, row: number, box: number, line: LineName): Line {
  return board[row][box][line];
}

function freeLines(box: Box): Line[] {
  const lines: Line[] = [];

  const addFree = line => {
    if (!lineComplete(line)) {
      lines.push(line);
    }
  };

  addFree(box.t);
  addFree(box.b);
  addFree(box.l);
  addFree(box.r);

  return lines;
}

export function findFreeLine(board: Board): Line {
  const lines: Line[] = [];
  let best: Line;

  board.forEach(row => row.forEach(box => {
    const free = freeLines(box);

    lines.push(...free);

    if (!best && free.length === 1) {
      best = free[0];
    }
  }));

  return best || lines[random(0, lines.length)];
}
