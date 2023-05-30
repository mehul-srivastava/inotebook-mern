import React, { useContext, useState } from "react";
import AlertContext from "../context/AlertContext";
import ThemeContext from "../context/ThemeContext";
import NotesContext from "../context/NotesContext";

import Alert from "./Alert";

const AddNoteForm = () => {
  const { alert, toggleAlert } = useContext(AlertContext);
  const { addNote } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);

  const [note, setNote] = useState({
    title: "Title",
    description: "Description",
    tags: "Tags",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
    toggleAlert("success", "Your Note Has Been Successfully Added!");
  };

  return (
    <>
      <Alert message={alert.message} type={alert.type} />
      <h1>Add A Note</h1>
      <form className="add-note" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Note Title</label>
          <input
            type="text"
            className={`form-control ${
              darkMode ? "bg-black text-white border border-dark" : null
            }`}
            placeholder="You can write the title of your note here"
            name="title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Note Tags</label>
          <input
            type="text"
            className={`form-control ${
              darkMode ? "bg-black text-white border border-dark" : null
            }`}
            placeholder="You can write the tags of your note here (separated by commas)"
            name="tags"
            onChange={(e) => setNote({ ...note, tags: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Note Description</label>
          <textarea
            type="text"
            className={`form-control ${
              darkMode ? "bg-black text-white border border-dark" : null
            }`}
            placeholder="You can write the description of your note here..."
            name="description"
            rows={5}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title === "Title" || note.title === "" ? true : false}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNoteForm;
