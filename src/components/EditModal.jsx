import React, { forwardRef, useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

import ModalInput from "./ModalInput";
import NotesContext from "../contexts/NotesContext";

const EditModal = forwardRef(function EditModal(props, ref) {
  const { editNoteDetails, setEditNoteDetails } = props;
  const { darkMode } = useContext(ThemeContext);
  const { editNote } = useContext(NotesContext);

  const handleEditNote = () => {
    ref.current.click();
    editNote(
      editNoteDetails.id,
      editNoteDetails.title,
      editNoteDetails.description,
      editNoteDetails.tags
    );
  };
  return (
    <div
      className="modal fade"
      id="editNoteModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className={`modal-content ${darkMode && "bg-dark"}`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Edit The Note</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <ModalInput
                name="title"
                value={editNoteDetails.title}
                editNoteDetails={editNoteDetails}
                setEditNoteDetails={setEditNoteDetails}
              />
              <ModalInput
                name="tags"
                value={editNoteDetails.tags}
                editNoteDetails={editNoteDetails}
                setEditNoteDetails={setEditNoteDetails}
              />
              <ModalInput
                name="description"
                value={editNoteDetails.description}
                editNoteDetails={editNoteDetails}
                setEditNoteDetails={setEditNoteDetails}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleEditNote}
            >
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EditModal;
