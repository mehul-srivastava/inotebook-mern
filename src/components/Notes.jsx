import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";
import ThemeContext from "../context/ThemeContext";

import NoteItem from "./NoteItem";

const Notes = () => {
  const { darkMode } = useContext(ThemeContext);
  const { loading } = useContext(NotesContext);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>My Notes</h1>
        <form className="d-flex" role="search">
          <input
            className={`form-control me-2 border ${
              darkMode ? "bg-black border-light text-white" : null
            }`}
            type="search"
            placeholder="Search Notes"
          />
        </form>
      </div>
      {loading ? "Loading Notes..." : <PreviewNotes />}
    </>
  );
};

const PreviewNotes = () => {
  const { notes } = useContext(NotesContext);
  return notes.length ? (
    <div className="row">
      {notes.map((note, index) => (
        <NoteItem key={index} note={note} />
      ))}
    </div>
  ) : (
    <span>Add A Note To Preview It Here...</span>
  );
};

export default Notes;
