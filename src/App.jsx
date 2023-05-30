import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Home, Profile, Login, Signup } from "./components";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
