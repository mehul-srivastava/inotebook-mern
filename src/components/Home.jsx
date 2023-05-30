import React from "react";
import { AlertProvider } from "../context/AlertContext";

import Notes from "./Notes";
import AddNoteForm from "./AddNoteForm";

const Home = () => {
  return (
    <AlertProvider>
      <div className="container add-note-container px-5">
        <AddNoteForm />
      </div>
      <div className="container show-notes px-5">
        <Notes />
      </div>
    </AlertProvider>
  );
};

export default Home;
