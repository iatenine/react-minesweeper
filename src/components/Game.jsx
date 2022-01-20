import { useState, React, useEffect } from "react";
import Board from "./Board";
import { Display } from "./Display";

const settings = {
  baby: {
    width: 5,
    mines: 1,
  },
  beginner: {
    width: 9,
    mines: 10,
  },
  intermediate: {
    width: 16,
    mines: 40,
  },
  expert: {
    width: 24,
    mines: 99,
  },
  // 35% chance of a mine
  extreme: {
    width: 30,
    mines: 270,
  },
};

export const Game = () => {
  // State includes: score, time, gameState
  // gameState can be 'playing', 'lost' or 'won'

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const currSetting = settings.extreme;

  // Start timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time, gameState]);

  useEffect(() => {
    if (gameState === "lost") {
      console.log("You lost!", "score: ", score, "time: ", time);
      setGameState("idle");
    }
    if (gameState === "won") {
      console.log("You won!", "score: ", score, "time: ", time);
      setGameState("idle");
    }
  }, [gameState, score, time]);

  return (
    <div>
      <div>
        <Display label="Score" value={score} />
        <Display label="Time" value={time} />
      </div>
      <Board
        settings={currSetting}
        setScore={setScore}
        score={score}
        setGameState={setGameState}
        gameState={gameState}
      />
    </div>
  );
};

export default Game;
