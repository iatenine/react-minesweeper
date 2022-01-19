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

/*
  props
    settings: {
      width
      mines
    }
*/

export const Board = (props) => {
  // Board settings

  const [width] = useState(props.settings.width); //Width in cells
  const [revealedCells, setRevealedCells] = useState([]); //Array of cells that have been revealed
  const [totalCells] = useState(width * width);
  const totalMines = props.settings.mines;
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

  // Check if all non-mine cells have been revealed
  useEffect(() => {
    if (revealedCells.length >= totalCells - totalMines) {
      props.setGameState("won");
    }
  }, [revealedCells, totalCells, totalMines, props.score]);

  // Reveal all cells upon losing
  useEffect(() => {
    if (props.gameState === "lost") {
      const cellsToReveal = Array(totalCells).fill("");
      for (let i = 0; i < totalCells; i++) {
        cellsToReveal[i] = i;
      }
      setRevealedCells(cellsToReveal);
    }
  }, [props.gameState, totalCells]);

  // Add 1 to score for each cell revealed
  const cellReveal = (index) => {
    if (revealedCells.includes(index)) return;
    setRevealedCells([...revealedCells, index]);
    props.setScore(props.score + 1);
  };

  // Reveal all adjacent cells to revealed empty cells
  // Add to score based on number of cells revealed
  const revealAdjacent = (index) => {
    const cellsToReveal = getCellsToReveal(index, mineLocs, width);
    const newCells = new Set([...revealedCells, ...cellsToReveal]);
    props.setScore(props.score + [...newCells].length);
    setRevealedCells([...newCells]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: `${width * (cellWidth + 3)}px`,
      }}
    >
      {mineLocs.map((_, index) => (
        <Cell
          key={index}
          index={index}
          width={cellWidth}
          contains={mineLocs[index]}
          revealed={revealedCells.includes(index)}
          revealAdjacent={revealAdjacent}
          setGameState={props.setGameState}
          cellReveal={cellReveal}
        />
      ))}
    </div>
  );
};

export default Board;
