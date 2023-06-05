import { Util } from "./Util.js";

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

function createGrid(difficulty) {
  let howManyNumbersToRemove = setDifficulty(difficulty);
  let grid = getRandomGrid();

  solve(grid);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.random() > howManyNumbersToRemove) {
        grid[i][j] = 0;
      }
    }
  }
  return grid;
}

function setDifficulty(difficulty) {
  switch (difficulty) {
    case "Easy":
      return 0.6;
    case "Medium":
      return 0.45;
    case "Hard":
      return 0.3;
    case "Expert":
      return 0.15;
    default:
      throw new Error("Invalid difficulty");
  }
}

function getRandomGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = Array(9).fill(0);
  }
  for (let i = 0; i < 9; i++) {
    let number = Math.floor(Math.random() * 9) + 1;
    while (!isValidPlace(grid, 0, i, number)) {
      number = Math.floor(Math.random() * 9) + 1;
    }
    grid[0][i] = number;
  }
  return grid;
}

let solution = createGrid("Hard");
Util.print2DArray(solution);
solve(solution);
Util.print2DArray(solution);
