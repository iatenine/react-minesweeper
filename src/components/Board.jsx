import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";
import { shuffleArray, getNumberedArray } from "../helpers/mineArray";

/*
    Board should hold state for width, height and seed all mines
*/

export const Board = () => {
  // Board settings
  const [width, setWidth] = useState(10); //Width in cells
  const totalCells = width * width;
  const totalMines = 10;
  const [mineLocs, setMineLocs] = useState([]); //Array of mine locations

  useEffect(() => {
    const randMineLocs = new Array(totalCells);
    for (let i = 0; i < totalMines; i++) {
      randMineLocs[i] = "mine";
    }
    const shuffledLocs = shuffleArray(randMineLocs);
    const numberedArr = getNumberedArray(shuffledLocs, width, width);
    setMineLocs(numberedArr);
  }, []);

  // Cell settings (always square)
  const [cellWidth, setCellWidth] = useState(34); //Width in pixels (convert to useContext later)

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: `${width * cellWidth + cellWidth}px`,
      }}
    >
      {[...Array(totalCells)].map((_, i) => {
        return <Cell key={i} width={cellWidth} contains={mineLocs[i]} />;
      })}
    </div>
  );
};

export default Board;
