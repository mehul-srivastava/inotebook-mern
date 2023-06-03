import React, { useContext, forwardRef } from "react";
import ThemeContext from "../contexts/ThemeContext";

const Input = forwardRef(function Input(props, ref) {
  const { reactref, label, name, helperText, ...otherProps } = props;
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="mt-4 mb-3">
      <label className="form-label">{label}</label>
      <input
        type={name}
        className={`form-control ${
          darkMode && "bg-black text-white border-dark"
        }`}
        ref={ref}
        {...otherProps}
      />
      <div className={`form-text ${darkMode && "text-gray"}`}>{helperText}</div>
    </div>
  );
});

export default Input;

/*

*/
