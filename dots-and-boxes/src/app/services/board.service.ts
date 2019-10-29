import { Board, Box, Row } from '../model/model';

function newBox(): Box {
  return {
    top: {},
    left: {},
    bottom: {},
    right: {},
  };
}

function joinBoxes(left: Box, right: Box) {
  if (!left) {
    return;
  }
  left.right = right.left;
}

function joinBoxesTopBottom(top: Box, bottom: Box) {
  top.bottom = bottom.top;
}

function addRow(board: Board, row: Row) {
  const topRow = board[board.length - 1];
  if (topRow) {
    topRow.forEach((topBox, colIndex) => {
      const box = row[colIndex];
      joinBoxesTopBottom(topBox, box);
    });
  }

  board.push(row);
}

export class BoardService {

  constructor() { }

  newBoard(size: number): Board {
    const board: Board = [];

    for (let row = 0; row < size; row++) {
      const r: Row = [];
      let prevBox: Box;
      for (let col = 0; col < size; col++) {
        const box = newBox();

        joinBoxes(prevBox, box);
        prevBox = box;

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
      addRow(board, r);
    }

    return board;
  }
}
