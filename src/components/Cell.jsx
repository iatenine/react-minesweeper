import { React, useState, useEffect } from "react";

export const Cell = (props) => {
  // State includes: Display
  // Display states: 'hidden', 'flagged', 'question', 'mine', 'number', 'empty'

  const [display, setDisplay] = useState("hidden");
  const width = props.width;

  const reveal = () => {
    if (display !== "hidden") return;
    else if (typeof props.contains === "number") setDisplay(props.contains);
    else if (props.contains === "mine") setDisplay("mine");
    else {
      setDisplay("empty");
      props.revealAdjacent(props.index);
    }
  };

  useEffect(() => {
    if (props.revealed && display === "hidden") reveal();
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle right click differently
    if (e.button === 2) {
      console.log("Right click");
    }
    reveal();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (display === "hidden") setDisplay("flagged");
    else if (display === "flagged") setDisplay("question");
    else if (display === "question") setDisplay("hidden");
  };

  return (
    <div
      className={
        typeof display !== "number" ? `cell ${display}` : `cell number`
      }
      style={{
        height: `${width}px`,
        width: `${width}px`,
        lineHeight: `${width}px`,
      }}
      onClick={handleOnClick}
      onContextMenu={handleRightClick}
    >
      {typeof display === "number" ? display : ""}
    </div>
  );
};

export default Cell;
