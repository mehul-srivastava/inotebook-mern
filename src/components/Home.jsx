import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import Notes from "./Notes";

const Home = () => {
  const { addNote } = useContext(NotesContext);

  const [note, setNote] = useState({ title: "", description: "", tags: "" });

  const onInputChange = (e) => {
    note[e.target.name] = e.target.value;
    setNote(note);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
  };
  return (
    <div className="container my-4 px-5">
      <h1>Add A Note</h1>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Note Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="You can write the title of your note here"
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Note Tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="You can write the tags of your note here (separated by commas)"
            name="tags"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Note Description</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="You can write the description of your note here..."
            name="description"
            rows={5}
            onChange={onInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Notes />
    </div>
  );
};

export default Home;
