import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";
import {
  shuffleArray,
  getNumberedArray,
  getCellsToReveal,
} from "../helpers/mineArray";

/*
    Board should hold state for width, height and seed all mines
*/

export const Board = () => {
  // Board settings
  const [width] = useState(15); //Width in cells
  const [revealedCells, setRevealedCells] = useState([]); //Array of cells that have been revealed
  const [totalCells] = useState(width * width);
  const totalMines = 40;
  const [mineLocs, setMineLocs] = useState([]); //Array of mine locations
  // Cell settings (always square)
  const [cellWidth] = useState(34); //Width in pixels (convert to useContext later)

  // Randomly seed board with mines
  useEffect(() => {
    const randMineLocs = new Array(totalCells);
    for (let i = 0; i < totalMines; i++) {
      randMineLocs[i] = "mine";
    }
    const shuffledLocs = shuffleArray(randMineLocs);
    const numberedArr = getNumberedArray(shuffledLocs, width, width);
    setMineLocs(numberedArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal all adjacent cells to revealed empty cells
  const revealAdjacent = (index) => {
    const cellsToReveal = getCellsToReveal(index, mineLocs, width);
    setRevealedCells([...revealedCells, ...cellsToReveal]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: `${width * cellWidth + cellWidth}px`,
      }}
    >
      {mineLocs.map((cell, index) => (
        <Cell
          key={index}
          index={index}
          width={cellWidth}
          contains={mineLocs[index]}
          revealed={revealedCells.includes(index)}
          revealAdjacent={revealAdjacent}
        />
      ))}
    </div>
  );
};

export default Board;
