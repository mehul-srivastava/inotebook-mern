import React from "react";

import Notes from "./Notes";
import AddNotesForm from "./AddNotesForm";

const Home = () => {
  return (
    <>
      <AddNotesForm />
      <Notes />
    </>
  );
};

export default Home;
