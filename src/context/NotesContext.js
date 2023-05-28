import { createContext, useState } from "react";

const NotesContext = createContext();
export default NotesContext;

export const NotesProvider = ({ children }) => {
  const data = [
    {
      _id: "64722d0f67a720448bb3b7a2",
      user_id: "646229c01bd2e905801f2467",
      title: "title",
      description: "lorem34",
      tags: "tags1, tags2, youtube",
      date: "2023-05-27T16:17:19.838Z",
      __v: 0,
    },
    {
      _id: "64722d2767a720448bb3b7a4",
      user_id: "646229c01bd2e905801f2467",
      title: "my notebook app",
      description: "this is a bloody description",
      tags: "github",
      date: "2023-05-27T16:17:43.156Z",
      __v: 0,
    },
    {
      _id: "64722d0f67a720448bb3b7a21",
      user_id: "646229c01bd2e905801f2467",
      title: "title",
      description: "desc",
      tags: "tags1, tags2, youtube",
      date: "2023-05-27T16:17:19.838Z",
      __v: 0,
    },
    {
      _id: "64722d0f67a720448bb3b7a23",
      user_id: "646229c01bd2e905801f2467",
      title: "title",
      description: "desc",
      tags: "tags1, tags2, youtube",
      date: "2023-05-27T16:17:19.838Z",
      __v: 0,
    },
    {
      _id: "64722d0f67a720448bb3b7a28",
      user_id: "646229c01bd2e905801f2467",
      title: "title",
      description: "desc",
      tags: "tags1, tags2, youtube",
      date: "2023-05-27T16:17:19.838Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(data);

  const addNote = (title, description, tags = "default") => {
    // Implementation #1
    const newNotes = [...notes, { title, description, tags }];

    /* Implementation #2
    const newNotes = notes.concat({title, description, tags})
    */
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((item) => item._id !== id);
    setNotes(newNotes);
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
