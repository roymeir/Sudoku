import React from "react";
import Tile from "./Tile";

function Board() {
  return <div className="board">{<Tile grid={grid} puzzle={puzzle} />}</div>;
}

export default Board;
