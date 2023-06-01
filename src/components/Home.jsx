import React, { useContext } from "react";
import NotesContext from "../contexts/NotesContext";

const Home = () => {
  const { loading, filteredNotes, searchNotes, deleteNote, editNote } =
    useContext(NotesContext);
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>My Notes</h1>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              onChange={(e) => searchNotes(e.target.value)}
              aria-label="Search"
            />
          </form>
        </div>

        <div className={`row mt-4 ${loading && "justify-content-center"}`}>
          {loading ? (
            <div className="spinner-border loader" role="status"></div>
          ) : (
            filteredNotes.map((note) => (
              <div className="col-md-3 mb-3" key={note._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{note.title}</h5>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icons"
                          fill="gold"
                          viewBox="0 0 24 24"
                          onClick={editNote}
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
                    <p className="card-text">{note.description.slice(0, 50)}</p>
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
    </>
  );
};

export default Home;
