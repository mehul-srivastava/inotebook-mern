import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/guards";
import { Navbar, Home, Profile, Login, Signup, Blog } from "./components";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Login Page */}
        <Route path="/auth/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/auth/signup" element={<Signup />} />

        {/* Signup Page */}
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
