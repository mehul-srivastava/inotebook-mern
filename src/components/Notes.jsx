import React, { useContext, useRef, useState } from "react";
import NotesContext from "../contexts/NotesContext";
import ThemeContext from "../contexts/ThemeContext";

import NoteItem from "./NoteItem";
import EditModal from "./EditModal";

const Notes = () => {
  const { loading, filteredNotes, searchNotes } = useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);

  const modalButtonRef = useRef();

  const [editNoteDetails, setEditNoteDetails] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
  });

  const openEditModal = (id, title, description, tags) => {
    modalButtonRef.current.click();
    setEditNoteDetails({ id, title, description, tags });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>My Notes</h1>
          <form className="d-flex" role="search">
            <input
              className={`form-control me-2 ${
                darkMode && "bg-black text-white border-dark"
              }`}
              type="search"
              placeholder="Search"
              onChange={(e) => searchNotes(e.target.value)}
              aria-label="Search"
            />
          </form>
        </div>

        <div className={`row ${loading && "justify-content-center"}`}>
          {loading ? (
            <div className="spinner-border loader" role="status"></div>
          ) : (
            filteredNotes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                openEditModal={openEditModal}
              />
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        editNoteDetails={editNoteDetails}
        setEditNoteDetails={setEditNoteDetails}
        ref={modalButtonRef}
      />
      <button
        type="button"
        ref={modalButtonRef}
        style={{ display: "none" }}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch demo modal
      </button>
    </>
  );
};

export default Notes;
