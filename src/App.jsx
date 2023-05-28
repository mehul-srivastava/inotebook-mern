import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Home, About } from "./components";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
