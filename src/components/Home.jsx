import React, { useContext, useRef, useState } from "react";
import NotesContext from "../contexts/NotesContext";
import ThemeContext from "../contexts/ThemeContext";

const Home = () => {
  const { loading, filteredNotes, searchNotes, deleteNote, editNote, addNote } =
    useContext(NotesContext);
  const { darkMode } = useContext(ThemeContext);

  /* Form inputs */
  const titleRef = useRef();
  const tagsRef = useRef();
  const descriptionRef = useRef();
  const modalButtonRef = useRef();

  const [editNoteDetails, setEditNoteDetails] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(
      titleRef.current.value,
      descriptionRef.current.value,
      tagsRef.current.value
    );
  };

  const openEditModal = (id, title, description, tags) => {
    modalButtonRef.current.click();
    setEditNoteDetails({ id, title, description, tags });
  };

  const handleEditNote = () => {
    modalButtonRef.current.click();
    editNote(
      editNoteDetails.id,
      editNoteDetails.title,
      editNoteDetails.description,
      editNoteDetails.tags
    );
  };

  const handleChange = (e) => {
    setEditNoteDetails({ ...editNoteDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
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
              <div className="col-md-3 mb-3" key={note._id}>
                <div
                  className={`card h-100 ${darkMode && "bg-black text-white"}`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{note.title}</h5>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icons"
                          fill="gold"
                          viewBox="0 0 24 24"
                          onClick={() =>
                            openEditModal(
                              note._id,
                              note.title,
                              note.description,
                              note.tags
                            )
                          }
                        >
                          <path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icons"
                          fill="red"
                          viewBox="0 0 24 24"
                          onClick={() => deleteNote(note._id)}
                        >
                          <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                        </svg>
                      </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {note.tags.split(", ").map((tag, index) => (
                      <span key={index} className="badge bg-primary me-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
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
                <div className="form-group mb-3">
                  <small>Title</small>
                  <input
                    type="text"
                    className={`form-control ${
                      darkMode && "bg-black text-white border-dark"
                    }`}
                    name="title"
                    placeholder="Enter title"
                    value={editNoteDetails.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <small>Tags</small>
                  <input
                    type="text"
                    className={`form-control ${
                      darkMode && "bg-black text-white border-dark"
                    }`}
                    name="tags"
                    placeholder="Enter tags seperated by commas"
                    value={editNoteDetails.tags}
                    onChange={(e) => handleChange(e)}
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
                    name="description"
                    placeholder="Enter description"
                    value={editNoteDetails.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
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

export default Home;
