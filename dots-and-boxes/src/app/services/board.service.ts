import { Board, Box, Row, Line } from '../model/model';

function newBox(): Box {
  return {
    top: {},
    left: {},
    bottom: {},
    right: {},
  };
}

function joinBoxesLeftRight(left: Box, right: Box) {
  if (!left) {
    return;
  }
  left.right = right.left;
}

function joinBoxesTopBottom(top: Box, bottom: Box) {
  top.bottom = bottom.top;
}

export function lineComplete(line: Line): boolean {
  return line.boundary || line.owner !== undefined;
}

export function boxComplete(box: Box): boolean {
  return lineComplete(box.top)
    && lineComplete(box.left)
    && lineComplete(box.bottom)
    && lineComplete(box.right);
}

export class BoardService {

  static readonly INSTANCE = new BoardService();

  private constructor() { }

  newBoard(size: number): Board {
    const board: Board = [];

    for (let row = 0; row < size; row++) {
      const r: Row = [];
      for (let col = 0; col < size; col++) {
        const box = newBox();

        if (col === 0) {
          box.left.boundary = true;
        } else if (col === size - 1) {
          box.right.boundary = true;
        }

        if (row === 0) {
          box.top.boundary = true;
        } else if (row === size - 1) {
          box.bottom.boundary = true;
        }

        r.push(box);
      }
      board.push(r);
    }

    return this.joinBoxes(board);
  }

  joinBoxes(board: Board): Board {
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
    return board;
  }

  isBoundaryOwner({ left, right, top, bottom }: Box): boolean {
    return left.boundary && right.boundary && top.boundary && bottom.boundary;
  }

  getLine(board: Board, row: number, box: number, line: string): Line {
    return board[row][box][line];
  }
}
