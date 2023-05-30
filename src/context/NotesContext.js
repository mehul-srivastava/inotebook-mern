import { createContext, useEffect, useState } from "react";

const NotesContext = createContext();
export default NotesContext;

export const NotesProvider = ({ children }) => {
  const REACT_APP_AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MjI5YzAxYmQyZTkwNTgwMWYyNDY3IiwiaWF0IjoxNjg1NDQzMzQ3LCJleHAiOjE2ODU0NDY5NDd9.BQmR3i0ye8k-1l-PG2XKuMR_-8BiJAHAo3aPaHiyQHc";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title, description, tags = "default") => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": `${REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const data = await res.json();

    // Implementation #1
    // const newNotes = [...notes, { title, description, tags, _id: "64722d0f67a720448bb3b7a2" + Date.now(), }];

    /* Implementation #2 */
    const newNotes = notes.concat({
      title,
      description,
      tags,
      _id: data._id,
    });
    // */
    setNotes(newNotes);
  };

  const deleteNote = async (id) => {
    await fetch(`${process.env.REACT_APP_API_HOST}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": `${REACT_APP_AUTH_TOKEN}`,
      },
    });

    const newNotes = notes.filter((item) => item._id !== id);
    setNotes(newNotes);
  };

  const fetchNotes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/notes/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": REACT_APP_AUTH_TOKEN,
        },
      }
    );
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  };

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
