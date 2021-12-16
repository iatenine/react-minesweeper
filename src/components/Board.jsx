import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";
import {
  shuffleArray,
  getNumberedArray,
  getAdjacentCellIndices,
} from "../helpers/mineArray";

/*
    Board should hold state for width, height and seed all mines
*/

export const Board = () => {
  // Board settings
  const [width] = useState(10); //Width in cells
  const [revealedCells, setRevealedCells] = useState([]); //Array of cells that have been revealed
  const [totalCells] = useState(width * width);
  const totalMines = 1;
  const [mineLocs, setMineLocs] = useState([]); //Array of mine locations
  // Cell settings (always square)
  const [cellWidth] = useState(34); //Width in pixels (convert to useContext later)

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

  const findRevealableIndices = (index) => {
    const ret = [index];

    // Get adjacent indices
    const adjacentCells = getAdjacentCellIndices(index, width, mineLocs.length);
    adjacentCells.forEach((cell) => {
      ret.push(cell);
    });

    if (ret.every((cell) => cell !== "")) return ret;

    // Filter out non-empties
    const emptyAdjacent = adjacentCells.filter((cell) => {
      return mineLocs[cell] === "";
    });

    // Recursively find adjacent empties for empties only
    emptyAdjacent.forEach((cell) => {
      ret.push(...findRevealableIndices(cell));
    });

    return ret;
  };

  const revealAdjacent = (index) => {
    // Continue process for other empty cells
    setRevealedCells([...revealedCells, ...findRevealableIndices(index)]);
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
