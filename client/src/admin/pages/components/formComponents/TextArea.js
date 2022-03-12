import React from "react";

const TextArea = ({ classname, label, name, value, onChange }) => {
  return (
    <div className={`form-control ${classname ? classname : undefined}`}>
      <label>{label}</label>
      <textarea
        name={name}
        value={value || ""}
        onChange={(e) => {
          onChange(e);
        }}
      ></textarea>
    </div>
  );
};

export default TextArea;
