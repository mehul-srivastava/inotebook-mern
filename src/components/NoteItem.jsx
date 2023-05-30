import React, { useContext } from "react";
import AlertContext from "../context/AlertContext";
import ThemeContext from "../context/ThemeContext";
import NotesContext from "../context/NotesContext";

const NoteItem = ({ note }) => {
  const { darkMode } = useContext(ThemeContext);
  const { toggleAlert } = useContext(AlertContext);
  const { editNote, deleteNote } = useContext(NotesContext);

  const tags = note.tags.split(", ");

  const editWithMsg = (id) => {
    editNote(id);
    toggleAlert("success", "Your Note Has Been Successfully Updated!");
  };

  const deleteWithMsg = (id) => {
    deleteNote(id);
    toggleAlert("danger", "Your Note Has Been Successfully Deleted!");
  };

  return (
    <div className="col-md-3 mb-4">
      <div className={`card h-100 ${darkMode ? "bg-black text-white" : null}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => editWithMsg(note._id)}
              >
                <path
                  fill="gold"
                  d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H10V20.09L12.09,18H6V16H14.09L16.09,14H6V12H18.09L20,10.09V8L14,2H6M13,3.5L18.5,9H13V3.5M20.15,13C20,13 19.86,13.05 19.75,13.16L18.73,14.18L20.82,16.26L21.84,15.25C22.05,15.03 22.05,14.67 21.84,14.46L20.54,13.16C20.43,13.05 20.29,13 20.15,13M18.14,14.77L12,20.92V23H14.08L20.23,16.85L18.14,14.77Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => deleteWithMsg(note._id)}
              >
                <path
                  fill="red"
                  d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                />
              </svg>
            </div>
          </div>
          <p className="card-text">{note.description}</p>

          {tags.map((tag, index) => (
            <span key={index} className="badge text-bg-primary me-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
