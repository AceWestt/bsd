import React from "react";

const FileUploadField = ({ classname, label, name, onChange }) => {
  return (
    <div className={`form-control ${classname ? classname : undefined}`}>
      <label>{label}</label>
      <input
        type="file"
        name={name || ""}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
};

export default FileUploadField;
