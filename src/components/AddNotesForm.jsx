import React, { useContext, useRef } from "react";
import ThemeContext from "../contexts/ThemeContext";
import NotesContext from "../contexts/NotesContext";

const AddNotesForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const { addNote } = useContext(NotesContext);

  const titleRef = useRef();
  const tagsRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(
      titleRef.current.value,
      descriptionRef.current.value,
      tagsRef.current.value
    );
  };

  return (
    <div className="container mt-5">
      <h1>Add A Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <small>Title</small>
          <input
            type="text"
            className={`form-control ${
              darkMode && "bg-black text-white border-dark"
            }`}
            placeholder="Enter title"
            ref={titleRef}
          />
        </div>
        <div className="form-group mb-3">
          <small>Tags</small>
          <input
            type="text"
            className={`form-control ${
              darkMode && "bg-black text-white border-dark"
            }`}
            placeholder="Enter tags seperated by commas"
            ref={tagsRef}
          />
        </div>

        <div className="form-group mb-3">
          <small>Description</small>
          <textarea
            type="text"
            className={`form-control ${
              darkMode && "bg-black text-white border-dark"
            }`}
            rows="5"
            placeholder="Enter description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotesForm;
