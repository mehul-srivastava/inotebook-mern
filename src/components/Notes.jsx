import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const { notes, ...noteFunctions } = useContext(NotesContext);
  return (
    <>
      <h1>My Notes</h1>
      {notes.length !== 0 ? (
        <span className="mb-4">&nbsp;</span>
      ) : (
        <span>Add A Note To Preview It Here...</span>
      )}
      <div className="row">
        {notes.map((note, index) => (
          <NoteItem key={index} note={note} {...noteFunctions} />
        ))}
      </div>
    </>
  );
};

export default Notes;
