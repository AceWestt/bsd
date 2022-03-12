import React from "react";

const SectionBg = (props) => {
  return (
    <div className={`section-bg ${props.className || ""}`}>
      <img src={props.img} alt="bg" ref={props.imgRef || null} />
      {props.overlay && <div className="overlay"></div>}
    </div>
  );
};

export default SectionBg;
