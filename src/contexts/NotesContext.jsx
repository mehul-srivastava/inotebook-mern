import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "./AuthContext";

const NotesContext = createContext();
export default NotesContext;

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.includes(searchQuery) ||
        note.description.includes(searchQuery) ||
        note.tags.includes(searchQuery)
    );
  });

  const { userToken } = useContext(AuthContext);

  const BASE_URI = import.meta.env.VITE_SERVER_API_BASE_URL;

  useEffect(() => {
    setTimeout(() => fetchNotes(), 2000);
  }, []);

  const fetchNotes = async () => {
    const response = await fetch(`${BASE_URI}/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": userToken,
      },
    });
    setLoading(false);

    const data = await response.json();
    setNotes(data);
    return;
  };

  const deleteNote = async (id) => {
    await fetch(`${BASE_URI}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": userToken,
      },
    });
    setNotes((notes) => notes.filter((note) => note._id !== id));
  };

  const searchNotes = (value) => {
    setSearchQuery(value);
  };

  return (
    <NotesContext.Provider
      value={{ loading, filteredNotes, searchNotes, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
