import { SudokuUtil } from "./SudokuUtil.js";
import { Util } from "./Util.js";

export class Sudoku {
  constructor(sudoku) {
    if (!sudoku) {
      this.sudoku = createGrid("Hard");
    } else {
      this.sudoku = sudoku;
    }
    this.solvedSudoku = [];
    this.isValidSudoku = false;
    this.isSolved = false;
  }

  /**
   * *getter method for random sudoku.
   * @params  none
   * @returns this.sudoku
   */
  get puzzle() {
    return this.sudoku;
  }

  /**
   * *getter method for solution of the sudoku.
   * @params  none
   * @returns this.solvedSudoku
   */
  get solvedPuzzle() {
    return this.solvedSudoku;
  }

  /**
   * *method to validate solution of the sudoku.
   * @params  none
   * @returns true if the solved puzzle is valid false otherwise
   */
  validate() {
    return isValidSolution(this.sudoku);
  }

  /**
   * *getter method to find whether the current sudoku is solvable(valid).
   * @params  none
   * @returns true if the puzzle is valid - saves the solution to this.solvedSudoku
   *          false if the puzzle is valid but doesn't have any solution
   * @throws "Invalid Puzzle" if the puzzle is invalid
   */
  isSolvable() {
    this.isValidSudoku = isValidPuzzle(this.sudoku);
    if (this.isValidSudoku) {
      Util.copyGrid(this.sudoku, this.solvedSudoku);
      return solve(this.solvedSudoku);
    } else {
      return false;
    }
  }
}

function isValidPuzzle(grid) {
  if (SudokuUtil.isValidPuzzle(grid)) {
    return true;
  }
  return false;
}

function isValidSolution(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }
  return SudokuUtil.isValidPuzzle(grid);
}

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
