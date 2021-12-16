import { React, useState } from "react";

export const Cell = (props) => {
  // State includes: Display
  // Display states: 'hidden', 'flagged', 'question', 'mine', 'number', 'empty'

  const [display, setDisplay] = useState(props.display);
  const min = 30;
  const height = 2; // Set this from higher in the hierarchy at some point

  const handleOnClick = (e) => {
    if (display !== "hidden") return;
    if (props.contains) {
      console.log("contains " + props.contains);
      return;
    }
    setDisplay("empty");
    console.log("Empty cell clicked");
  };

  return (
    <div
      className={
        typeof display !== "number" ? `cell ${display}` : `cell number`
      }
      style={{
        height: `${height}rem`,
        width: `${height}rem`,
        lineHeight: `${height}rem`,
        minWidth: `${min}px`,
        minHeight: `${min}px`,
      }}
      onClick={handleOnClick}
    ></div>
  );
};
