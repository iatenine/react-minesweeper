import React from "react";

export const Display = (props) => {
  return (
    <span>
      {props.label}: {props.value}
    </span>
  );
};
