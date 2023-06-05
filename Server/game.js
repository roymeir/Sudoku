let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function solve(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 0) {
        return FindSolution(grid, row, col);
      }
    }
  }
  return true;
}

function FindSolution(grid, row, col) {
  for (let guess = 1; guess <= 9; guess++) {
    if (isValidPlace(grid, row, col, guess)) {
      grid[row][col] = guess;
      if (solve(grid)) {
        return true;
      } else {
        grid[row][col] = 0;
      }
    }
  }
  return false;
}

function isValidPlace(grid, row, col, guess) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col] === guess) {
      return false;
    }
  }
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[row][i] === guess) {
      return false;
    }
  }
  return findInSubGrid(grid, row, col, guess);
}

function findInSubGrid(grid, row, col, guess) {
  let localBoxRow = row - (row % 3);
  let localBoxCol = col - (col % 3);
  for (let i = localBoxRow; i < localBoxRow + 3; i++) {
    for (let j = localBoxCol; j < localBoxCol + 3; j++) {
      if (grid[i][j] === guess) {
        return false;
      }
    }
  }
  return true;
}

solve(board);
console.log(board);
