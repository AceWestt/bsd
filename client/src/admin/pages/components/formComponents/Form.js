import React from "react";

const Form = ({
  classname,
  onSubmit,
  children,
  submitLabel,
  disabled,
  submitHidden,
}) => {
  return (
    <form
      className={`form ${classname ? classname : undefined}`}
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="fields">{children}</div>
      <div className="submit">
        <div className={`form-control ${classname ? classname : undefined}`}>
          {!submitHidden && (
            <button
              type="submit"
              disabled={disabled}
              className={disabled ? "inactive" : undefined}
            >
              {submitLabel}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
