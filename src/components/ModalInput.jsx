import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const ModalInput = ({ name, value, editNoteDetails, setEditNoteDetails }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (e) => {
    setEditNoteDetails({ ...editNoteDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-group mb-3">
      <small>{name.charAt(0).toUpperCase() + name.slice(1)}</small>
      <input
        type="text"
        className={`form-control ${
          darkMode && "bg-black text-white border-dark"
        }`}
        rows="5"
        name={name}
        placeholder={`Enter ${name}`}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default ModalInput;
