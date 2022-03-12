import React from "react";

const MainbarContentWrapper = ({ children, className, img }) => {
  return (
    <div className={`editor-screen ${className ? className : undefined}`}>
      <div className="editor-screen__main">{children}</div>
      <div className="editor-screen__instructions">
        {img && <img alt="instructions" src={img} />}
      </div>
    </div>
  );
};

export default MainbarContentWrapper;
