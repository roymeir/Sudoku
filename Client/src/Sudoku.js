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
  const [puzzleStatus, setPuzzleStatus] = useState("");

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
        setPuzzleStatus("Solved");
        return data.solution;
      } else {
        setPuzzleStatus("unSolvable");
        return grid;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleValidate() {
    try {
      const response = await REST.validateBoard(grid);
      const data = await response.json();
      return data.status;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInterface(action) {
    let newGrid;
    switch (action) {
      case "create":
        newGrid = await handleCreate();
        setPuzzleStatus("");
        setGrid(newGrid);
        break;
      case "solve":
        newGrid = await handleSolve();
        setGrid(newGrid);
        break;
      case "validate":
        const status = await handleValidate();
        const puzzleStatus = status ? "Solved" : "Unsolved";
        setPuzzleStatus(puzzleStatus);
        break;
      //   case "clear":
      //     setGrid(getGrid());
      //     setPuzzleStatus("");
      //     break;
      default:
        throw new Error("Invalid action");
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
