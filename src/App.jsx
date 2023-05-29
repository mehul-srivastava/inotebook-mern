import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Home, MyNotes } from "./components";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-notes" element={<MyNotes />} />
      </Routes>
    </>
  );
};

export default App;
