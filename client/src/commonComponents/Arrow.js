import React from "react";
import solid from "./img/ArrowSolidWhite.svg";
import white from "./img/arrowWhite.svg";
import grey from "./img/arrowGrey.svg";

const Arrow = (props) => {
  const count = props.count || 1;
  const mode = props.mode || "white";
  const listRef = props.myListRef || null;

  let img = null;
  if (mode === "solid") {
    img = solid;
  } else if (mode === "white") {
    img = white;
  } else if (mode === "grey") {
    img = grey;
  }
  const arrows = [];
  for (let n = 1; n <= count; n++) {
    arrows.push(
      <img
        src={img}
        alt="arrow"
        key={`arrow-${n}`}
        ref={(e) => {
          if (listRef) {
            if (listRef.current) {
              return (listRef.current[n - 1] = e);
            }
          }
        }}
      />
    );
  }

  return (
    <div
      className={`arrow-component ${props.className || ""}`}
      ref={props.myRef || null}
    >
      {arrows}
    </div>
  );
};

export default Arrow;
