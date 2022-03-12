import React from "react";

const InputField = ({ classname, label, type, value, name, onChange }) => {
  return (
    <div className={`form-control ${classname ? classname : undefined}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value || ""}
        name={name || ""}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
};

export default InputField;
