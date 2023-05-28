import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
