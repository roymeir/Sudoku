import React, { useState, useRef } from "react";
import Board from "./UI/Board";
import Interface from "./UI/Interface";

function Sudoku() {
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
