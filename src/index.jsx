import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotesProvider>
        <App />
      </NotesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
