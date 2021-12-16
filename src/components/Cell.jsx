import { React, useState } from "react";

export const Cell = (props) => {
  // State includes: Display
  // Display states: 'hidden', 'flagged', 'question', 'mine', 'number'

  const [display] = useState(props.display);
  const height = 2; // Set this from higher in the hierarchy at some point

  return (
    <div
      className={
        typeof display !== "number" ? `cell ${display}` : `cell number`
      }
      style={{
        height: `${height}rem`,
        width: `${height}rem`,
        lineHeight: `${height}rem`,
      }}
    ></div>
  );
};
