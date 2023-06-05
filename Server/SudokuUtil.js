import { Util } from "./Util.js";

const SudokuUtil = {
  isValidPuzzle: function (grid) {
    for (let i = 0; i < grid.length; i++) {
      if (!isValidRow(grid, i)) {
        return false;
      }
      if (!isValidCol(grid, i)) {
        return false;
      }
    }
    if (!isValidBox(grid)) {
      return false;
    }
    return true;
  },

  isValidPlace: function (grid, row, column, number) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][column] === number) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === number) {
        return false;
      }
    }
    let localBoxRow = row - (row % 3);
    let localBoxCol = column - (column % 3);
    for (let i = localBoxRow; i < localBoxRow + 3; i++) {
      for (let j = localBoxCol; j < localBoxCol + 3; j++) {
        if (grid[i][j] === number) {
          return false;
        }
      }
    }
    return true;
  },
};

function isValidRow(grid, row) {
  // Input validation
  if (!isValidGrid(grid) || row < 0 || row >= grid.length) {
    throw new Error("Invalid input");
  }

  const set = new Set();
  const gridSize = grid.length;

  for (let i = 0; i < gridSize; i++) {
    const cellValue = grid[row][i];

    // Number validation
    if (!isValidNumber(cellValue)) {
      return false;
    }

    if (cellValue !== 0) {
      if (set.has(cellValue)) {
        return false;
      }
      set.add(cellValue);
    }
  }
  return true;
}

function isValidCol(grid, col) {
  // Input validation
  if (!isValidGrid(grid) || col < 0 || col >= grid.length) {
    throw new Error("Invalid input");
  }

  const set = new Set();
  const gridSize = grid.length;

  for (let i = 0; i < gridSize; i++) {
    const cellValue = grid[i][col];

    // Number validation
    if (!isValidNumber(cellValue)) {
      return false;
    }

    if (cellValue !== 0) {
      if (set.has(cellValue)) {
        return false;
      }
      set.add(cellValue);
    }
  }
  return true;
}

function isValidGrid(grid) {
  if (!Array.isArray(grid)) {
    return false;
  }
  const numRows = grid.length;
  if (numRows !== 9) {
    return false;
  }

  const numCols = grid[0].length;
  if (numCols !== 9) {
    return false;
  }

  for (let row = 1; row < numRows; row++) {
    if (grid[row].length !== numCols) {
      return false;
    }
  }
  return true;
}

function isValidNumber(number) {
  return Number.isInteger(number) && number >= 0 && number <= 9;
}

function isValidBox(grid) {
  for (let row = 0; row < grid.length; row += 3) {
    for (let column = 0; column < grid.length; column += 3) {
      if (!isValidSubBox(grid, row, column)) {
        return false;
      }
    }
  }
  return true;
}

function isValidSubBox(grid, startRow, startColumn) {
  const set = new Set();
  for (let row = startRow; row < startRow + 3; row++) {
    for (let col = startColumn; col < startColumn + 3; col++) {
      const number = grid[row][col];
      if (!isValidNumber(number) || (number !== 0 && set.has(number))) {
        return false;
      }
      set.add(number);
    }
  }
  return true;
}

export { SudokuUtil };
