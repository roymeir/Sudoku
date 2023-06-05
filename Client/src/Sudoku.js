import "./App.css";
import React, { useState, useRef } from "react";
import Board from "./UI/Board";
import Interface from "./UI/Interface";
import { REST } from "./service/api.js";

function getGrid() {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = Array(9).fill(0);
  }
  return grid;
}

function Sudoku() {
  const [grid, setGrid] = useState(getGrid());
  const [puzzleStatus, setPuzzleStatus] = useState("Create a puzzle");

  async function handleCreate() {
    try {
      const response = await REST.getBoard();
      const data = await response.json();
      return data.game;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSolve() {
    try {
      const response = await REST.solveBoard(grid);
      const data = await response.json();
      if (data.status) {
        return data.solution;
      }
      return grid;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Sudoku">
      <Board
        puzzle={initialGrid.current}
        grid={grid}
        handleChange={handleChange}
      />
      <Interface handleInterface={handleInterface} status={puzzleStatus} />
    </div>
  );
}

export default Sudoku;
